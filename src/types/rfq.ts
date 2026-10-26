// Types for Velmora B2B Request for Quotation (RFQ) System

export interface RfqItem {
  id: string; // unique item id in cart/session
  productId?: string; // slug if catalog product
  productName: string;
  category: string;
  quantity: number;
  unit: string;
  customSpecs?: string;
  isCustomSourcing: boolean;
}

export interface RfqAttachmentMeta {
  name: string;
  size: number;
  type: string;
  dataBase64?: string; // used for transit or upload
}

export interface RfqPayload {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  followUpChannel: 'email' | 'whatsapp';
  deliveryDestination?: string;
  targetTimeline?: string;
  notes?: string;
  items: RfqItem[];
  privacyAgreed: boolean;
  idempotencyKey: string;
  honeypot?: string;
  attachments?: RfqAttachmentMeta[];
}

export interface RfqSubmissionResult {
  success: boolean;
  referenceNumber?: string;
  status?: 'stored' | 'demo_stored' | 'failed';
  emailStatus?: 'sent' | 'demo_simulated' | 'failed';
  message: string;
  error?: string;
  timestamp?: string;
}
