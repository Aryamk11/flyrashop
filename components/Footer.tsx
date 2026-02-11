import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neon-pink/20 bg-black py-12 text-sm">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-4">
        
        {/* Brand */}
        <div className="space-y-4">
          {/* CODE NEXUS: Applied EB Garamond Here */}
          <h2 className="text-2xl font-bold text-white dir-ltr font-[family-name:var(--font-eb-garamond)] tracking-tight">
            FLYRA<span className="text-neon-pink italic">SHOP</span>
          </h2>
          <p className="text-gray-500 leading-relaxed">
            نسل جدید تجارت الکترونیک.<br />
            محصولات خاص و دست‌ساز برای سلیقه‌های خاص.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-4">
          <h3 className="font-bold text-white">فروشگاه</h3>
          <ul className="space-y-2 text-gray-500">
            <li><Link href="#" className="hover:text-neon-pink">همه محصولات</Link></li>
            <li><Link href="#" className="hover:text-neon-pink">پیشنهاد ویژه</Link></li>
            <li><Link href="#" className="hover:text-neon-pink">کالکشن‌ها</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-4">
          <h3 className="font-bold text-white">پشتیبانی</h3>
          <ul className="space-y-2 text-gray-500">
            <li><Link href="#" className="hover:text-neon-pink">پیگیری سفارش</Link></li>
            <li><Link href="#" className="hover:text-neon-pink">شرایط ارسال</Link></li>
            <li><Link href="#" className="hover:text-neon-pink">عودت کالا</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="font-bold text-white">خبرنامه</h3>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="ایمیل خود را وارد کنید" 
              className="w-full rounded bg-neon-gray border border-gray-800 px-3 py-2 text-white focus:border-neon-pink outline-none text-right placeholder:text-right"
            />
            <button className="bg-neon-pink px-4 py-2 font-bold text-black hover:bg-white transition-colors">
              ثبت
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center text-xs text-gray-700 font-mono">
        &copy; {new Date().getFullYear()} FLYRASHOP SYSTEMS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}