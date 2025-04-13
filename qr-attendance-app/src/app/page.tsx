'use client'; //component must be a client component
//allows us to use browser APIs ie: useSearchParams()
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      <h1 className="text-2xl font-bold">QR Code Attendance System</h1>
      <div className="flex space-x-4">
        <Link href="/scan">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow">
            📷 Scan QR Code
          </button>
        </Link>
        <Link href="/generate">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow">
            🧾 Generate QR Code
          </button>
        </Link>
      </div>
    </div>
  );
}
