'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PhoneInput from '@/components/Auth/PhoneInput';
import OTPInput from '@/components/Auth/OTPInput';
import { Loader2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length < 11) {
            setError('شماره موبایل نامعتبر است');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Format phone number to E.164
            // Assuming user enters 0912... -> +98912...
            const formattedPhone = phone.replace(/^0/, '+98');

            const { error } = await supabase.auth.signInWithOtp({
                phone: formattedPhone,
            });

            if (error) throw error;

            setStep('OTP');
        } catch (err: any) {
            setError(err.message || 'خطایی رخ داد');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) return;

        setLoading(true);
        setError(null);

        try {
            const formattedPhone = phone.replace(/^0/, '+98');

            const { error } = await supabase.auth.verifyOtp({
                phone: formattedPhone,
                token: otp,
                type: 'sms',
            });

            if (error) throw error;

            router.push('/profile'); // Redirect to profile or home
            router.refresh();
        } catch (err: any) {
            setError('کد وارد شده اشتباه است');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-black p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none data-noselect">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-neon-pink/10 rounded-full blur-[100px]" />
                <div className="absolute top-[30%] -right-[10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl relative z-10">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                        FLYRA<span className="text-neon-pink">SHOP</span>
                    </h1>
                    <p className="text-gray-400 text-sm">ورود به حساب کاربری</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                {step === 'PHONE' ? (
                    <form onSubmit={handleSendOtp} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">شماره موبایل</label>
                            <PhoneInput value={phone} onChange={setPhone} disabled={loading} />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || phone.length < 11}
                            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-neon-pink hover:text-white transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    دریافت کد تایید
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform rotate-180" />
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">کد تایید</label>
                                <button
                                    type="button"
                                    onClick={() => setStep('PHONE')}
                                    className="text-xs text-neon-pink hover:underline"
                                >
                                    تغییر شماره
                                </button>
                            </div>
                            <OTPInput value={otp} onChange={setOtp} disabled={loading} />
                            <p className="text-xs text-gray-500 text-center dir-ltr">
                                Sent to {phone}
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || otp.length !== 6}
                            className="w-full bg-neon-pink text-white font-bold py-3 rounded-lg hover:bg-neon-pink/80 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,20,147,0.5)]"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                'ورود'
                            )}
                        </button>
                    </form>
                )}

                <div className="mt-8 text-center">
                    <Link href="/" className="text-xs text-gray-600 hover:text-white transition-colors">
                        بازگشت به خانه
                    </Link>
                </div>
            </div>
        </main>
    );
}
