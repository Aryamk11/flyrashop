import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 0;

export default async function Home() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />

      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative h-[50vh] w-full overflow-hidden border-b border-neon-pink/20">
          <div className="absolute inset-0 bg-gradient-to-b from-neon-pink/10 to-black z-0" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4">
              استایل <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-purple-600">آینده</span>
            </h2>
            <p className="max-w-md text-gray-400 text-lg mb-8">
              کالکشن محدود و دست‌ساز، طراحی شده برای عصر دیجیتال
            </p>
            <button className="bg-white text-black font-bold px-8 py-3 rounded hover:bg-neon-pink hover:text-white transition-all transform hover:scale-105">
              مشاهده محصولات
            </button>
          </div>
        </section>

        {/* Product Grid */} 
        <section className="container mx-auto px-4 py-16">
            <div className="mb-10 flex items-end justify-between border-b border-gray-800 pb-4">
                <h3 className="text-2xl font-bold text-white">آخرین دراپ‌ها</h3>
                <span className="text-neon-pink font-mono text-sm dir-ltr">
                   {products?.length || 0} ITEMS
                </span>
            </div>

            {products && products.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            ) : (
                <div className="flex h-64 w-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-800 bg-gray-900/50">
                    <p className="text-gray-500">سیستم خالی است. منتظر آپلود ادمین باشید.</p>
                </div>
            )}
        </section>

      </main>

      <Footer />
    </div>
  );
}