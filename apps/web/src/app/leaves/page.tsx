'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { apiClient } from '@/lib/api';
import Link from 'next/link';

function LeavesContent() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['myLeaves', page],
    queryFn: () => apiClient.getMyLeaves(page, 10),
  });

  const leaves = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const getStatusBadge = (status: string) => {
    const badges: any = {
      approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels: any = {
      approved: 'Disetujui',
      pending: 'Menunggu',
      rejected: 'Ditolak',
    };
    return labels[status] || status;
  };

  const getLeaveTypeLabel = (type: string) => {
    const labels: any = {
      sick: 'Sakit',
      annual: 'Cuti Tahunan',
      unpaid: 'Cuti Tanpa Bayar',
      maternity: 'Cuti Hamil',
    };
    return labels[type] || type;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cuti & Izin</h1>
        <Link
          href="/leaves/request"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Ajukan Cuti
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-6">
          Gagal memuat data cuti
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : leaves.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Belum ada pengajuan cuti</p>
          <Link
            href="/leaves/request"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Ajukan Cuti Sekarang
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {leaves.map((leave: any) => (
            <div
              key={leave.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {getLeaveTypeLabel(leave.type)}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(leave.status)}`}>
                      {getStatusLabel(leave.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Tanggal Mulai</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(leave.startDate).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Tanggal Berakhir</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(leave.endDate).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {leave.reason && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Alasan</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{leave.reason}</p>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Diajukan</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(leave.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && leaves.length > 0 && (
        <div className="mt-6 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Halaman {page} dari {totalPages}
          </p>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  );
}

export default function LeavesPage() {
  return (
    <ProtectedRoute>
      <LeavesContent />
    </ProtectedRoute>
  );
}
