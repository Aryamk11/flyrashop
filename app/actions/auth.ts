'use server'
import { getServiceSupabase } from '@/lib/supabase';
import { sendSMS } from '@/lib/sms';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function sendOtpAction(phone: string) {
  if (phone !== process.env.ADMIN_PHONE_NUMBER) return { error: 'Unauthorized' };
  
  const code = Math.floor(10000 + Math.random() * 90000).toString();
  const supabase = getServiceSupabase();

  await supabase.from('otps').insert({
    phone, code, expires_at: new Date(Date.now() + 300000).toISOString()
  });

  await sendSMS(phone, code);
  return { success: true };
}

export async function verifyOtpAction(phone: string, code: string) {
  const supabase = getServiceSupabase();
  const { data } = await supabase.from('otps').select('*')
    .eq('phone', phone).eq('code', code)
    .gt('expires_at', new Date().toISOString()).single();

  if (!data) return { error: 'Invalid Code' };

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h').sign(secret);

  const cookieStore = await cookies();
  cookieStore.set('admin_session', token, { httpOnly: true, secure: true });
  
  await supabase.from('otps').delete().eq('phone', phone);
  return { success: true };
}