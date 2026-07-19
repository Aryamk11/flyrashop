'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/login');
            } else {
                setUser(session.user);
            }
            setLoading(false);
        };

        checkUser();
    }, [router]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black text-white">
                <Loader2 className="h-8 w-8 animate-spin text-neon-pink" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex min-h-screen flex-col bg-black text-white">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto bg-gray-900/40 border border-gray-800 rounded-2xl p-8">
                    <h1 className="text-3xl font-bold mb-8">پروفایل کاربری</h1>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-20 w-20 rounded-full bg-neon-pink/20 flex items-center justify-center text-neon-pink text-2xl font-bold">
                            User
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">شماره موبایل</p>
                            <p className="text-xl font-mono text-white dir-ltr text-right">{user.phone}</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8">
                        <h2 className="text-xl font-bold mb-4">سفارش‌های من</h2>
                        <p className="text-gray-500 text-sm">شما هنوز هیچ سفارشی ثبت نکرده‌اید.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
