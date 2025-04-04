'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_FIREBASE_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function AttendPage() {
  const params = useSearchParams();
  const classCode = params.get('classCode') || '';
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toISOString().split('T')[0];
    const ref = doc(db, 'attendance', `${date}_${classCode}`);
    await setDoc(ref, {
      classCode,
      name,
      timestamp: serverTimestamp(),
    });
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <h1 className="text-xl font-bold">Submit Your Attendance</h1>
      {submitted ? (
        <p className="text-green-600"> Attendance submitted. Thank you!</p>
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
