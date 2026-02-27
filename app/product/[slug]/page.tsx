
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AddToCartButton from '@/components/Cart/AddToCartButton';

export const revalidate = 60; // Revalidate every minute

export async function generateStaticParams() {
  const { data: products } = await supabase.from('products').select('slug');
  return products
    ?.filter((p) => p.slug)
    .map(({ slug }) => ({ slug: String(slug) })) || [];
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug ? decodeURIComponent(slug) : null)
    .single();

  if (!product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat('fa-IR').format(product.price);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-neon-pink transition-colors">خانه</Link>
            <span>/</span>
            <span className="text-white">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 group">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-700">
                  No Image
                </div>
              )}

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
                  {product.title}
                </h1>
                <p className="text-2xl font-mono text-neon-pink mb-6 dir-ltr text-right">
                  {formattedPrice} <span className="text-sm text-gray-400">Toman</span>
                </p>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {product.description || 'توضیحات محصول به زودی اضافه می‌شود.'}
                </p>
              </div>

              <div className="border-t border-gray-800 pt-8 space-y-4">
                <AddToCartButton product={product} />

                <p className="text-center text-xs text-gray-600 mt-4">
                  ارسال رایگان برای خریدهای بالای ۲ میلیون تومان
                </p>
              </div>

              {/* Additional Info / Specs (Static for now) */}

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}