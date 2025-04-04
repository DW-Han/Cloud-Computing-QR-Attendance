'use client';

import { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

export default function ScanPage() {
  useEffect(() => {
    const qrCodeScanner = new Html5Qrcode("reader");

    qrCodeScanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        console.log("Scanned:", decodedText);
        window.location.href = decodedText;
      },
      (errorMessage) => {
        console.warn("Scan error:", errorMessage);
      }
    );

    return () => {
      qrCodeScanner.stop().then(() => {
        qrCodeScanner.clear();
      });
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6">Scan QR Code</h1>
      <div id="reader" className="w-full max-w-md h-[400px]" />
    </div>
  );
}
