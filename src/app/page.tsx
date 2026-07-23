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

  // Fallback to dummy data if database is empty so you can see your uploaded images
  const dummyProducts = [
    {
      id: 'dummy-1',
      title: 'گردنبند صلیب گوهر سرخ',
      slug: 'gothic-red-stone-cross',
      price: 850000,
      image_url: '/images/products/photo_1.jpg'
    },
    {
      id: 'dummy-2',
      title: 'گردنبند چارم Y2K',
      slug: 'y2k-charm-statement',
      price: 720000,
      image_url: '/images/products/photo_2.jpg'
    },
    {
      id: 'dummy-3',
      title: 'گردنبند کازینو رویال',
      slug: 'casino-royale-charm',
      price: 790000,
      image_url: '/images/products/photo_3.jpg'
    },
    {
      id: 'dummy-4',
      title: 'گردنبند صلیب شاین صورتی',
      slug: 'pink-sparkle-cross',
      price: 820000,
      image_url: '/images/products/photo_4.jpg'
    },
    {
      id: 'dummy-5',
      title: 'گردنبند خفاش و پنتاگرام',
      slug: 'bat-pentagram-gothic',
      price: 890000,
      image_url: '/images/products/photo_5.jpg'
    },
    {
      id: 'dummy-6',
      title: 'گردنبند لایه‌ای مروارید و صلیب',
      slug: 'silver-cross-pearl',
      price: 950000,
      image_url: '/images/products/photo_6.jpg'
    },
    {
      id: 'dummy-7',
      title: 'گردنبند خون‌آشام',
      slug: 'vampire-red-oval',
      price: 880000,
      image_url: '/images/products/photo_7.jpg'
    }
  ];

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