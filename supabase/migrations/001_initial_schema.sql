-- ==============================================================================
-- VELMORA B2B PROCUREMENT PLATFORM — INITIAL DATABASE SCHEMA
-- Migration: 001_initial_schema.sql
-- Description: RFQ requests, itemized line items, and attachment metadata
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. RFQ Requests Table
CREATE TABLE IF NOT EXISTS public.rfq_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_number VARCHAR(32) NOT NULL UNIQUE,
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    follow_up_channel VARCHAR(20) NOT NULL CHECK (follow_up_channel IN ('email', 'whatsapp')),
    notes TEXT,
    delivery_destination TEXT,
    target_timeline VARCHAR(50),
    privacy_agreed BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'quoted', 'archived')),
    idempotency_key VARCHAR(128) UNIQUE,
    ip_hash VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. RFQ Line Items Table
CREATE TABLE IF NOT EXISTS public.rfq_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rfq_id UUID NOT NULL REFERENCES public.rfq_requests(id) ON DELETE CASCADE,
    product_id VARCHAR(100),
    product_name TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    quantity NUMERIC(12, 2) NOT NULL CHECK (quantity > 0),
    unit VARCHAR(30) NOT NULL,
    custom_specs TEXT,
    is_custom_sourcing BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. RFQ Attachments Metadata Table
CREATE TABLE IF NOT EXISTS public.rfq_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rfq_id UUID NOT NULL REFERENCES public.rfq_requests(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_rfq_requests_reference ON public.rfq_requests(reference_number);
CREATE INDEX IF NOT EXISTS idx_rfq_requests_created_at ON public.rfq_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rfq_requests_idempotency ON public.rfq_requests(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_rfq_items_rfq_id ON public.rfq_items(rfq_id);
CREATE INDEX IF NOT EXISTS idx_rfq_attachments_rfq_id ON public.rfq_attachments(rfq_id);

-- 5. Row Level Security (RLS) Configuration
ALTER TABLE public.rfq_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rfq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rfq_attachments ENABLE ROW LEVEL SECURITY;

-- Note: In a production B2B procurement environment, client-facing visitors must NEVER
-- be able to read or query competitor quote requests or submitted contact info.
-- Therefore, SELECT/UPDATE/DELETE are strictly restricted to the service_role (backend server).
-- INSERT is permitted via service_role API or verified serverless backend.

-- Policy: Allow service role full access
DROP POLICY IF EXISTS "Service role can manage all RFQs" ON public.rfq_requests;
CREATE POLICY "Service role can manage all RFQs"
    ON public.rfq_requests
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can manage all RFQ items" ON public.rfq_items;
CREATE POLICY "Service role can manage all RFQ items"
    ON public.rfq_items
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can manage all RFQ attachments" ON public.rfq_attachments;
CREATE POLICY "Service role can manage all RFQ attachments"
    ON public.rfq_attachments
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 6. Storage Bucket Setup (Run if Supabase Storage is enabled)
-- Insert private bucket 'rfq-attachments'
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'rfq-attachments',
    'rfq-attachments',
    false,
    10485760, -- 10MB limit
    ARRAY[
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/png',
        'image/jpeg'
    ]
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: only service role can read/write to private rfq-attachments
DROP POLICY IF EXISTS "Service role has full access to rfq-attachments" ON storage.objects;
CREATE POLICY "Service role has full access to rfq-attachments"
    ON storage.objects
    FOR ALL
    TO service_role
    USING (bucket_id = 'rfq-attachments')
    WITH CHECK (bucket_id = 'rfq-attachments');
