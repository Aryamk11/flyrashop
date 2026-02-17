'use client';

import { useCart } from '@/components/Cart/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

export default function CartPage() {
    const { items, incrementItem, decrementItem, removeFromCart, total } = useCart();

    const formattedTotal = new Intl.NumberFormat('fa-IR').format(total);

    return (
        <div className="flex min-h-screen flex-col bg-black text-white" dir="rtl">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-12">
                <h1 className="mb-8 text-3xl font-bold text-neon-pink font-[family-name:var(--font-eb-garamond)] border-b border-gray-800 pb-4">
                    سبد خرید شما
                </h1>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 text-gray-600">
                            <Trash2 size={48} className="mx-auto opacity-50" />
                        </div>
                        <p className="text-xl text-gray-400 mb-8">سبد خرید شما خالی است.</p>
                        <Link
                            href="/"
                            className="bg-neon-pink text-black px-8 py-3 rounded font-bold hover:bg-white transition-all transform hover:scale-105"
                        >
                            بازگشت به فروشگاه
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 bg-neon-gray/30 border border-gray-800 p-4 rounded-xl transition-all hover:border-gray-600">
                                    <div className="relative w-full sm:w-32 h-32 flex-shrink-0 bg-black/50 rounded-lg overflow-hidden">
                                        <Image
                                            src={item.image_url}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 text-center sm:text-right w-full">
                                        <h3 className="font-bold text-lg mb-1 text-white">{item.title}</h3>
                                        <p className="text-neon-pink font-mono mb-4 text-sm">
                                            {new Intl.NumberFormat('fa-IR').format(item.price)} تومان
                                        </p>

                                        <div className="flex items-center justify-center sm:justify-start gap-4">
                                            <div className="flex items-center bg-black/50 rounded-lg border border-gray-700">
                                                <button
                                                    onClick={() => incrementItem(item.id)}
                                                    className="p-2 hover:text-neon-pink transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                                <span className="w-8 text-center font-mono">{item.quantity}</span>
                                                <button
                                                    onClick={() => decrementItem(item.id)}
                                                    className="p-2 hover:text-red-400 transition-colors"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-gray-500 hover:text-red-500 transition-all border border-transparent hover:border-red-500/30 rounded-lg"
                                                title="حذف"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-neon-gray border border-gray-800 rounded-xl p-6 sticky top-24">
                                <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">خلاصه سفارش</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-400">
                                        <span>تعداد اقلام:</span>
                                        <span className="font-mono text-white">{items.reduce((acc, i) => acc + i.quantity, 0)}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-neon-pink pt-4 border-t border-gray-700">
                                        <span>مبلغ کل:</span>
                                        <span className="font-mono">{formattedTotal} تومان</span>
                                    </div>
                                </div>

                                <button className="w-full bg-neon-pink text-black py-4 rounded-lg font-black text-lg hover:bg-white transition-all shadow-[0_0_15px_rgba(255,0,127,0.3)] hover:shadow-[0_0_25px_rgba(255,0,127,0.5)]">
                                    ادامه جهت تسویه حساب
                                </button>

                                <Link
                                    href="/"
                                    className="flex items-center justify-center gap-2 mt-4 text-gray-500 hover:text-white transition-colors text-sm"
                                >
                                    <ArrowLeft size={16} />
                                    بازگشت به خرید
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
