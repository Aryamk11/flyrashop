'use server'
import { getServiceSupabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// CHANGED: Added 'prevState: any' as the first argument
export async function addProduct(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const price = formData.get('price') as string;
  const image = formData.get('image') as File;

  if (!title || !price || !image) return { error: 'Missing Fields' };

  const supabase = getServiceSupabase();
  
  // Sanitize filename
  const fileExt = image.name.split('.').pop();
  const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage.from('products').upload(filename, image);
  if (uploadError) return { error: 'Upload Failed' };

  const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(filename);

  const { error: dbError } = await supabase.from('products').insert({
    title, price: parseFloat(price), image_url: publicUrl
  });

  if (dbError) return { error: 'Database Error' };

  revalidatePath('/');
  redirect('/');
}