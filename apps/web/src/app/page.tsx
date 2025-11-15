'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Absenin
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Sistem Presensi Digital yang Tenang, Fleksibel, dan Manusiawi
          </p>

          {isAuthenticated ? (
            <div className="flex gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Buka Dashboard
              </Link>
              <Link
                href="/attendance"
                className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
              >
                Check-In Sekarang
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 justify-center">
              <Link
                href="/login"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-8 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="text-3xl mb-2">⏰</div>
            <h3 className="text-xl font-semibold mb-2">Check-In/Out</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Absensi cepat dan mudah dengan satu klik
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-xl font-semibold mb-2">Statistik Real-time</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Pantau kehadiran Anda kapan saja
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="text-3xl mb-2">📋</div>
            <h3 className="text-xl font-semibold mb-2">Manajemen Cuti</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Atur cuti dengan mudah dan transparan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
