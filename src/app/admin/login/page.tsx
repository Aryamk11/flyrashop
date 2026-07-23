'use client';

import { useActionState } from 'react';
import { loginWithPassword } from '@/app/actions/auth';
import { Lock } from 'lucide-react';

const initialState = {
  error: '',
};

export default function AdminLogin() {
  const [state, action, isPending] = useActionState(loginWithPassword, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black p-4 transition-colors duration-300">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-gray-300 dark:border-neon-pink/20 bg-white dark:bg-neon-gray p-8 shadow-2xl dark:shadow-neon-pink/10 transition-colors duration-300">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neon-pink/10 text-neon-pink animate-pulse-fast">
            <Lock className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white font-[family-name:var(--font-eb-garamond)] transition-colors">
            ورود به سیستم
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-mono">
            ناحیه مدیریتی. فقط پرسنل مجاز.
          </p>
        </div>

        {/* Password Form */}
        <form action={action} className="mt-8 space-y-6">
          
          {/* Error Message */}
          {state?.error && (
            <div className="rounded border border-red-500/50 bg-red-950/30 p-3 text-center text-sm text-red-200 font-mono">
              [خطا]: {state.error}
            </div>
          )}

          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded bg-gray-100 dark:bg-black border border-gray-300 dark:border-gray-800 p-4 text-center text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:border-neon-pink focus:ring-1 focus:ring-neon-pink outline-none tracking-widest font-mono text-lg transition-all"
              placeholder="رمز عبور امنیتی"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded bg-neon-pink py-4 font-black text-black tracking-normal hover:bg-white hover:scale-[1.02] disabled:opacity-50 disabled:cursor-wait transition-all shadow-[0_0_15px_rgba(255,0,127,0.4)]"
          >
            {isPending ? 'در حال بررسی...' : 'باز کردن پنل'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400 dark:text-gray-700 font-mono dir-ltr transition-colors">
          SECURE CONNECTION :: ENCRYPTED
        </div>
      </div>
    </div>
  );
}