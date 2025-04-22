'use client';

import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import Link from 'next/link';
import {collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';


type Attendee = {
  name: string;
  email: string;
};

export default function GeneratePage() {
  const [classCode, setclassCode] = useState('');
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const qrUrl = `${baseUrl}/attend?classCode=${classCode}`;
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!classCode) return;

    const colRef = collection(db, 'attendance', `${today}_${classCode}`, 'students');
    const unsub = onSnapshot(colRef, (snapshot) => {
      const list = snapshot.docs.map(doc => doc.data() as Attendee);
      setAttendees(list);
    });

    return () => unsub();
  }, [classCode, today]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6 bg-white text-black">
      <h1 className="text-xl font-bold">Generate QR Code with Attendance Link</h1>
      <input
        type="text"
        placeholder="Enter Class Code"
        value={classCode}
        onChange={(e) => setclassCode(e.target.value)}
        className="border p-2 rounded w-full max-w-sm"
      />
      {classCode && (
        <>
          <QRCode value={qrUrl} bgColor="#ffffff" fgColor="#000000" />
          <p className="text-sm mt-2">Link: {qrUrl}</p>
        </>
      )}

      {attendees.length > 0 && (
        <div className="w-full max-w-md mt-6">
          <h2 className="text-lg font-semibold mb-2">Attendance for {classCode}:</h2>
          <ul className="border rounded p-4 space-y-2 bg-gray-50">
            {attendees.map((a, i) => (
              <li key={i} className="text-sm">
                ✅ {a.name} ({a.email})
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <Link href="/">
          <button className="mt-4 border px-4 py-2 rounded">BACK</button>
        </Link>
      </div>
    </div>
  );
}
