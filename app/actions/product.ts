'use server'
import { getServiceSupabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addProduct(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price') as string;
  const image = formData.get('image') as File;

  if (!title || !price || !image) return { error: 'تمام فیلدها الزامی هستند.' };

  const supabase = getServiceSupabase();
  
  const fileExt = image.name.split('.').pop();
  const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage.from('products').upload(filename, image);
  if (uploadError) return { error: 'آپلود تصویر با خطا مواجه شد.' };

  const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(filename);

  const { error: dbError } = await supabase.from('products').insert({
    title, 
    description,
    price: parseFloat(price), 
    image_url: publicUrl
  });

  if (dbError) return { error: 'خطا در ذخیره اطلاعات در دیتابیس.' };

  revalidatePath('/');
  redirect('/');
}