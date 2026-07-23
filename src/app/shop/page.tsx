import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { dummyProducts } from '@/lib/dummyData';
import ShopClient from '@/components/ShopClient';

export const revalidate = 0;

export default async function ShopPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  const displayProducts = products && products.length > 0 ? products : dummyProducts;

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <Header />

      <main className="flex-1">
        {/* Header Section */}
        <div className="border-b border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 py-12 transition-colors duration-300">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
              فروشگاه
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              تمامی محصولات و اکسسوری‌های خاص را اینجا پیدا کنید.
            </p>
          </div>
        </div>

        {/* Product Grid */} 
        <ShopClient products={displayProducts} />
      </main>

      <Footer />
    </div>
  );
}
