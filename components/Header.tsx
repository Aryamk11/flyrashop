import Link from 'next/link';
import { Search, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neon-pink/20 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* RIGHT SECTION: Nav Links + Search */}
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#" className="hover:text-neon-pink transition-colors">مجموعه‌ها</Link>
            <Link href="#" className="hover:text-neon-pink transition-colors">جدیدترین‌ها</Link>
            <Link href="#" className="hover:text-neon-pink transition-colors">اکسسوری</Link>
          </nav>

          <div className="flex items-center border-gray-800 md:border-r md:pr-6">
            <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              <Search className="h-5 w-5" />
              <span className="hidden lg:inline text-xs text-gray-600">جستجو...</span>
            </button>
          </div>
        </div>

        {/* LEFT SECTION: Brand + Admin */}
        <div className="flex items-center gap-6">
          <Link href="/admin/login" className="hidden sm:block text-xs font-mono text-gray-600 hover:text-neon-pink border border-transparent hover:border-neon-pink/50 px-2 py-1 rounded">
            پنل مدیریت
          </Link>

          {/* CODE NEXUS: Applied EB Garamond Here */}
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-white dir-ltr font-[family-name:var(--font-eb-garamond)]">
              FLYRA<span className="text-neon-pink ">SHOP</span>
            </h1>
            <div className="h-8 w-8 bg-neon-pink rounded-sm animate-pulse-fast" />
          </Link>

          <button className="md:hidden text-white">
            <Menu className="h-6 w-6" />
          </button>
        </div>

      </div>
    </header>
  );
}