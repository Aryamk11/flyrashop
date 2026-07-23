'use client';

import { useActionState, useState } from 'react';
import { addProduct } from '@/app/actions/product';
import ProductCard from '@/components/ProductCard';
import { Eye, EyeOff } from 'lucide-react';

const initialState = {
  error: '',
};

export default function Dashboard() {
  const [state, action, isPending] = useActionState(addProduct, initialState);
  const [previewData, setPreviewData] = useState({
    title: '',
    price: '',
    description: '',
    image_url: ''
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPreviewData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewData(prev => ({ ...prev, image_url: url }));
    }
  };

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 text-right" dir="rtl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Form Section */}
        <div>
          <h1 className="mb-8 text-3xl font-bold text-neon-pink font-[family-name:var(--font-eb-garamond)]">
            مدیریت محصولات
          </h1>

          <form action={action} className="space-y-6">
            {state?.error && (
              <div className="p-4 bg-red-950/50 border border-red-500 text-red-200 rounded font-mono text-sm">
                [خطا]: {state.error}
              </div>
            )}

            <div>
              <label className="block text-gray-600 dark:text-gray-400 mb-2 text-sm font-bold">عنوان محصول</label>
              <input
                name="title"
                required
                className="w-full rounded bg-gray-50 dark:bg-neon-gray border border-gray-300 dark:border-gray-700 p-3 text-gray-900 dark:text-white focus:border-neon-pink outline-none transition-colors"
                placeholder="مثال: کت چرم سایبرپانک"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-400 mb-2 text-sm font-bold">توضیحات تکمیلی</label>
              <textarea
                name="description"
                rows={4}
                className="w-full rounded bg-gray-50 dark:bg-neon-gray border border-gray-300 dark:border-gray-700 p-3 text-gray-900 dark:text-white focus:border-neon-pink outline-none transition-colors"
                placeholder="جنس پارچه، سایز، نحوه شستشو و..."
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-400 mb-2 text-sm font-bold">قیمت (تومان)</label>
              <input
                name="price"
                type="number"
                required
                className="w-full rounded bg-gray-50 dark:bg-neon-gray border border-gray-300 dark:border-gray-700 p-3 text-gray-900 dark:text-white focus:border-neon-pink outline-none transition-colors"
                placeholder="مثال: 2500000"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-400 mb-2 text-sm font-bold">تصویر محصول</label>
              <div className="relative">
                <input
                  name="image"
                  type="file"
                  required
                  accept="image/*"
                  className="w-full text-gray-600 dark:text-gray-400 file:ml-4 file:rounded file:bg-neon-pink file:px-4 file:py-2 file:font-bold file:text-black hover:file:bg-black dark:hover:file:bg-white transition-colors cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                disabled={isPending}
                className="flex-1 rounded bg-neon-pink py-4 font-black text-black hover:bg-white disabled:opacity-50 disabled:cursor-wait transition-all hover:shadow-[0_0_20px_rgba(255,0,127,0.5)]"
              >
                {isPending ? 'در حال آپلود...' : 'ثبت محصول جدید'}
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

            {previewData.title || previewData.image_url ? (
              <div className="max-w-sm mx-auto lg:mx-0">
                <ProductCard product={{
                  id: 'preview',
                  title: previewData.title || 'عنوان محصول',
                  price: previewData.price || 0,
                  image_url: previewData.image_url || '/placeholder.jpg',
                  slug: '#',
                  description: previewData.description
                }} />

                <div className="mt-8 p-6 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-300">
                  <h3 className="text-gray-900 dark:text-white font-bold mb-2">توضیحات:</h3>
                  <p>{previewData.description || 'توضیحات محصول در اینجا نمایش داده می‌شود...'}</p>
                </div>
              </div>
            ) : (
              <div className="flex aspect-square w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 text-gray-500 dark:text-gray-600 transition-colors duration-300">
                <Eye size={48} className="mb-4 opacity-50" />
                <p>اطلاعات را وارد کنید تا پیش‌نمایش فعال شود</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}