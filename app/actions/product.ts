'use server'
import { getServiceSupabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addProduct(formData: FormData) {
  const title = formData.get('title') as string;
  const price = formData.get('price') as string;
  const image = formData.get('image') as File;

  const supabase = getServiceSupabase();
  const filename = `${Date.now()}-${image.name}`;
  
  const { error } = await supabase.storage.from('products').upload(filename, image);
  if (error) return { error: 'Upload Failed' };

  const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(filename);

  await supabase.from('products').insert({
    title, price: parseFloat(price), image_url: publicUrl
  });

  revalidatePath('/');
  redirect('/');
}