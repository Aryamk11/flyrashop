'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';

interface ShopClientProps {
    products: any[];
}

const CATEGORIES = ['همه', 'گردنبند', 'انگشتر', 'دستبند', 'اکسسوری'];

export default function ShopClient({ products }: ShopClientProps) {
    const [selectedCategory, setSelectedCategory] = useState('همه');

    const filteredProducts = selectedCategory === 'همه' 
        ? products 
        : products.filter(p => p.category === selectedCategory);

    return (
        <section className="container mx-auto px-4 py-16">
            {/* Filter Bar */}
            <div className="mb-12">
                <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`whitespace-nowrap px-6 py-2 text-sm font-bold rounded-full border transition-all duration-300 ${
                                selectedCategory === category
                                    ? 'bg-neon-pink border-neon-pink text-black shadow-[0_0_15px_rgba(255,20,147,0.4)]'
                                    : 'bg-transparent border-gray-300 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-neon-pink hover:text-neon-pink'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-10 flex items-end justify-between border-b border-gray-300 dark:border-gray-800 pb-4 transition-colors duration-300">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3 transition-colors duration-300">
                  {selectedCategory === 'همه' ? 'همه محصولات' : `دسته: ${selectedCategory}`}
                </h3>
                <span className="text-neon-pink font-mono text-sm dir-ltr">
                   {filteredProducts.length} ITEMS
                </span>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    <p>هیچ محصولی در این دسته یافت نشد.</p>
                </div>
            )}
        </section>
    );
}
