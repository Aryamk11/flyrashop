'use client';

import { useCart, CartItem } from '@/components/Cart/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, Save, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';

export default function CartPage() {
    const { items: contextItems, syncCart, total: contextTotal } = useCart();
    const [isEditMode, setIsEditMode] = useState(false);
    const [draftItems, setDraftItems] = useState<CartItem[]>([]);

    // Initialize draft items when entering edit mode or when context items change (if not editing)
    useEffect(() => {
        if (!isEditMode) {
            setDraftItems(JSON.parse(JSON.stringify(contextItems)));
        }
    }, [contextItems, isEditMode]);

    const handleEnterEdit = () => {
        setDraftItems(JSON.parse(JSON.stringify(contextItems)));
        setIsEditMode(true);
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        setDraftItems(JSON.parse(JSON.stringify(contextItems)));
    };

    const handleSaveEdit = () => {
        // Filter out items with 0 quantity (deleted)
        const finalItems = draftItems.filter(item => item.quantity > 0);
        syncCart(finalItems);
        setIsEditMode(false);
    };

    // Draft modification handlers
    const incrementDraft = (id: string) => {
        setDraftItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decrementDraft = (id: string) => {
        setDraftItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
        ));
    };

    const removeDraft = (id: string) => {
        setDraftItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: 0 } : item
        ));
    };

    const restoreDraft = (id: string) => {
        setDraftItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: 1 } : item // Restore to 1? Or find original quantity?
            // To restore properly, we need to find original quantity.
            // Simplified: verify against contextItems. 
        ));
        // Better implementation for restore:
        const originalItem = contextItems.find(i => i.id === id);
        if (originalItem) {
            setDraftItems(prev => prev.map(item =>
                item.id === id ? { ...item, quantity: originalItem.quantity } : item
            ));
        }
    };


    // Calculation Logic
    // We need to display ALL items: those in draft (qty > 0) AND those deleted (qty == 0)
    // Actually, deleted items are still in draftItems but with qty=0 if we use decrement/remove logic above.

    const calculateDiffs = () => {
        let addedPrice = 0;
        let subtractedPrice = 0;
        let finalTotal = 0;

        draftItems.forEach(draftItem => {
            const originalItem = contextItems.find(i => i.id === draftItem.id);
            const originalQty = originalItem ? originalItem.quantity : 0;
            const currentQty = draftItem.quantity;

            finalTotal += currentQty * draftItem.price;

            if (currentQty > originalQty) {
                addedPrice += (currentQty - originalQty) * draftItem.price;
            } else if (currentQty < originalQty) {
                subtractedPrice += (originalQty - currentQty) * draftItem.price;
            }
        });

        return { addedPrice, subtractedPrice, finalTotal };
    };

    const { addedPrice, subtractedPrice, finalTotal } = calculateDiffs();
    const formattedTotal = new Intl.NumberFormat('fa-IR').format(isEditMode ? finalTotal : contextTotal);

    return (
        <div className="flex min-h-screen flex-col bg-black text-white" dir="rtl">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-12">
                <h1 className="mb-8 text-3xl font-bold text-center text-white font-[family-name:var(--font-eb-garamond)]">
                    سبد خرید شما
                </h1>

                {contextItems.length === 0 && !isEditMode ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-gray-800 rounded-xl bg-gray-900/30">
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
                        {/* Cart Items List - Right Side (Bigger) */}
                        <div className="lg:col-span-2 space-y-4">
                            {draftItems.map((item) => {
                                const originalItem = contextItems.find(i => i.id === item.id);
                                const originalQty = originalItem ? originalItem.quantity : 0;
                                const currentQty = item.quantity;

                                // Determine Styling
                                let rowClass = "bg-neon-gray/30 border-gray-800";
                                let isDeleted = false;

                                if (isEditMode) {
                                    if (currentQty === 0) {
                                        rowClass = "bg-red-900/20 border-red-500/50 relative overflow-hidden";
                                        isDeleted = true;
                                    } else if (currentQty > originalQty) {
                                        rowClass = "bg-green-900/20 border-green-500/50";
                                    } else if (currentQty < originalQty) {
                                        rowClass = "bg-yellow-900/20 border-yellow-500/50";
                                    }
                                }

                                return (
                                    <div key={item.id} className={clsx(
                                        "flex flex-col sm:flex-row items-center gap-4 border p-4 rounded-xl transition-all",
                                        rowClass
                                    )}>
                                        {isDeleted && (
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                                <div className="w-full h-0.5 bg-red-500/50 rotate-0"></div>
                                            </div>
                                        )}

                                        <div className="relative w-full sm:w-24 h-24 flex-shrink-0 bg-black/50 rounded-lg overflow-hidden">
                                            <Image
                                                src={item.image_url}
                                                alt={item.title}
                                                fill
                                                className={clsx("object-cover", isDeleted && "grayscale opacity-50")}
                                            />
                                        </div>

                                        <div className="flex-1 text-center sm:text-right w-full z-20">
                                            <h3 className={clsx("font-bold text-lg mb-1", isDeleted && "text-gray-500 line-through")}>{item.title}</h3>
                                            <p className="text-neon-pink font-mono mb-2 text-sm">
                                                {new Intl.NumberFormat('fa-IR').format(item.price)} تومان
                                            </p>
                                        </div>

                                        {/* Controls */}
                                        <div className="flex items-center gap-4 z-20">
                                            {isEditMode ? (
                                                <>
                                                    {isDeleted ? (
                                                        <button
                                                            onClick={() => restoreDraft(item.id)}
                                                            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm"
                                                        >
                                                            برگشت
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center bg-black/50 rounded-lg border border-gray-700">
                                                            <button
                                                                onClick={() => incrementDraft(item.id)}
                                                                className="p-2 hover:text-green-400 transition-colors"
                                                            >
                                                                <Plus size={16} />
                                                            </button>
                                                            <span className="w-8 text-center font-mono">{item.quantity}</span>
                                                            <button
                                                                onClick={() => decrementDraft(item.id)}
                                                                className="p-2 hover:text-yellow-400 transition-colors"
                                                            >
                                                                <Minus size={16} />
                                                            </button>
                                                        </div>
                                                    )}

                                                    {!isDeleted && (
                                                        <button
                                                            onClick={() => removeDraft(item.id)}
                                                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    )}
                                                </>
                                            ) : (
                                                <span className="font-mono text-xl bg-black/30 px-3 py-1 rounded border border-gray-800">
                                                    x{item.quantity}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Summary - Left Side */}
                        <div className="lg:col-span-1">
                            <div className="bg-neon-gray border border-gray-800 rounded-xl p-6 sticky top-24">
                                <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2 text-center">خلاصه سفارش</h2>

                                {isEditMode ? (
                                    <div className="space-y-4 mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
                                        {addedPrice > 0 && (
                                            <div className="flex justify-between text-green-400">
                                                <span>افزایش:</span>
                                                <span className="font-mono">+{new Intl.NumberFormat('fa-IR').format(addedPrice)}</span>
                                            </div>
                                        )}
                                        {subtractedPrice > 0 && (
                                            <div className="flex justify-between text-red-400">
                                                <span>کاهش:</span>
                                                <span className="font-mono">-{new Intl.NumberFormat('fa-IR').format(subtractedPrice)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-gray-700">
                                            <span>جمع کل نهایی:</span>
                                            <span className="font-mono text-neon-pink">{formattedTotal} تومان</span>
                                        </div>

                                        <div className="flex flex-col gap-3 mt-8">
                                            <button
                                                onClick={handleSaveEdit}
                                                className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,0,0.3)]"
                                            >
                                                <Save size={18} />
                                                ثبت تغییرات
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="w-full bg-red-500/20 text-red-400 border border-red-500/50 py-3 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                                            >
                                                <X size={18} />
                                                لغو تغییرات
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex justify-between text-xl font-bold text-neon-pink mb-8">
                                            <span>جمع کل نهایی:</span>
                                            <span className="font-mono">{formattedTotal} تومان</span>
                                        </div>

                                        <button
                                            onClick={handleEnterEdit}
                                            className="w-full bg-neon-pink text-black py-4 rounded-lg font-black text-lg hover:bg-white transition-all shadow-[0_0_15px_rgba(255,0,127,0.3)] hover:shadow-[0_0_25px_rgba(255,0,127,0.5)] mb-4"
                                        >
                                            ویرایش یا نهایی کردن خرید
                                        </button>

                                        <Link
                                            href="/"
                                            className="flex items-center justify-center gap-2 text-gray-500 hover:text-white transition-colors text-sm"
                                        >
                                            <ArrowRight size={16} />
                                            بازگشت به خرید
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
