import { NextRequest, NextResponse } from 'next/server';
import { getAllRfqs, updateRfqStatus } from '@/lib/rfq-store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');
    const searchQuery = searchParams.get('search')?.toLowerCase().trim();

    let all = getAllRfqs();

    // Calculate aggregated metrics
    const stats = {
      total: all.length,
      pending: all.filter((r) => r.status === 'pending').length,
      inReview: all.filter((r) => r.status === 'in_review').length,
      quoted: all.filter((r) => r.status === 'quoted').length,
      completed: all.filter((r) => r.status === 'completed').length,
      rejected: all.filter((r) => r.status === 'rejected').length,
      estimatedPipelineTotal: 'Rp 467.550.000',
    };

    // Filter by status if specified
    if (statusFilter && statusFilter !== 'all') {
      all = all.filter((r) => r.status === statusFilter);
    }

    // Filter by search query if specified
    if (searchQuery) {
      all = all.filter(
        (r) =>
          r.referenceNumber.toLowerCase().includes(searchQuery) ||
          r.companyName.toLowerCase().includes(searchQuery) ||
          r.contactName.toLowerCase().includes(searchQuery) ||
          r.email.toLowerCase().includes(searchQuery) ||
          r.items.some((i) => i.productName.toLowerCase().includes(searchQuery))
      );
    }

    return NextResponse.json({
      success: true,
      stats,
      data: all,
    });
  } catch (error) {
    console.error('Error fetching admin RFQs:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data permintaan pengadaan.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { referenceNumber, status, adminNotes } = body;

    if (!referenceNumber || !status) {
      return NextResponse.json(
        { success: false, error: 'Nomor referensi dan status wajib diisi.' },
        { status: 400 }
      );
    }

    const updated = updateRfqStatus(referenceNumber, status, adminNotes);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Permintaan RFQ tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Status RFQ berhasil diperbarui.',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating RFQ status:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui status permintaan.' },
      { status: 500 }
    );
  }
}
