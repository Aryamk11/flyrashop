'use client';

import { useCart } from '@/components/Cart/CartContext';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Trash2, Plus, Minus, Check, X, ArrowRight, Save, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartEditPage() {
    const { items, syncCart } = useCart();
    const [localItems, setLocalItems] = useState<any[]>([]);
    const [originalItems, setOriginalItems] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Deep copy to break reference
        setLocalItems(JSON.parse(JSON.stringify(items)));
        setOriginalItems(JSON.parse(JSON.stringify(items)));
    }, [items]);

    const handleIncrement = (id: string) => {
        setLocalItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1, status: 'increased' } : item
        ));
    };

    const handleDecrement = (id: string) => {
        setLocalItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity - 1);
                // If it goes back to original, clear status? Or keep 'decreased'? 
                // Logic: if current < original, status = decreased.
                // Simple approach: set status based on change direction from PREVIOUS state or just mark as modified.
                // User asked for: "added ones will be highlighted green, reduced ones highlight yellow"
                return { ...item, quantity: newQuantity, status: 'decreased' };
            }
            return item;
        }));
    };

    const handleDelete = (id: string) => {
        setLocalItems(prev => prev.map(item =>
            item.id === id ? { ...item, status: 'deleted', quantity: 0 } : item
        ));
    };

    const handleUndoDelete = (id: string) => {
        setLocalItems(prev => prev.map(item => {
            if (item.id === id) {
                // Restore quantity from original if possible, or default to 1
                const original = originalItems.find(i => i.id === id);
                return { ...item, status: 'restored', quantity: original ? original.quantity : 1 };
            }
            return item;
        }));
    };

    const calculateChanges = () => {
        let oldTotal = 0;
        let newTotal = 0;
        let changes: any[] = [];

        originalItems.forEach(item => {
            oldTotal += item.price * item.quantity;
        });

        localItems.forEach(item => {
            if (item.status !== 'deleted') {
                newTotal += item.price * item.quantity;
            }

            const original = originalItems.find(i => i.id === item.id);
            if (original) {
                const diff = (item.quantity - original.quantity) * item.price;
                if (diff !== 0 && item.status !== 'deleted') {
                    // tracked automatically by total diff
                }
            }
        });

        return { oldTotal, newTotal, diff: newTotal - oldTotal };
    };

    const { oldTotal, newTotal, diff } = calculateChanges();

    const handleSave = () => {
        // Filter out deleted items and update cart
        const finalItems = localItems.filter(item => item.status !== 'deleted').map(({ status, ...item }) => item);
        syncCart(finalItems);
        // router.push('/'); // Change: Stay on page
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8" dir="rtl">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-4">
                    <button onClick={handleCancel} className="text-gray-400 hover:text-white transition-colors">
                        <ArrowRight size={24} />
                    </button>
                    <h1 className="text-3xl font-bold text-neon-pink font-[family-name:var(--font-eb-garamond)]">
                        ویرایش سبد خرید
                    </h1>
                </div>

                {/* Actions Bar - Diff Dependent */}
                {diff !== 0 && (
                    <div className="flex items-center gap-3 mb-8 animate-in slide-in-from-top-4 fade-in duration-300 sticky top-4 z-50 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-neon-pink/30 shadow-[0_0_20px_rgba(255,20,147,0.1)]">
                        <button onClick={handleSave} className="flex-1 bg-neon-pink text-black font-bold py-3 rounded-xl hover:bg-white transition-all shadow-[0_0_15px_rgba(255,20,147,0.4)] flex items-center justify-center gap-2">
                            <Save size={20} />
                            ذخیره تغییرات
                        </button>
                        <button onClick={handleCancel} className="flex-1 border border-gray-700 text-gray-400 font-bold py-3 rounded-xl hover:text-white hover:border-gray-500 transition-all">
                            انصراف
                        </button>
                    </div>
                )}



                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Items Column */}
                    <div className="lg:col-span-2 space-y-4">
                        {localItems.map(item => {
                            let rowClass = "border border-gray-800 bg-gray-900/50";
                            let statusColor = "text-white";

                            // Determine Row Styling based on current state vs original
                            // Check exact changes to apply logic strictly as requested:
                            // "added ones green, reduced ones yellow, deleted ones red + strike"

                            const original = originalItems.find(i => i.id === item.id);
                            const isAdded = original && item.quantity > original.quantity;
                            const isReduced = original && item.quantity < original.quantity && item.status !== 'deleted';
                            const isDeleted = item.status === 'deleted';

                            if (isAdded) {
                                rowClass = "border-green-500/50 bg-green-950/20";
                                statusColor = "text-green-400";
                            } else if (isReduced) {
                                rowClass = "border-yellow-500/50 bg-yellow-950/20";
                                statusColor = "text-yellow-400";
                            } else if (isDeleted) {
                                rowClass = "border-red-500/50 bg-red-950/20 relative overflow-hidden";
                                statusColor = "text-red-400";
                            }

                            return (
                                <div key={item.id} className={`flex items-center gap-4 p-4 rounded-xl transition-all ${rowClass}`}>
                                    {/* Strike line for deleted */}
                                    {isDeleted && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-full h-[2px] bg-red-500/50 transform rotate-1"></div>
                                        </div>
                                    )}

                                    <div className="relative w-24 h-24 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                                    </div>

                                    <div className="flex-1 z-10">
                                        <h3 className={`font-bold text-lg ${statusColor}`}>{item.title}</h3>
                                        <div className="text-gray-400 font-mono text-sm mt-1">
                                            {new Intl.NumberFormat('fa-IR').format(item.price)} تومان
                                        </div>

                                        <div className="flex items-center gap-2 mt-2 text-xs">
                                            {isAdded && <span className="text-green-500 flex items-center gap-1"><Plus size={12} /> افزوده شده</span>}
                                            {isReduced && <span className="text-yellow-500 flex items-center gap-1"><Minus size={12} /> کاهش یافته</span>}
                                            {isDeleted && <span className="text-red-500 flex items-center gap-1"><Trash2 size={12} /> حذف شده</span>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-3 z-10">
                                        {!isDeleted ? (
                                            <>
                                                <div className="flex items-center bg-black rounded-lg border border-gray-700">
                                                    <button onClick={() => handleIncrement(item.id)} className="p-2 hover:text-green-400 transition-colors"><Plus size={16} /></button>
                                                    <span className="w-8 text-center font-bold font-mono">{item.quantity}</span>
                                                    <button onClick={() => handleDecrement(item.id)} className="p-2 hover:text-yellow-400 transition-colors"><Minus size={16} /></button>
                                                </div>
                                                <button onClick={() => handleDelete(item.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded transition-colors">
                                                    <Trash2 size={20} />
                                                </button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleUndoDelete(item.id)} className="text-blue-400 flex items-center gap-2 px-3 py-1 text-sm bg-blue-400/10 rounded hover:bg-blue-400/20 transition-colors">
                                                <RotateCcw size={16} />
                                                بازگردانی
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {localItems.length === 0 && (
                            <div className="text-center py-12 text-gray-500 border border-dashed border-gray-800 rounded-xl">
                                سبد خرید شما خالی است.
                            </div>
                        )}
                    </div>

                    {/* Summary Column */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-8">
                            <h2 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-2">خلاصه تغییرات</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-gray-400">
                                    <span>مبلغ قبلی:</span>
                                    <span className="font-mono">{new Intl.NumberFormat('fa-IR').format(oldTotal)}</span>
                                </div>

                                {diff !== 0 && (
                                    <div className="flex justify-between items-center bg-black/50 p-3 rounded-lg">
                                        <span>تغییرات:</span>
                                        <span className={`font-mono font-bold ${diff > 0 ? 'text-green-500' : 'text-red-500'}`} dir="ltr">
                                            {diff > 0 ? '+' : ''}{new Intl.NumberFormat('fa-IR').format(diff)}
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center text-xl font-bold text-white pt-4 border-t border-gray-800">
                                    <span>مبلغ نهایی:</span>
                                    <span className="font-mono text-neon-pink">{new Intl.NumberFormat('fa-IR').format(newTotal)} تومان</span>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
