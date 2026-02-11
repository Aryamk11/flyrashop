import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }: { product: any }) {
  // Format price with Persian digits if preferred, or just standard Locale
  const formattedPrice = new Intl.NumberFormat('fa-IR').format(product.price);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-neon-gray bg-neon-gray transition-all hover:border-neon-pink shadow-lg hover:shadow-neon-pink/20">
      <div className="relative h-64 w-full bg-black/50">
        <Image
          src={product.image_url}
          alt={product.title}
          fill
          className="object-cover opacity-90 transition group-hover:opacity-100 group-hover:scale-105"
        />
      </div>
      <div className="p-4 text-right">
        <h3 className="text-xl font-bold text-white">{product.title}</h3>
        <p className="mt-1 text-neon-pink font-mono text-lg">{formattedPrice} تومان</p>
        <Link
          href={`https://wa.me/98912xxxxxxx?text=سلام، برای خرید محصول ${product.title} پیام می‌دهم.`}
          target="_blank"
          className="mt-4 block w-full rounded border border-neon-pink bg-transparent py-2 text-center text-neon-pink transition hover:bg-neon-pink hover:text-white font-bold"
        >
          استعلام خرید
        </Link>
      </div>
    </div>
  );
}