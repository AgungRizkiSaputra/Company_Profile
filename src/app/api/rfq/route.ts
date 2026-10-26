import { NextRequest, NextResponse } from 'next/server';
import { rfqSubmissionSchema } from '@/lib/validations';
import { checkRateLimit, hashIp } from '@/lib/rate-limit';
import { saveRfq } from '@/lib/supabase';
import { sendRfqEmails } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // 1. Extract and anonymize client IP for rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const rawIp = (forwardedFor ? forwardedFor.split(',')[0] : realIp) || '127.0.0.1';
    const ipHash = hashIp(rawIp);

    // 2. Check Rate Limit (5 requests per 10 minutes)
    const rateCheck = checkRateLimit(ipHash, 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please wait before submitting another quotation request.',
          retryAfterSeconds: rateCheck.resetSeconds,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateCheck.resetSeconds),
          },
        }
      );
    }

    // 3. Parse and validate JSON request body
    const body = await request.json();
    const parseResult = rfqSubmissionSchema.safeParse(body);

    if (!parseResult.success) {
      const formattedErrors = parseResult.error.format();
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed. Please verify the submitted parameters.',
          details: formattedErrors,
        },
        { status: 400 }
      );
    }

    const payload = parseResult.data;

    // 4. Anti-spam Honeypot Check
    if (payload.honeypot && payload.honeypot.trim().length > 0) {
      // Silently reject bot submission without error
      return NextResponse.json(
        {
          success: true,
          referenceNumber: 'VEL-2026-SPAM-FILTERED',
          status: 'demo_stored',
          message: 'Quotation request received.',
        },
        { status: 200 }
      );
    }

    // 5. Persist to Supabase Database (or graceful demo store)
    const dbResult = await saveRfq(payload, ipHash);
    if (!dbResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Database transaction failed. Your request could not be logged. Please try again.',
        },
        { status: 500 }
      );
    }

    const referenceNumber = dbResult.referenceNumber;

    // 6. Send Transactional Emails (Customer confirmation + Internal alert)
    const emailResult = await sendRfqEmails(payload, referenceNumber);

    // 7. Return safe, structured response to frontend
    return NextResponse.json(
      {
        success: true,
        referenceNumber,
        status: dbResult.source === 'database' ? 'stored' : 'demo_stored',
        emailStatus: emailResult.status,
        message: 'Request for Quotation received and registered successfully.',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Unhandled RFQ API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected internal error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
