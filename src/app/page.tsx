import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { dummyProducts } from '@/lib/dummyData';
import Link from 'next/link';

export const revalidate = 0;

export default async function Home() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  const displayProducts = products && products.length > 0 ? products : dummyProducts;

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <Header />

      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative h-[50vh] w-full overflow-hidden border-b border-neon-pink/50 cyber-grid">
          <div className="absolute inset-0 bg-gradient-to-b from-neon-pink/10 to-white dark:to-black z-0 transition-colors duration-300" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              استایل <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-purple-600">آینده</span>
            </h2>
            <p className="max-w-md text-gray-600 dark:text-gray-400 text-lg mb-8 transition-colors duration-300">
              کالکشن محدود و دست‌ساز، طراحی شده برای عصر دیجیتال
            </p>
            <button className="cyber-cut border border-neon-pink bg-white/80 dark:bg-black/50 backdrop-blur-sm text-neon-pink font-bold px-8 py-3 transition-all duration-300 hover:bg-neon-pink hover:text-white hover:glow-pink transform hover:scale-105">
              مشاهده محصولات
            </button>
          </div>
        </section>

        {/* Marquee Banner */}
        <div className="w-full bg-neon-pink text-black py-3 overflow-hidden border-y border-white/20 dark:border-black/20 flex whitespace-nowrap">
          <div className="animate-marquee inline-block font-black tracking-widest text-sm md:text-base">
            <span className="mx-4">🔥 ارسال رایگان خریدهای بالای ۲ میلیون تومان 🔥</span>
            <span className="mx-4">///</span>
            <span className="mx-4 font-mono">100% ORIGINAL DESIGN</span>
            <span className="mx-4">///</span>
            <span className="mx-4">طراحی شده برای عصر دیجیتال</span>
            <span className="mx-4">///</span>
            <span className="mx-4 font-mono">CYBERPUNK AESTHETICS</span>
            <span className="mx-4">///</span>
            <span className="mx-4">🔥 ارسال رایگان خریدهای بالای ۲ میلیون تومان 🔥</span>
            <span className="mx-4">///</span>
            <span className="mx-4 font-mono">100% ORIGINAL DESIGN</span>
            <span className="mx-4">///</span>
            <span className="mx-4">طراحی شده برای عصر دیجیتال</span>
            <span className="mx-4">///</span>
            <span className="mx-4 font-mono">CYBERPUNK AESTHETICS</span>
          </div>
        </div>

        {/* Featured Categories */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['گردنبند', 'انگشتر', 'دستبند', 'اکسسوری'].map((category) => (
              <Link 
                href="/shop" 
                key={category}
                className="group relative h-32 flex items-center justify-center overflow-hidden cyber-cut border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 hover:border-neon-pink transition-all duration-300"
              >
                <div className="absolute inset-0 bg-neon-pink/0 group-hover:bg-neon-pink/10 transition-colors duration-300" />
                <span className="relative z-10 text-xl font-bold text-gray-900 dark:text-white group-hover:text-neon-pink transition-colors duration-300">
                  {category}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Product Grid */} 
        <section className="container mx-auto px-4 py-16">
            <div className="mb-10 flex items-end justify-between border-b border-gray-300 dark:border-gray-800 pb-4 transition-colors duration-300">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 transition-colors duration-300">
                  <span className="h-3 w-3 bg-neon-pink rounded-full glow-pink inline-block animate-pulse-fast"></span> 
                  آخرین دراپ‌ها
                </h3>
                <span className="text-neon-pink font-mono text-sm dir-ltr">
                   {displayProducts.length} ITEMS
                </span>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}