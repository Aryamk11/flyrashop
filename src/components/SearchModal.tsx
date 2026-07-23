'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { dummyProducts } from '@/lib/dummyData';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const filteredProducts = query.trim() === '' 
        ? [] 
        : dummyProducts.filter(p => p.title.includes(query) || p.slug.includes(query));

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm transition-all"
            onClick={handleBackdropClick}
            dir="rtl"
        >
            <div className="w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden mx-4 animate-in slide-in-from-top-4 fade-in duration-200 transition-colors">
                {/* Search Input Area */}
                <div className="relative flex items-center p-4 border-b border-gray-200 dark:border-gray-800 transition-colors">
                    <Search className="h-6 w-6 text-gray-400 dark:text-gray-500 mr-2 ml-4" />
                    <input 
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="جستجوی محصول..."
                        className="flex-1 bg-transparent text-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none"
                    />
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Results Area */}
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {query.trim() === '' ? (
                        <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                            نام محصول مورد نظر خود را جستجو کنید...
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="p-2">
                            {filteredProducts.map(product => (
                                <Link 
                                    href={`/product/${product.slug}`}
                                    key={product.id}
                                    onClick={onClose}
                                    className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-black/50 rounded-xl transition-colors group"
                                >
                                    <div className="relative w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
                                        <Image src={product.image_url} alt={product.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-gray-900 dark:text-white font-bold group-hover:text-neon-pink transition-colors">
                                            {product.title}
                                        </h4>
                                        <p className="text-neon-pink font-mono text-sm mt-1">
                                            {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                            هیچ نتیجه‌ای برای «<span className="text-gray-900 dark:text-white font-bold">{query}</span>» یافت نشد.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
