'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/api';
import Link from 'next/link';

function DashboardContent() {
  const { user } = useAuth();
  const [todayAttendance, setTodayAttendance] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  // Fetch today's attendance
  const { data: todayData, isLoading: todayLoading } = useQuery({
    queryKey: ['todayAttendance'],
    queryFn: () => apiClient.getTodayAttendance(),
  });

  // Fetch attendance stats
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['attendanceStats'],
    queryFn: () => apiClient.getAttendanceStats(),
  });

  useEffect(() => {
    if (todayData?.data) {
      setTodayAttendance(todayData.data);
    }
  }, [todayData]);

  useEffect(() => {
    if (statsData?.data) {
      setStats(statsData.data);
    }
  }, [statsData]);

  const isCheckedIn = todayAttendance?.checkInTime;
  const isCheckedOut = todayAttendance?.checkOutTime;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Selamat datang, {user?.firstName}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          href="/attendance/check-in"
          className={`p-6 rounded-lg shadow ${
            isCheckedIn
              ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
              : 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 hover:shadow-lg transition'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl">👋</div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Check-In</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {isCheckedIn ? new Date(isCheckedIn).toLocaleTimeString('id-ID') : 'Belum'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {isCheckedIn ? 'Anda sudah absen masuk' : 'Klik untuk absen masuk'}
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/attendance/check-out"
          className={`p-6 rounded-lg shadow ${
            isCheckedOut
              ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
              : 'bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500 hover:shadow-lg transition'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl">👋</div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Check-Out</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {isCheckedOut ? new Date(isCheckedOut).toLocaleTimeString('id-ID') : 'Belum'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {isCheckedOut ? 'Anda sudah absen pulang' : 'Klik untuk absen pulang'}
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Statistics */}
      {!statsLoading && stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400">Hadir Bulan Ini</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.presentDays || 0}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">hari kerja</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400">Terlambat</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.lateDays || 0}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">kali</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400">Alfa</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{stats.absentDays || 0}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">hari</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400">Tingkat Kehadiran</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.attendanceRate || 0}%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">bulan ini</p>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/attendance"
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition text-center"
        >
          <p className="text-lg font-semibold text-gray-900 dark:text-white">📊 Riwayat Absensi</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Lihat detail absensi Anda</p>
        </Link>

        <Link
          href="/leaves"
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition text-center"
        >
          <p className="text-lg font-semibold text-gray-900 dark:text-white">📋 Cuti & Izin</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Kelola permintaan cuti</p>
        </Link>

        <Link
          href="/profile"
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition text-center"
        >
          <p className="text-lg font-semibold text-gray-900 dark:text-white">👤 Profil</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Kelola profil Anda</p>
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
