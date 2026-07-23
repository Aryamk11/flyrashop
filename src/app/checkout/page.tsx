'use client';

import { useCart } from '@/components/Cart/CartContext';
import { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, MapPin, Phone, User, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CheckoutPage() {
    const { items, total } = useCart();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        postalCode: ''
    });

    useEffect(() => {
        setMounted(true);
        if (items.length === 0) {
            router.push('/');
        }
    }, [items, router]);

    if (!mounted) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        let message = `سلام، سفارش جدید از سایت:\n\n`;
        message += `👤 نام: ${formData.fullName}\n`;
        message += `📱 تماس: ${formData.phone}\n`;
        message += `📍 آدرس: ${formData.address}\n`;
        message += `📮 کد پستی: ${formData.postalCode}\n\n`;
        message += `🛒 اقلام سفارش:\n`;
        
        items.forEach((item) => {
            message += `- ${item.title} (${item.quantity} عدد)\n`;
        });
        
        message += `\n💰 مجموع پرداخت: ${new Intl.NumberFormat('fa-IR').format(total)} تومان\n`;
        message += `\nلطفاً برای پرداخت و ارسال راهنمایی کنید.`;

        // Redirect to WhatsApp
        const waLink = `https://wa.me/989374743577?text=${encodeURIComponent(message)}`;
        window.open(waLink, '_blank');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white p-4 md:p-8 transition-colors duration-300" dir="rtl">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8 border-b border-gray-300 dark:border-gray-800 pb-4 transition-colors duration-300">
                    <button onClick={() => router.back()} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <ArrowRight size={24} />
                    </button>
                    <h1 className="text-3xl font-bold text-neon-pink font-[family-name:var(--font-eb-garamond)]">
                        تکمیل سفارش
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <MapPin className="text-neon-pink" />
                            اطلاعات ارسال
                        </h2>
                        
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <User size={16} /> نام و نام خانوادگی
                                </label>
                                <input 
                                    required
                                    type="text" 
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl p-3 focus:outline-none focus:border-neon-pink transition-colors text-gray-900 dark:text-white"
                                    placeholder="مثلا: آریا کریمی"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Phone size={16} /> شماره موبایل
                                </label>
                                <input 
                                    required
                                    type="tel" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    dir="ltr"
                                    className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl p-3 focus:outline-none focus:border-neon-pink transition-colors text-gray-900 dark:text-white text-left"
                                    placeholder="0912 345 6789"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Home size={16} /> آدرس دقیق پستی
                                </label>
                                <textarea 
                                    required
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl p-3 focus:outline-none focus:border-neon-pink transition-colors text-gray-900 dark:text-white resize-none"
                                    placeholder="استان، شهر، خیابان، کوچه، پلاک، واحد"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">کد پستی (اختیاری)</label>
                                <input 
                                    type="text" 
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    dir="ltr"
                                    className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl p-3 focus:outline-none focus:border-neon-pink transition-colors text-gray-900 dark:text-white text-left"
                                    placeholder="1234567890"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Summary Section */}
                    <div>
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 sticky top-8 transition-colors duration-300">
                            <h2 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">فاکتور شما</h2>
                            
                            <div className="max-h-60 overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="relative w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-sm text-gray-900 dark:text-white">{item.title}</h3>
                                            <p className="text-xs text-gray-500 mt-1">تعداد: {item.quantity}</p>
                                        </div>
                                        <div className="text-sm font-mono font-bold text-neon-pink">
                                            {new Intl.NumberFormat('fa-IR').format(item.price * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 mb-8 pt-4 border-t border-gray-200 dark:border-gray-800">
                                <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                                    <span>هزینه ارسال:</span>
                                    <span>پس‌کرایه (پرداخت در محل)</span>
                                </div>
                                <div className="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-white pt-4">
                                    <span>مبلغ قابل پرداخت:</span>
                                    <span className="font-mono text-neon-pink">{new Intl.NumberFormat('fa-IR').format(total)} تومان</span>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                form="checkout-form"
                                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                            >
                                <MessageCircle size={20} />
                                ثبت نهایی و پیام به واتساپ
                            </button>
                            <p className="text-xs text-center text-gray-500 mt-4">
                                با کلیک روی این دکمه به واتساپ ادمین هدایت می‌شوید تا فیش واریزی را ارسال کنید.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
