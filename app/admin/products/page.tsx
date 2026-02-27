'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Edit, Plus, Loader2 } from 'lucide-react';

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setProducts(data);
        setLoading(false);
    };

    const handleDelete = async (id: string, skipConfirm = false) => {
        if (!skipConfirm && !confirm('آیا از حذف این محصول اطمینان دارید؟')) return;

        console.log('Deleting product:', id);
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
            console.error('Delete error:', error);
            alert('خطا در حذف محصول: ' + error.message);
        } else {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center bg-black text-neon-pink"><Loader2 className="animate-spin w-10 h-10" /></div>;

    return (
        <div className="min-h-screen p-8 bg-black text-right" dir="rtl">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                    <h1 className="text-3xl font-bold text-neon-pink font-[family-name:var(--font-eb-garamond)]">
                        لیست محصولات
                    </h1>
                    <Link href="/admin/dashboard" className="bg-neon-pink text-black px-4 py-2 rounded flex items-center gap-2 font-bold hover:bg-white transition-colors">
                        <Plus size={20} />
                        محصول جدید
                    </Link>
                </div>

                <div className="grid gap-4">
                    {products.map(product => (
                        <div key={product.id} className="flex items-center gap-4 bg-neon-gray/20 border border-gray-800 p-4 rounded-xl hover:border-gray-600 transition-colors">
                            <div className="relative w-20 h-20 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
                                <Image src={product.image_url} alt={product.title} fill className="object-cover" unoptimized={product.image_url?.startsWith('blob:')} />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-white font-bold">{product.title}</h3>
                                <p className="text-neon-pink font-mono text-sm">{new Intl.NumberFormat('fa-IR').format(product.price)} تومان</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/admin/products/${product.id}`}
                                    className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                    title="ویرایش"
                                >
                                    <Edit size={20} />
                                </Link>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        // Specific debugging to catch event bubbling issues
                                        e.preventDefault();
                                        e.stopPropagation();
                                        console.log('Delete button clicked for:', product.id);
                                        // Double check via window.confirm to bypass any weird react/browser issues with simple confirm()
                                        if (window.confirm('آیا از حذف این محصول اطمینان دارید؟')) {
                                            handleDelete(product.id, true); // pass true to skip internal confirm
                                        }
                                    }}
                                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors z-20 relative"
                                    title="حذف"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {products.length === 0 && (
                        <div className="text-center text-gray-500 py-12 border border-dashed border-gray-800 rounded-xl">
                            هیچ محصولی یافت نشد.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
