'use client';

import { useCart } from '@/components/Cart/CartContext';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';

interface AddToCartButtonProps {
    product: {
        id: string;
        title: string;
        price: number;
        image_url: string;
    };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000); // Reset animation
    };

    return (
        <button
            onClick={handleAdd}
            className={`w-full font-bold py-4 rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-3 text-lg group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,20,147,0.4)] ${added
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-white text-black hover:bg-neon-pink hover:text-white'
                }`}
        >
            <ShoppingBag className={`h-6 w-6 ${added ? 'animate-bounce' : ''}`} />
            {added ? 'به سبد اضافه شد' : 'افزودن به سبد خرید'}
        </button>
    );
}
