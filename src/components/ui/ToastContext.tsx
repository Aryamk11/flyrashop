'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface Toast {
    id: number;
    message: string;
    type?: 'success' | 'error' | 'info';
}

interface ToastContextType {
    addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastIdCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
        const id = toastIdCounter++;
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            
            {/* Toast Container */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md border ${
                                toast.type === 'error' 
                                    ? 'bg-red-500/90 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                                    : toast.type === 'info'
                                    ? 'bg-blue-500/90 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                                    : 'bg-black/90 dark:bg-white/90 text-white dark:text-black border-neon-pink/50 shadow-[0_0_20px_rgba(255,20,147,0.3)]'
                            }`}
                            dir="rtl"
                        >
                            <div className={`p-1 rounded-full ${toast.type === 'success' ? 'bg-neon-pink text-white' : 'bg-white/20'}`}>
                                {toast.type === 'error' ? <X size={16} /> : <Check size={16} />}
                            </div>
                            <span className="font-bold text-sm tracking-wide">{toast.message}</span>
                            
                            <button 
                                onClick={() => removeToast(toast.id)}
                                className="mr-2 opacity-50 hover:opacity-100 transition-opacity"
                            >
                                <X size={14} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
