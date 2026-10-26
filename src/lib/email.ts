import { RfqSubmissionInput } from './validations';

export interface EmailDispatchResult {
  customerEmailSent: boolean;
  internalEmailSent: boolean;
  status: 'sent' | 'demo_simulated' | 'failed';
  error?: string;
}

/**
 * Builds high-density, professional HTML email for client confirmation
 */
function buildCustomerConfirmationHtml(
  payload: RfqSubmissionInput,
  referenceNumber: string
): string {
  const itemsHtml = payload.items
    .map(
      (item, idx) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px; font-size: 13px; color: #1e293b; font-family: sans-serif;">
          ${idx + 1}. <strong>${escapeHtml(item.productName)}</strong>
          ${item.isCustomSourcing ? '<span style="background: #e0f2fe; color: #0369a1; padding: 2px 6px; font-size: 11px; border-radius: 3px; margin-left: 6px;">Custom Sourcing</span>' : ''}
          ${item.customSpecs ? `<div style="font-size: 12px; color: #64748b; margin-top: 4px;">Specs: ${escapeHtml(item.customSpecs)}</div>` : ''}
        </td>
        <td style="padding: 10px; font-size: 13px; color: #1e293b; font-family: sans-serif; text-align: center;">
          ${item.quantity} ${escapeHtml(item.unit)}
        </td>
      </tr>
    `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
        <div style="background: #121316; padding: 24px; color: #ffffff;">
          <h1 style="margin: 0; font-size: 20px; letter-spacing: -0.5px;">VELMORA</h1>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">One Partner. Multiple Procurement Needs.</p>
        </div>
        <div style="padding: 24px;">
          <div style="background: #f1f5f9; border-left: 4px solid #2563eb; padding: 12px 16px; margin-bottom: 20px;">
            <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600;">RFQ Reference Number</div>
            <div style="font-size: 18px; font-weight: 700; color: #0f172a; letter-spacing: 0.5px;">${referenceNumber}</div>
          </div>
          <p style="font-size: 14px; color: #334155; line-height: 1.6;">Dear ${escapeHtml(payload.contactName)},</p>
          <p style="font-size: 14px; color: #334155; line-height: 1.6;">
            Thank you for submitting your Request for Quotation (RFQ) to Velmora. Our engineering and sourcing desk has logged your bill of materials and is currently evaluating mill availability, technical tolerances, and freight staging.
          </p>

          <h3 style="font-size: 14px; font-weight: 600; color: #0f172a; margin-top: 24px; border-bottom: 2px solid #0f172a; padding-bottom: 6px;">Requested Line Items</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background: #f8fafc; border-bottom: 1px solid #cbd5e1; text-align: left;">
                <th style="padding: 8px 10px; font-size: 12px; color: #475569;">Description / Specs</th>
                <th style="padding: 8px 10px; font-size: 12px; color: #475569; text-align: center;">Qty</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="margin-top: 24px; background: #fafafa; border: 1px solid #f1f5f9; padding: 14px; border-radius: 4px;">
            <div style="font-size: 12px; color: #64748b; font-weight: 600; text-transform: uppercase; margin-bottom: 6px;">Next Steps</div>
            <p style="font-size: 13px; color: #475569; margin: 0; line-height: 1.5;">
              A formal commercial quotation with unit pricing, lead times, and Incoterm options will be transmitted to <strong>${escapeHtml(payload.email)}</strong> within 24 to 48 business hours.
            </p>
          </div>

          <p style="font-size: 12px; color: #94a3b8; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
            This email is an exploratory acknowledgment of an RFQ and does not constitute a sales agreement or invoice. For inquiries, quote reference ${referenceNumber}.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Builds HTML for internal procurement desk notification
 */
function buildInternalAlertHtml(
  payload: RfqSubmissionInput,
  referenceNumber: string
): string {
  return `
    <div style="font-family: sans-serif; padding: 20px;">
      <h2>[NEW RFQ ALERT] Reference: ${referenceNumber}</h2>
      <p><strong>Company:</strong> ${escapeHtml(payload.companyName)}</p>
      <p><strong>Contact:</strong> ${escapeHtml(payload.contactName)} (${escapeHtml(payload.email)} | ${escapeHtml(payload.phone)})</p>
      <p><strong>Channel Preference:</strong> ${payload.followUpChannel.toUpperCase()}</p>
      <p><strong>Destination:</strong> ${escapeHtml(payload.deliveryDestination || 'Not specified')}</p>
      <p><strong>Target Timeline:</strong> ${escapeHtml(payload.targetTimeline || 'Standard')}</p>
      <p><strong>Items Count:</strong> ${payload.items.length}</p>
      <p><strong>Notes:</strong> ${escapeHtml(payload.notes || 'None')}</p>
      <hr/>
      <pre>${JSON.stringify(payload.items, null, 2)}</pre>
    </div>
  `;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Dispatch transactional emails via Resend HTTP API or simulate gracefully
 */
export async function sendRfqEmails(
  payload: RfqSubmissionInput,
  referenceNumber: string
): Promise<EmailDispatchResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || 'Velmora Procurement <procurement@velmora-demo.com>';
  const internalEmail = process.env.INTERNAL_NOTIFICATION_EMAIL || 'rfq-desk@velmora-demo.com';

  // If Resend API key is available and not a placeholder
  if (apiKey && !apiKey.includes('your_api_key')) {
    try {
      const customerHtml = buildCustomerConfirmationHtml(payload, referenceNumber);
      const internalHtml = buildInternalAlertHtml(payload, referenceNumber);

      // Send Customer confirmation
      const resCustomer = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [payload.email],
          subject: `[Velmora RFQ] Acknowledgment Receipt - ${referenceNumber}`,
          html: customerHtml,
        }),
      });

      // Send Internal notification
      const resInternal = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [internalEmail],
          subject: `[Internal Lead] New RFQ Received: ${referenceNumber} (${payload.companyName})`,
          html: internalHtml,
        }),
      });

      const customerOk = resCustomer.ok;
      const internalOk = resInternal.ok;

      return {
        customerEmailSent: customerOk,
        internalEmailSent: internalOk,
        status: customerOk ? 'sent' : 'failed',
      };
    } catch (err: any) {
      console.warn('Email dispatch warning:', err?.message);
      return {
        customerEmailSent: false,
        internalEmailSent: false,
        status: 'failed',
        error: err?.message,
      };
    }
  }

  // Graceful Demo Simulation
  console.log(`[DEMO EMAIL] Acknowledgment queued for ${payload.email} (Ref: ${referenceNumber})`);
  return {
    customerEmailSent: true,
    internalEmailSent: true,
    status: 'demo_simulated',
  };
}
