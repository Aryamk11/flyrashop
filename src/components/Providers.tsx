'use client';

import { CartProvider } from '@/components/Cart/CartContext';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CartProvider>
            {children}
        </CartProvider>
    );
}
