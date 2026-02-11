'use server'
import { getServiceSupabase } from '@/lib/supabase';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// --- LEGACY SMS FUNCTIONS ---
export async function sendOtpAction(phone: string) {
  return { error: 'پنل پیامک غیرفعال است. از ورود با رمز عبور استفاده کنید.' };
}

export async function verifyOtpAction(phone: string, code: string) {
  return { error: 'پنل پیامک غیرفعال است.' };
}

// --- PASSWORD LOGIN ACTION ---
export async function loginWithPassword(prevState: any, formData: FormData) {
  const password = formData.get('password') as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // 1. Validate Input
  if (!password) {
    return { error: 'وارد کردن رمز عبور الزامی است.' };
  }

  // 2. Security Check
  if (password !== adminPassword) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Delay
    return { error: 'دسترسی غیرمجاز: رمز عبور اشتباه است.' };
  }

  // 3. Generate Admin JWT
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ role: 'admin', method: 'password' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  // 4. Set HTTP-Only Cookie
  const cookieStore = await cookies();
  cookieStore.set('admin_session', token, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 Day
    path: '/'
  });
  
  // 5. Redirect to Dashboard
  redirect('/admin/dashboard');
}