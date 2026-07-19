'use client';

import { Phone } from 'lucide-react';

interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export default function PhoneInput({ value, onChange, disabled }: PhoneInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Allow only numbers
        const val = e.target.value.replace(/\D/g, '');
        if (val.length <= 11) {
            onChange(val);
        }
    };

    return (
        <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-neon-pink transition-colors">
                <Phone className="h-5 w-5" />
            </div>
            <input
                type="tel"
                value={value}
                onChange={handleChange}
                placeholder="شماره موبایل (مثلاً 09123456789)"
                disabled={disabled}
                className="w-full bg-black/50 border border-gray-800 rounded-lg py-3 pl-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink transition-all disabled:opacity-50 disabled:cursor-not-allowed dir-ltr text-left tracking-wider font-mono"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <span className="text-gray-600 text-xs">IR (+98)</span>
            </div>
        </div>
    );
}
