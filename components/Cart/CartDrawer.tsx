'use client';

import { useCart } from '@/components/Cart/CartContext';
import { useState } from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
    const { items, isOpen, toggleCart, removeFromCart, total } = useCart();
    const formattedTotal = new Intl.NumberFormat('fa-IR').format(total);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    if (!isOpen) return null;

    const generateWhatsAppLink = () => {
        let message = `سلام، سفارش جدید از سایت:\n\n`;
        items.forEach((item) => {
            message += `- ${item.title} (${item.quantity} عدد)\n`;
        });
        message += `\nمجموع: ${formattedTotal} تومان\n`;
        message += `\nلطفاً راهنمایی کنید.`;

        return `https://wa.me/98912xxxxxxx?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={toggleCart}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-gray-900 border-l border-gray-800 shadow-2xl flex flex-col h-full transform transition-transform duration-300">
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-neon-pink" />
                        سبد خرید
                        <span className="text-sm font-mono text-gray-400">({items.length})</span>
                    </h2>
                    <button onClick={toggleCart} className="text-gray-400 hover:text-white transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <ShoppingBag className="h-16 w-16 mb-4 opacity-20" />
                            <p>سبد خرید شما خالی است</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-black/40 p-3 rounded-lg border border-gray-800/50">
                                <div className="relative h-20 w-20 flex-shrink-0 bg-gray-800 rounded-md overflow-hidden">
                                    <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-white text-sm">{item.title}</h3>
                                        <p className="text-neon-pink font-mono text-sm mt-1">
                                            {new Intl.NumberFormat('fa-IR').format(item.price)} <span className="text-xs text-gray-500">تومان</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-gray-400">تعداد: {item.quantity}</span>
                                        <button
                                            onClick={() => {
                                                if (confirmDeleteId === item.id) {
                                                    removeFromCart(item.id);
                                                    setConfirmDeleteId(null);
                                                } else {
                                                    setConfirmDeleteId(item.id);
                                                    // Auto-reset after 3 seconds
                                                    setTimeout(() => setConfirmDeleteId(null), 3000);
                                                }
                                            }}
                                            className={`${confirmDeleteId === item.id ? 'text-neon-pink bg-neon-pink/10 px-2 py-0.5 rounded' : 'text-red-500 hover:text-red-400'} transition-all text-xs flex items-center gap-1`}
                                        >
                                            {confirmDeleteId === item.id ? (
                                                <div className="flex gap-1">
                                                    <span>مطمئنی؟</span>
                                                    <span
                                                        className="text-white hover:underline cursor-pointer px-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setConfirmDeleteId(null);
                                                        }}
                                                    >
                                                        خیر
                                                    </span>
                                                </div>
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-4 border-t border-gray-800 bg-black/20">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-400">مجموع قابل پرداخت:</span>
                            <span className="text-xl font-bold text-white dir-ltr font-mono">{formattedTotal} تومان</span>
                        </div>

                        <Link
                            href="/cart/edit"
                            onClick={toggleCart}
                            className="block w-full mt-3 bg-neon-pink text-black text-center font-bold py-3 rounded-lg hover:bg-white transition-all shadow-[0_0_15px_rgba(255,20,147,0.4)]"
                        >
                            ویرایش یا نهایی کردن خرید
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
