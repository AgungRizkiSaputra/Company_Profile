import { z } from 'zod';

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/png',
  'image/jpeg',
];

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export const rfqItemSchema = z.object({
  id: z.string().optional(),
  productId: z.string().optional(),
  productName: z.string().min(2, 'Product name is required').max(200),
  category: z.string().min(1, 'Category is required'),
  quantity: z.coerce.number().positive('Quantity must be greater than zero'),
  unit: z.string().min(1, 'Unit of measure is required').max(50),
  customSpecs: z.string().max(1000).optional().default(''),
  isCustomSourcing: z.boolean().default(false),
});

export const rfqAttachmentSchema = z.object({
  name: z.string().min(1).max(255),
  size: z.number().max(MAX_FILE_SIZE_BYTES, 'Attachment size must not exceed 10MB'),
  type: z.string().refine((mime) => ALLOWED_MIME_TYPES.includes(mime), {
    message: 'File type not permitted. Allowed: PDF, Word, Excel, PNG, JPG.',
  }),
  dataBase64: z.string().optional(),
});

export const rfqSubmissionSchema = z.object({
  companyName: z
    .string()
    .min(2, 'Company name is required')
    .max(120, 'Company name too long'),
  contactName: z
    .string()
    .min(2, 'Contact person name is required')
    .max(100, 'Contact person name too long'),
  email: z
    .string()
    .email('Valid business email address is required')
    .max(120),
  phone: z
    .string()
    .min(8, 'Phone or WhatsApp number must be at least 8 digits')
    .max(30, 'Phone number too long')
    .regex(/^[+0-9\s\-()]+$/, 'Invalid phone number format'),
  followUpChannel: z.enum(['email', 'whatsapp'] as const, {
    message: 'Follow-up channel must be email or whatsapp',
  }),
  deliveryDestination: z.string().max(250).optional().default(''),
  targetTimeline: z.string().max(100).optional().default(''),
  notes: z.string().max(2000).optional().default(''),
  items: z.array(rfqItemSchema).min(1, 'At least one line item must be added to the RFQ'),
  privacyAgreed: z.literal(true, {
    message: 'You must agree to the Privacy Policy to submit an RFQ',
  }),
  idempotencyKey: z.string().min(8, 'Invalid idempotency token'),
  honeypot: z.string().max(0, 'Spam detected').optional().default(''),
  attachments: z.array(rfqAttachmentSchema).max(3, 'Maximum 3 files allowed').optional().default([]),
});

export type RfqSubmissionInput = z.infer<typeof rfqSubmissionSchema>;
