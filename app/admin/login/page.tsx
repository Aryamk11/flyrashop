'use client';
import { useState } from 'react';
import { sendOtpAction, verifyOtpAction } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleSend = async () => { await sendOtpAction(phone); setStep(2); };
  const handleVerify = async () => { 
    const res = await verifyOtpAction(phone, code);
    if (res.success) router.push('/admin/dashboard');
    else alert('Invalid Code');
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border border-neon-pink bg-neon-gray p-8 text-center">
        <h2 className="mb-6 text-2xl font-bold text-white">SYSTEM ACCESS</h2>
        {step === 1 ? (
          <>
            <input className="mb-4 w-full rounded bg-black p-3 text-white border border-gray-700 focus:border-neon-pink outline-none" placeholder="0912..." value={phone} onChange={(e) => setPhone(e.target.value)} />
            <button onClick={handleSend} className="w-full rounded bg-neon-pink py-3 font-bold text-black hover:bg-white">SEND SIGNAL</button>
          </>
        ) : (
          <>
            <input className="mb-4 w-full rounded bg-black p-3 text-white border border-gray-700 outline-none" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
            <button onClick={handleVerify} className="w-full rounded bg-neon-pink py-3 font-bold text-black">VERIFY</button>
          </>
        )}
      </div>
    </div>
  );
}