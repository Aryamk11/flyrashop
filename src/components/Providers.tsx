'use client';

import { CartProvider } from '@/components/Cart/CartContext';
import { ThemeProvider } from 'next-themes';
import { ToastProvider } from '@/components/ui/ToastContext';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
            <ToastProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </ToastProvider>
        </ThemeProvider>
    );
}
