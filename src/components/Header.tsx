'use client';

import Link from 'next/link';
import { Search, Menu, ShoppingBag, Sun, Moon } from 'lucide-react';
import { useCart } from '@/components/Cart/CartContext';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Header() {
  const { toggleCart, items } = useCart();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-white/10 bg-white/60 dark:bg-black/60 backdrop-blur-xl transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* RIGHT SECTION: Nav Links + Search */}
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Link href="#" className="hover:text-neon-pink hover:glow-pink-text transition-all">مجموعه‌ها</Link>
            <Link href="#" className="hover:text-neon-pink hover:glow-pink-text transition-all">جدیدترین‌ها</Link>
            <Link href="#" className="hover:text-neon-pink hover:glow-pink-text transition-all">اکسسوری</Link>
          </nav>

          <div className="flex items-center border-gray-200 dark:border-gray-800 md:border-r md:pr-6 gap-4">
            <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2">
              <Search className="h-5 w-5" />
              <span className="hidden lg:inline text-xs text-gray-500 dark:text-gray-600">جستجو...</span>
            </button>

            <button onClick={toggleCart} className="text-gray-400 hover:text-neon-pink hover:glow-pink-text transition-all relative">
              <ShoppingBag className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 h-4 w-4 bg-neon-pink text-[10px] text-white flex items-center justify-center rounded-full font-bold animate-bounce shadow-[0_0_10px_var(--color-neon-pink)]">
                  {items.length}
                </span>
              )}
            </button>
            
            {mounted && (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-gray-400 hover:text-neon-pink hover:glow-pink-text transition-all ml-2"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>

        {/* LEFT SECTION: Brand + Admin */}
        <div className="flex items-center gap-6">
          <Link href="/admin/login" className="hidden sm:block text-xs font-mono text-gray-500 dark:text-gray-600 hover:text-neon-pink border border-transparent hover:border-neon-pink/50 px-2 py-1 rounded transition-colors">
            پنل مدیریت
          </Link>

          {/* CODE NEXUS: Applied EB Garamond Here */}
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white dir-ltr font-[family-name:var(--font-eb-garamond)] transition-colors">
              FLYRA<span className="text-neon-pink ">SHOP</span>
            </h1>
            <div className="h-8 w-8 bg-neon-pink rounded-sm animate-pulse-fast" />
          </Link>

          <button className="md:hidden text-gray-900 dark:text-white">
            <Menu className="h-6 w-6" />
          </button>
        </div>

      </div>
    </header>
  );
}