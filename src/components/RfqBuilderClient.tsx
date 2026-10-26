'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { useRfq } from '@/lib/rfq-context';
import { CustomItemModal } from './CustomItemModal';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from '@/lib/validations';
import {
  Trash2,
  Plus,
  FileSpreadsheet,
  Upload,
  AlertCircle,
  FileText,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileUp,
  X,
} from 'lucide-react';

interface Props {
  lang: Locale;
}

export function RfqBuilderClient({ lang }: Props) {
  const router = useRouter();
  const dict = dictionaries[lang].rfq;
  const { items, updateItem, removeItem, addCustomItem, setLastSubmission } = useRfq();

  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  // Form Fields
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [followUpChannel, setFollowUpChannel] = useState<'email' | 'whatsapp'>('email');
  const [deliveryDestination, setDeliveryDestination] = useState('');
  const [targetTimeline, setTargetTimeline] = useState('');
  const [notes, setNotes] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  // Attachments State
  const [attachments, setAttachments] = useState<
    { name: string; size: number; type: string; dataBase64?: string }[]
  >([]);
  const [fileError, setFileError] = useState('');

  // Submission State & Feedback
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [idempotencyKey, setIdempotencyKey] = useState('');

  // Generate idempotency key on client mount
  useEffect(() => {
    setIdempotencyKey(`idemp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (attachments.length + files.length > 3) {
      setFileError(
        lang === 'id'
          ? 'Maksimal 3 berkas lampiran yang diizinkan.'
          : 'Maximum 3 attachment files permitted.'
      );
      return;
    }

    Array.from(files).forEach((file) => {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        setFileError(
          lang === 'id'
            ? `Format ${file.name} tidak didukung. Harap gunakan PDF, Word, Excel, PNG, atau JPG.`
            : `File type of ${file.name} is not permitted. Use PDF, Word, Excel, PNG, or JPG.`
        );
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setFileError(
          lang === 'id'
            ? `Ukuran berkas ${file.name} melebihi batas 10MB.`
            : `File size of ${file.name} exceeds 10MB limit.`
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        setAttachments((prev) => [
          ...prev,
          {
            name: file.name,
            size: file.size,
            type: file.type,
            dataBase64: base64String,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    e.target.value = '';
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const validateClientSide = (): boolean => {
    const errors: Record<string, string> = {};

    if (!companyName.trim()) {
      errors.companyName = lang === 'id' ? 'Nama perusahaan wajib diisi' : 'Company name is required';
    }
    if (!contactName.trim()) {
      errors.contactName = lang === 'id' ? 'Nama PIC kontak wajib diisi' : 'Contact person name is required';
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = lang === 'id' ? 'Alamat email korporat tidak valid' : 'Valid business email is required';
    }
    if (!phone.trim() || phone.trim().length < 8) {
      errors.phone = lang === 'id' ? 'Nomor telepon minimal 8 digit' : 'Phone must be at least 8 digits';
    }
    if (items.length === 0) {
      errors.items = lang === 'id' ? 'Tambahkan minimal 1 item ke dalam RFQ' : 'Add at least 1 line item to the RFQ';
    }
    if (!privacyAgreed) {
      errors.privacy = lang === 'id' ? 'Persetujuan kebijakan privasi wajib dicentang' : 'You must agree to the Privacy Policy';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateClientSide()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        companyName: companyName.trim(),
        contactName: contactName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        followUpChannel,
        deliveryDestination: deliveryDestination.trim(),
        targetTimeline: targetTimeline.trim(),
        notes: notes.trim(),
        items,
        privacyAgreed,
        idempotencyKey,
        honeypot,
        attachments,
      };

      const response = await fetch('/api/rfq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit RFQ. Please retry.');
      }

      // Record last submission for confirmation page
      setLastSubmission({
        referenceNumber: data.referenceNumber,
        companyName,
        contactName,
        email,
        phone,
        followUpChannel,
        items,
        deliveryDestination,
        targetTimeline,
        notes,
        status: data.status,
        timestamp: data.timestamp || new Date().toISOString(),
      });

      // Redirect to confirmation success page
      router.push(`/${lang}/quote/success?ref=${data.referenceNumber}`);
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(
        err?.message ||
          (lang === 'id'
            ? 'Terjadi kendala saat mengirim data RFQ. Silakan coba kembali.'
            : 'Error transmitting RFQ. Please retry your submission.')
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. LINE ITEMS TABLE SECTION */}
      <section className="bg-white border border-neutral-200 rounded-xs shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-[#121316] font-mono uppercase tracking-wide">
              {dict.itemListTitle} ({items.length})
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              {lang === 'id'
                ? 'Sesuaikan jumlah, satuan ukuran, atau catatan toleransi untuk masing-masing item.'
                : 'Adjust volume, unit of measure, and tolerances for each item.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCustomModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-semibold uppercase bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xs transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{dict.addCustomItemBtn}</span>
          </button>
        </div>

        {formErrors.items && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 rounded-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formErrors.items}</span>
          </div>
        )}

        {/* Items Table */}
        {items.length > 0 ? (
          <div className="border border-neutral-200 rounded-xs overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 font-mono text-neutral-600 uppercase">
                  <th className="py-3 px-4">{dict.tableColProduct}</th>
                  <th className="py-3 px-3 w-28 text-center">{dict.tableColQty}</th>
                  <th className="py-3 px-3 w-28">{dict.tableColUnit}</th>
                  <th className="py-3 px-4">{dict.tableColSpecs}</th>
                  <th className="py-3 px-3 w-16 text-center">{dict.tableColAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/50">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#121316] flex items-center gap-2">
                        <span>{item.productName}</span>
                        {item.isCustomSourcing && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-xs font-normal">
                            Custom Sourcing
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-neutral-500 font-mono">{item.category}</div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(item.id, {
                            quantity: Math.max(1, parseInt(e.target.value) || 1),
                          })
                        }
                        className="w-20 text-center font-mono border border-neutral-300 rounded-xs py-1 px-1 text-xs focus:outline-hidden focus:border-blue-600"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) => updateItem(item.id, { unit: e.target.value })}
                        className="w-24 font-mono border border-neutral-300 rounded-xs py-1 px-2 text-xs focus:outline-hidden focus:border-blue-600"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={item.customSpecs || ''}
                        onChange={(e) => updateItem(item.id, { customSpecs: e.target.value })}
                        placeholder={
                          lang === 'id'
                            ? 'Tambahkan toleransi khusus...'
                            : 'Add tolerances, brand preference...'
                        }
                        className="w-full font-sans border border-neutral-300 rounded-xs py-1 px-2 text-xs focus:outline-hidden focus:border-blue-600"
                      />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors rounded-xs"
                        aria-label={`Remove ${item.productName}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border border-dashed border-neutral-300 p-8 text-center rounded-xs space-y-3 bg-neutral-50/50">
            <FileSpreadsheet className="w-8 h-8 text-neutral-400 mx-auto" />
            <h3 className="text-sm font-bold text-neutral-800">{dict.cartEmptyTitle}</h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">{dict.cartEmptyDesc}</p>
            <div className="pt-2 flex justify-center gap-3">
              <Link
                href={`/${lang}/products`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#121316] text-white text-xs font-mono uppercase font-semibold rounded-xs hover:bg-neutral-800 transition-colors"
              >
                <span>{dict.cartEmptyBrowse}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setIsCustomModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-neutral-800 border border-neutral-300 text-xs font-mono uppercase font-semibold rounded-xs hover:border-black transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{dict.addCustomItemBtn}</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 2. CORPORATE CONTACT & INTAKE FORM */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-white border border-neutral-200 rounded-xs shadow-xs p-6 sm:p-8 space-y-6">
          <div className="border-b border-neutral-200 pb-4">
            <h2 className="text-xl font-bold text-[#121316] font-mono uppercase tracking-wide">
              {dict.formContactTitle}
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              {lang === 'id'
                ? 'Data kontak resmi untuk pengiriman surat penawaran komersial.'
                : 'Authorized point of contact for official commercial proposal delivery.'}
            </p>
          </div>

          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-between rounded-xs">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="underline font-mono uppercase font-semibold ml-4"
              >
                {dict.retryBtn}
              </button>
            </div>
          )}

          {/* Hidden Spam Honeypot */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="website_url"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-700 mb-1 font-semibold">
                {dict.companyName} *
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  if (formErrors.companyName) setFormErrors((p) => ({ ...p, companyName: '' }));
                }}
                placeholder={dict.companyNamePlaceholder}
                className={`w-full text-sm border rounded-xs px-3.5 py-2.5 focus:outline-hidden ${
                  formErrors.companyName
                    ? 'border-red-500 bg-red-50/20'
                    : 'border-neutral-300 focus:border-blue-600'
                }`}
              />
              {formErrors.companyName && (
                <p className="text-[11px] text-red-600 mt-1">{formErrors.companyName}</p>
              )}
            </div>

            {/* Contact Name */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-700 mb-1 font-semibold">
                {dict.contactName} *
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => {
                  setContactName(e.target.value);
                  if (formErrors.contactName) setFormErrors((p) => ({ ...p, contactName: '' }));
                }}
                placeholder={dict.contactNamePlaceholder}
                className={`w-full text-sm border rounded-xs px-3.5 py-2.5 focus:outline-hidden ${
                  formErrors.contactName
                    ? 'border-red-500 bg-red-50/20'
                    : 'border-neutral-300 focus:border-blue-600'
                }`}
              />
              {formErrors.contactName && (
                <p className="text-[11px] text-red-600 mt-1">{formErrors.contactName}</p>
              )}
            </div>

            {/* Corporate Email */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-700 mb-1 font-semibold">
                {dict.email} *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formErrors.email) setFormErrors((p) => ({ ...p, email: '' }));
                }}
                placeholder={dict.emailPlaceholder}
                className={`w-full text-sm border rounded-xs px-3.5 py-2.5 focus:outline-hidden ${
                  formErrors.email
                    ? 'border-red-500 bg-red-50/20'
                    : 'border-neutral-300 focus:border-blue-600'
                }`}
              />
              {formErrors.email && (
                <p className="text-[11px] text-red-600 mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Phone / WhatsApp */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-700 mb-1 font-semibold">
                {dict.phone} *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (formErrors.phone) setFormErrors((p) => ({ ...p, phone: '' }));
                }}
                placeholder={dict.phonePlaceholder}
                className={`w-full text-sm border rounded-xs px-3.5 py-2.5 focus:outline-hidden ${
                  formErrors.phone
                    ? 'border-red-500 bg-red-50/20'
                    : 'border-neutral-300 focus:border-blue-600'
                }`}
              />
              {formErrors.phone && (
                <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>
              )}
            </div>
          </div>

          {/* Follow-up Channel Radio */}
          <div className="pt-2">
            <label className="block text-xs font-mono uppercase text-neutral-700 mb-2 font-semibold">
              {dict.channel} *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-3 p-3.5 border rounded-xs cursor-pointer text-xs font-mono transition-colors ${
                  followUpChannel === 'email'
                    ? 'border-blue-600 bg-blue-50/40 text-blue-900 font-semibold'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <input
                  type="radio"
                  name="channel"
                  value="email"
                  checked={followUpChannel === 'email'}
                  onChange={() => setFollowUpChannel('email')}
                  className="accent-blue-600"
                />
                <span>{dict.channelEmail}</span>
              </label>

              <label
                className={`flex items-center gap-3 p-3.5 border rounded-xs cursor-pointer text-xs font-mono transition-colors ${
                  followUpChannel === 'whatsapp'
                    ? 'border-blue-600 bg-blue-50/40 text-blue-900 font-semibold'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <input
                  type="radio"
                  name="channel"
                  value="whatsapp"
                  checked={followUpChannel === 'whatsapp'}
                  onChange={() => setFollowUpChannel('whatsapp')}
                  className="accent-blue-600"
                />
                <span>{dict.channelWhatsapp}</span>
              </label>
            </div>
          </div>

          {/* Delivery Destination & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-700 mb-1 font-semibold">
                {dict.deliveryDestination}
              </label>
              <input
                type="text"
                value={deliveryDestination}
                onChange={(e) => setDeliveryDestination(e.target.value)}
                placeholder={dict.deliveryPlaceholder}
                className="w-full text-sm border border-neutral-300 rounded-xs px-3.5 py-2.5 focus:outline-hidden focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-700 mb-1 font-semibold">
                {dict.timeline}
              </label>
              <input
                type="text"
                value={targetTimeline}
                onChange={(e) => setTargetTimeline(e.target.value)}
                placeholder={dict.timelinePlaceholder}
                className="w-full text-sm border border-neutral-300 rounded-xs px-3.5 py-2.5 focus:outline-hidden focus:border-blue-600"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-700 mb-1 font-semibold">
              {dict.notes}
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={dict.notesPlaceholder}
              className="w-full text-sm border border-neutral-300 rounded-xs p-3 focus:outline-hidden focus:border-blue-600"
            />
          </div>

          {/* File Attachments Dropzone */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-mono uppercase text-neutral-700 font-semibold">
              {dict.attachments}
            </label>

            <div className="border border-dashed border-neutral-300 rounded-xs p-5 bg-neutral-50/50 hover:bg-neutral-50 transition-colors">
              <div className="flex flex-col items-center justify-center text-center">
                <FileUp className="w-6 h-6 text-neutral-400 mb-2" />
                <label className="cursor-pointer text-xs font-mono font-semibold text-blue-600 hover:text-blue-800">
                  <span>Browse File from Device</span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-neutral-500 mt-1">{dict.attachmentsHint}</p>
              </div>
            </div>

            {fileError && (
              <p className="text-xs text-red-600 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{fileError}</span>
              </p>
            )}

            {/* Uploaded File List */}
            {attachments.length > 0 && (
              <div className="space-y-2 pt-2">
                {attachments.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-neutral-100 border border-neutral-200 rounded-xs text-xs font-mono"
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate text-neutral-800 font-medium">{file.name}</span>
                      <span className="text-neutral-400 text-[11px] shrink-0">
                        ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(idx)}
                      className="text-neutral-400 hover:text-red-600 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Privacy Consent Agreement */}
          <div className="pt-4 border-t border-neutral-200 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={privacyAgreed}
                onChange={(e) => {
                  setPrivacyAgreed(e.target.checked);
                  if (formErrors.privacy) setFormErrors((p) => ({ ...p, privacy: '' }));
                }}
                className="mt-1 accent-blue-600"
              />
              <span className="text-xs text-neutral-600 leading-relaxed font-sans">
                {dict.privacyConsent}{' '}
                <Link
                  href={`/${lang}/privacy-policy`}
                  target="_blank"
                  className="text-blue-700 underline font-medium hover:text-blue-900"
                >
                  {dict.privacyConsentLink}
                </Link>
                . *
              </span>
            </label>
            {formErrors.privacy && (
              <p className="text-[11px] text-red-600 pl-7">{formErrors.privacy}</p>
            )}
          </div>

          {/* Submission Notice & Submit Button */}
          <div className="pt-6 border-t border-neutral-200 space-y-4">
            <p className="text-[11px] text-neutral-500 leading-relaxed font-sans bg-neutral-50 p-3 rounded-xs border border-neutral-200">
              {dict.disclaimer}
            </p>

            <button
              type="submit"
              disabled={submitting || items.length === 0}
              className={`w-full py-4 px-6 font-mono text-xs uppercase tracking-wider font-semibold rounded-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                submitting || items.length === 0
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  : 'bg-[#121316] text-white hover:bg-neutral-800'
              }`}
            >
              {submitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{dict.submittingBtn}</span>
                </>
              ) : (
                <>
                  <FileSpreadsheet className="w-4 h-4 text-blue-400" />
                  <span>{dict.submitBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </section>
      </form>

      {/* Custom Item Sourcing Modal */}
      <CustomItemModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onAdd={addCustomItem}
        lang={lang}
      />
    </div>
  );
}
