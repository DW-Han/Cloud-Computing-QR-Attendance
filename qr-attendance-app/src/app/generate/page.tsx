'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';

export default function GeneratePage() {
  const [classCode, setclassCode] = useState('');

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const qrUrl = `${baseUrl}/attend?classCode=${classCode}`;

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
        <QRCode
          value={qrUrl}
          bgColor="#ffffff"
          fgColor="#000000"
        />
      )}
      {classCode && <p className="text-sm mt-2">Link: {qrUrl}</p>}
    </div>
  );
}
