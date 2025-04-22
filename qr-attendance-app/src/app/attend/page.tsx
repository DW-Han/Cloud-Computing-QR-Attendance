'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import { useSession } from "next-auth/react";
import { collection, addDoc } from 'firebase/firestore';

import { db } from '@/lib/firebase';

function AttendForm() {
  const params = useSearchParams();
  const classCode = params.get('classCode') || '';
  const { data: session } = useSession();

  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toISOString().split('T')[0];
    const ref = collection(db, 'attendance', `${date}_${classCode}`, 'students');
    await addDoc(ref, {
      classCode,
      name,
      email: session?.user?.email || '',
      timestamp: serverTimestamp(),
    });
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <h1 className="text-xl font-bold">Submit Your Attendance</h1>
      {submitted ? (
        <p className="text-green-600">Attendance submitted. Thank you!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm">
          <input
            type="text"
            value={classCode}
            readOnly
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Attendance
          </button>
        </form>
      )}
    </div>
  );
}

export default function AttendPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <AttendForm />
    </Suspense>
  );
}
