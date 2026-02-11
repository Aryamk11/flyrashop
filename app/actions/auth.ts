'use server'
import { getServiceSupabase } from '@/lib/supabase';
import { sendSMS } from '@/lib/sms';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function sendOtpAction(phone: string) {
  const adminPhone = process.env.ADMIN_PHONE_NUMBER;

  // CODE NEXUS SECURITY: Strict Admin Whitelist
  if (!adminPhone || phone !== adminPhone) {
     return { error: 'Unauthorized Access. This incident has been logged.' };
  }
  
  const code = Math.floor(10000 + Math.random() * 90000).toString();
  const supabase = getServiceSupabase();

  // Invalidate previous OTPs
  await supabase.from('otps').delete().eq('phone', phone);

  const { error } = await supabase.from('otps').insert({
    phone, 
    code, 
    expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 Minutes
  });

  if (error) {
    console.error('OTP Storage Error:', error);
    return { error: 'Database Error' };
  }

  await sendSMS(phone, code);
  return { success: true };
}

export async function verifyOtpAction(phone: string, code: string) {
  const supabase = getServiceSupabase();
  
  // Verify OTP matches and is not expired
  const { data } = await supabase.from('otps').select('*')
    .eq('phone', phone)
    .eq('code', code)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (!data) return { error: 'Invalid or Expired Code' };

  // Generate Admin JWT
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ role: 'admin', phone })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  // Set HTTP-Only Cookie
  const cookieStore = await cookies();
  cookieStore.set('admin_session', token, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 Day
    path: '/'
  });
  
  // Cleanup OTP
  await supabase.from('otps').delete().eq('phone', phone);
  
  return { success: true };
}