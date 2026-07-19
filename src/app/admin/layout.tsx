import Link from 'next/link';
import { LayoutDashboard, Package, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-black text-white">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 right-0 w-64 border-l border-gray-800 bg-gray-900/50 backdrop-blur-xl p-4 hidden md:flex flex-col">
                <div className="mb-8 flex items-center gap-2 px-2">
                    <div className="h-8 w-8 bg-neon-pink rounded-sm" />
                    <h1 className="text-xl font-bold tracking-tight">FLYRA<span className="text-neon-pink">ADMIN</span></h1>
                </div>

                <nav className="space-y-2 flex-1">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                        <LayoutDashboard className="h-5 w-5" />
                        <span>داشبورد</span>
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                        <Package className="h-5 w-5" />
                        <span>محصولات</span>
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                        <Settings className="h-5 w-5" />
                        <span>تنظیمات</span>
                    </Link>
                </nav>

                <div className="border-t border-gray-800 pt-4">
                    <form action="/api/auth/signout" method="post">
                        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-red-500/10 transition-colors">
                            <LogOut className="h-5 w-5" />
                            <span>خروج</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:mr-64 p-8">
                {children}
            </main>
        </div>
    );
}
