'use client';

import { useCart } from '@/components/Cart/CartContext';
import { useToast } from '@/components/ui/ToastContext';
import { ShoppingBag } from 'lucide-react';

interface AddToCartButtonProps {
    product: {
        id: string;
        title: string;
        price: number;
        image_url: string;
    };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart, items, incrementItem, decrementItem } = useCart();
    const { addToast } = useToast();

    // Find current quantity of this product in cart
    const cartItem = items.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAdd = () => {
        addToCart(product);
        addToast('محصول به سبد خرید اضافه شد', 'success');
    };

    return (
        <div className="flex items-center gap-2 w-full">
            {quantity === 0 ? (
                <button
                    onClick={handleAdd}
                    className="w-full font-bold py-4 rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-3 text-lg group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,20,147,0.4)] bg-white text-black hover:bg-neon-pink hover:text-white"
                >
                    <ShoppingBag className="h-6 w-6" />
                    <span>افزودن به سبد خرید</span>
                </button>
            ) : (
                <div className="flex items-center justify-between w-full bg-black border border-neon-pink rounded-xl text-white overflow-hidden h-14">
                    <button
                        onClick={() => incrementItem(product.id)}
                        className="h-full px-6 hover:bg-neon-pink/20 transition-colors text-2xl font-bold flex items-center justify-center"
                    >
                        +
                    </button>
                    <span className="font-mono text-xl font-bold">{quantity}</span>
                    <button
                        onClick={() => decrementItem(product.id)}
                        className="h-full px-6 hover:bg-neon-pink/20 transition-colors text-2xl font-bold flex items-center justify-center"
                    >
                        -
                    </button>
                </div>
            )}
        </div>
    );
}
