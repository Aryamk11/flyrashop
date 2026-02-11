'use client';

import { useActionState } from 'react';
import { addProduct } from '@/app/actions/product';

const initialState = {
  error: '',
};

export default function Dashboard() {
  const [state, action, isPending] = useActionState(addProduct, initialState);

  return (
    <div className="min-h-screen p-8 bg-black text-right" dir="rtl">
      <h1 className="mb-8 text-3xl font-bold text-neon-pink font-[family-name:var(--font-eb-garamond)]">
        مدیریت محصولات
      </h1>
      
      <form action={action} className="max-w-xl space-y-6">
        {state?.error && (
            <div className="p-4 bg-red-950/50 border border-red-500 text-red-200 rounded font-mono text-sm">
                [خطا]: {state.error}
            </div>
        )}

        <div>
          <label className="block text-gray-400 mb-2 text-sm font-bold">عنوان محصول</label>
          <input name="title" required className="w-full rounded bg-neon-gray border border-gray-700 p-3 text-white focus:border-neon-pink outline-none transition-colors" placeholder="مثال: کت چرم سایبرپانک" />
        </div>

        <div>
            <label className="block text-gray-400 mb-2 text-sm font-bold">توضیحات تکمیلی</label>
            <textarea name="description" rows={4} className="w-full rounded bg-neon-gray border border-gray-700 p-3 text-white focus:border-neon-pink outline-none transition-colors" placeholder="جنس پارچه، سایز، نحوه شستشو و..." />
        </div>

        <div>
          <label className="block text-gray-400 mb-2 text-sm font-bold">قیمت (تومان)</label>
          <input name="price" type="number" required className="w-full rounded bg-neon-gray border border-gray-700 p-3 text-white focus:border-neon-pink outline-none transition-colors" placeholder="مثال: 2500000" />
        </div>

        <div>
          <label className="block text-gray-400 mb-2 text-sm font-bold">تصویر محصول</label>
          <div className="relative">
            <input name="image" type="file" required accept="image/*" className="w-full text-gray-400 file:ml-4 file:rounded file:bg-neon-pink file:px-4 file:py-2 file:font-bold file:text-black hover:file:bg-white cursor-pointer" />
          </div>
        </div>
        
        <button 
          disabled={isPending} 
          className="w-full rounded bg-neon-pink py-4 font-black text-black hover:bg-white disabled:opacity-50 disabled:cursor-wait transition-all hover:shadow-[0_0_20px_rgba(255,0,127,0.5)]"
        >
          {isPending ? 'در حال آپلود...' : 'ثبت محصول جدید'}
        </button>
      </form>
    </div>
  );
}