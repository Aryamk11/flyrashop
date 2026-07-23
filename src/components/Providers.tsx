'use client';

import { CartProvider } from '@/components/Cart/CartContext';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
            <CartProvider>
                {children}
            </CartProvider>
        </ThemeProvider>
    );
}
