'use client';

import { useActionState, useEffect, useState } from 'react';
import { updateProduct } from '@/app/actions/product';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import { Eye, EyeOff, Loader2, Save, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const initialState = {
    error: '',
};

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const [id, setId] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [state, action, isPending] = useActionState(updateProduct, initialState);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        image_url: ''
    });

    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        async function loadProduct() {
            const { id } = await params;
            setId(id);

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (data) {
                setFormData({
                    title: data.title,
                    price: data.price.toString(),
                    description: data.description || '',
                    image_url: data.image_url
                });
            }
            setLoading(false);
        }
        loadProduct();
    }, [params]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, image_url: url }));
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center bg-black text-neon-pink"><Loader2 className="animate-spin w-10 h-10" /></div>;

    return (
        <div className="min-h-screen p-8 bg-black text-right" dir="rtl">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Form Section */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/admin/products" className="text-gray-400 hover:text-white transition-colors">
                            <ArrowRight size={24} />
                        </Link>
                        <h1 className="text-3xl font-bold text-neon-pink font-[family-name:var(--font-eb-garamond)]">
                            ویرایش محصول
                        </h1>
                    </div>

                    <form action={action} className="space-y-6">
                        <input type="hidden" name="id" value={id} />

                        {state?.error && (
                            <div className="p-4 bg-red-950/50 border border-red-500 text-red-200 rounded font-mono text-sm">
                                [خطا]: {state.error}
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-bold">عنوان محصول</label>
                            <input
                                name="title"
                                required
                                value={formData.title}
                                className="w-full rounded bg-neon-gray border border-gray-700 p-3 text-white focus:border-neon-pink outline-none transition-colors"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-bold">توضیحات تکمیلی</label>
                            <textarea
                                name="description"
                                rows={4}
                                value={formData.description}
                                className="w-full rounded bg-neon-gray border border-gray-700 p-3 text-white focus:border-neon-pink outline-none transition-colors"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-bold">قیمت (تومان)</label>
                            <input
                                name="price"
                                type="number"
                                required
                                value={formData.price}
                                className="w-full rounded bg-neon-gray border border-gray-700 p-3 text-white focus:border-neon-pink outline-none transition-colors"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-2 text-sm font-bold">تصویر جدید (اختیاری)</label>
                            <div className="relative">
                                <input
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    className="w-full text-gray-400 file:ml-4 file:rounded file:bg-neon-pink file:px-4 file:py-2 file:font-bold file:text-black hover:file:bg-white cursor-pointer"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                disabled={isPending}
                                className="flex-1 rounded bg-neon-pink py-4 font-black text-black hover:bg-white disabled:opacity-50 disabled:cursor-wait transition-all hover:shadow-[0_0_20px_rgba(255,0,127,0.5)] flex items-center justify-center gap-2"
                            >
                                <Save size={20} />
                                {isPending ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowPreview(!showPreview)}
                                className="px-6 rounded border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-black transition-all flex items-center justify-center gap-2 font-bold"
                            >
                                {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
                                {showPreview ? 'مخفی کردن' : 'پیش‌نمایش'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Preview Section */}
                <div className={`transition-all duration-500 ${showPreview ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-10 grayscale blur-sm pointer-events-none'}`}>
                    <div className="sticky top-8">
                        <h2 className="mb-8 text-2xl font-bold text-gray-500">
                            پیش‌نمایش زنده
                        </h2>

                        <div className="max-w-sm mx-auto lg:mx-0">
                            <ProductCard product={{
                                id: 'preview',
                                title: formData.title || 'عنوان محصول',
                                price: parseFloat(formData.price) || 0,
                                image_url: formData.image_url || '/placeholder.jpg',
                                slug: '#',
                                description: formData.description
                            }} />

                            <div className="mt-8 p-6 rounded-xl border border-dashed border-gray-700 bg-gray-900/50 text-gray-400 text-sm leading-relaxed">
                                <h3 className="text-white font-bold mb-2">توضیحات:</h3>
                                <p>{formData.description || 'توضیحات محصول...'}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
