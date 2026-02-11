import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const { id } = await params; // Await params in Next.js 15+

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) return notFound();

  const formattedPrice = new Intl.NumberFormat('fa-IR').format(product.price);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />

      <main className="container mx-auto flex-1 px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* LEFT: Image Section */}
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-neon-gray bg-neon-gray shadow-2xl shadow-neon-pink/10">
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* RIGHT: Details Section */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white mb-2 font-[family-name:var(--font-eb-garamond)]">
                {product.title}
              </h1>
              <p className="text-2xl font-mono text-neon-pink">{formattedPrice} تومان</p>
            </div>

            <div className="prose prose-invert border-l-2 border-neon-pink/30 pl-4">
              <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                {product.description || "توضیحات تکمیلی برای این محصول ثبت نشده است."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-8">
              <Link
                href={`https://wa.me/98912xxxxxxx?text=سلام، درخواست خرید محصول: ${product.title} (ID: ${product.id})`}
                target="_blank"
                className="flex w-full items-center justify-center rounded bg-neon-pink py-4 text-lg font-bold text-black transition hover:bg-white hover:scale-[1.02]"
              >
                استعلام و خرید (واتس‌اپ)
              </Link>
              
              <div className="grid grid-cols-2 gap-4">
                 <button disabled className="rounded border border-gray-800 bg-black py-3 text-gray-500 cursor-not-allowed">
                    راهنمای سایز
                 </button>
                 <button disabled className="rounded border border-gray-800 bg-black py-3 text-gray-500 cursor-not-allowed">
                    شرایط ارسال
                 </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}