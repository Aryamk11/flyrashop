import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

export const revalidate = 0;

export default async function Home() {
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false });

  return (
    <main className="min-h-screen p-8">
      <nav className="mb-12 flex items-center justify-between border-b border-neon-pink/30 pb-4">
        <h1 className="text-4xl font-black text-white tracking-tighter">
          FLYRA<span className="text-neon-pink">SHOP</span>
        </h1>
        <a href="/admin/login" className="text-xs text-gray-500 hover:text-neon-pink">Admin</a>
      </nav>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  );
}