'use client';

import { KeyRound } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface OTPInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export default function OTPInput({ value, onChange, disabled }: OTPInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!disabled && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disabled]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '');
        if (val.length <= 6) {
            onChange(val);
        }
    };

    return (
        <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-neon-pink transition-colors">
                <KeyRound className="h-5 w-5" />
            </div>
            <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={value}
                onChange={handleChange}
                placeholder="Code: - - - - - -"
                disabled={disabled}
                className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-gray-800 rounded-lg py-3 pl-4 pr-10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink transition-all disabled:opacity-50 disabled:cursor-not-allowed dir-ltr text-center tracking-[1em] font-mono text-lg"
            />
        </div>
    );
}
