'use client';

import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Link from 'next/link';

export default function ScanPage() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText) => {
        console.log("Scanned text:", decodedText);
        window.location.href = decodedText;
      },
      (errorMessage) => {
        console.warn('QR scan error:', errorMessage);
      }
    );

    return () => {
      scanner.clear().catch((error) => {
        console.error('Failed to clear QR scanner', error);
      });
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6">Scan QR Code</h1>
      <div id="reader" className="w-full max-w-md" />
      <div><Link href="/"><button>BACK</button></Link></div>
    </div>
  );
}
