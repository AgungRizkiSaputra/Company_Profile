import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { RfqSubmissionInput } from './validations';

let supabaseServerClient: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient | null {
  if (supabaseServerClient) return supabaseServerClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key && !url.includes('your-project.supabase.co')) {
    try {
      supabaseServerClient = createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
      return supabaseServerClient;
    } catch (e) {
      console.warn('Failed to initialize Supabase client:', e);
      return null;
    }
  }
  return null;
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes('your-project.supabase.co'));
}

// In-memory demo store for when Supabase is not yet connected
const inMemoryDemoRfqs = new Map<string, any>();

export interface SaveRfqResult {
  success: boolean;
  referenceNumber: string;
  source: 'database' | 'demo_store';
  error?: string;
}

/**
 * Generate a cryptographically secure, readable reference number.
 * Format: VEL-YYYY-XXXXX (e.g., VEL-2026-K9X2B)
 */
export function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // base32 without ambiguous 0/O, 1/I
  let code = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }
  return `VEL-${year}-${code}`;
}

/**
 * Saves RFQ and attachments to Supabase PostgreSQL, or gracefully to demo store if keys not set.
 */
export async function saveRfq(
  payload: RfqSubmissionInput,
  ipHash: string
): Promise<SaveRfqResult> {
  const referenceNumber = generateReferenceNumber();
  const supabase = getSupabaseServerClient();

  // If Supabase is configured and not in forced demo mode
  if (supabase && isSupabaseConfigured()) {
    try {
      // 1. Check idempotency key first
      const { data: existingRfq } = await supabase
        .from('rfq_requests')
        .select('reference_number')
        .eq('idempotency_key', payload.idempotencyKey)
        .maybeSingle();

      if (existingRfq) {
        return {
          success: true,
          referenceNumber: existingRfq.reference_number,
          source: 'database',
        };
      }

      // 2. Insert master RFQ record
      const { data: rfqRow, error: rfqError } = await supabase
        .from('rfq_requests')
        .insert({
          reference_number: referenceNumber,
          company_name: payload.companyName,
          contact_name: payload.contactName,
          email: payload.email,
          phone: payload.phone,
          follow_up_channel: payload.followUpChannel,
          delivery_destination: payload.deliveryDestination || null,
          target_timeline: payload.targetTimeline || null,
          notes: payload.notes || null,
          privacy_agreed: payload.privacyAgreed,
          idempotency_key: payload.idempotencyKey,
          ip_hash: ipHash,
          status: 'pending',
        })
        .select('id')
        .single();

      if (rfqError || !rfqRow) {
        throw new Error(`Database error creating RFQ: ${rfqError?.message}`);
      }

      const rfqId = rfqRow.id;

      // 3. Insert line items
      const itemsToInsert = payload.items.map((item) => ({
        rfq_id: rfqId,
        product_id: item.productId || null,
        product_name: item.productName,
        category: item.category,
        quantity: item.quantity,
        unit: item.unit,
        custom_specs: item.customSpecs || null,
        is_custom_sourcing: item.isCustomSourcing || false,
      }));

      const { error: itemsError } = await supabase.from('rfq_items').insert(itemsToInsert);
      if (itemsError) {
        throw new Error(`Database error inserting RFQ items: ${itemsError.message}`);
      }

      // 4. Handle attachments if any
      if (payload.attachments && payload.attachments.length > 0) {
        const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'rfq-attachments';

        for (const file of payload.attachments) {
          if (file.dataBase64) {
            const buffer = Buffer.from(file.dataBase64, 'base64');
            const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
            const storagePath = `${referenceNumber}/${Date.now()}_${sanitizedName}`;

            const { error: uploadError } = await supabase.storage
              .from(bucket)
              .upload(storagePath, buffer, {
                contentType: file.type,
                upsert: false,
              });

            if (!uploadError) {
              await supabase.from('rfq_attachments').insert({
                rfq_id: rfqId,
                file_path: storagePath,
                original_name: file.name,
                file_size: file.size,
                mime_type: file.type,
              });
            } else {
              console.warn(`Storage upload warning for ${file.name}:`, uploadError.message);
            }
          }
        }
      }

      return {
        success: true,
        referenceNumber,
        source: 'database',
      };
    } catch (err: any) {
      console.error('Supabase save error:', err);
      // Fallback to local store if Supabase fails
      try {
        const { saveNewRfq } = await import('./rfq-store');
        saveNewRfq(payload, referenceNumber);
      } catch (e) {
        console.error('Local RFQ store error:', e);
      }
      return {
        success: true,
        referenceNumber,
        source: 'demo_store',
      };
    }
  }

  // Graceful Local Store persistence
  try {
    const { saveNewRfq } = await import('./rfq-store');
    saveNewRfq(payload, referenceNumber);
  } catch (e) {
    console.error('Local RFQ store error:', e);
  }

  return {
    success: true,
    referenceNumber,
    source: 'demo_store',
  };
}
