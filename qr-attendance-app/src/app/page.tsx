"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      <h1 className="text-2xl font-bold">QR Code Attendance System!</h1>
       

      {session ? (
        <>
          <div>
            <p>Welcome, {session.user?.name}!</p>
          </div>

          <div>
            <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow">Sign out</button>
          </div>
          
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
        </>
      ) : (
        <>
          <div><p>Please log in</p></div>
          <div><button onClick={() => signIn("google")} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow">Sign in with Google</button></div>
        </>
      )}
      
    </div>
  );
}
