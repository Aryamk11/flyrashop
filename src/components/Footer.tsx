import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neon-pink/50 bg-white dark:bg-black py-12 text-sm shadow-[0_-10px_20px_rgba(255,0,127,0.05)] transition-colors duration-300">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-4">
        
        {/* Brand */}
        <div className="space-y-4">
          {/* CODE NEXUS: Applied EB Garamond Here */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white dir-ltr font-[family-name:var(--font-eb-garamond)] tracking-tight transition-colors duration-300">
            FLYRA<span className="text-neon-pink italic">SHOP</span>
          </h2>
          <p className="text-gray-500 leading-relaxed">
            نسل جدید تجارت الکترونیک.<br />
            محصولات خاص و دست‌ساز برای سلیقه‌های خاص.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white transition-colors duration-300">فروشگاه</h3>
          <ul className="space-y-2 text-gray-500">
            <li><Link href="#" className="hover:text-neon-pink">همه محصولات</Link></li>
            <li><Link href="#" className="hover:text-neon-pink">پیشنهاد ویژه</Link></li>
            <li><Link href="#" className="hover:text-neon-pink">کالکشن‌ها</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white transition-colors duration-300">پشتیبانی</h3>
          <ul className="space-y-2 text-gray-500">
            <li><Link href="#" className="hover:text-neon-pink">پیگیری سفارش</Link></li>
            <li><Link href="#" className="hover:text-neon-pink">شرایط ارسال</Link></li>
            <li><Link href="#" className="hover:text-neon-pink">عودت کالا</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white transition-colors duration-300">خبرنامه</h3>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="ایمیل خود را وارد کنید" 
              className="w-full cyber-cut bg-gray-100 dark:bg-neon-gray border border-gray-300 dark:border-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:border-neon-pink focus:glow-pink outline-none text-right placeholder:text-gray-500 dark:placeholder:text-gray-600 transition-all"
            />
            <button className="cyber-cut bg-neon-pink border border-neon-pink px-4 py-2 font-bold text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-neon-pink hover:glow-pink transition-all">
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