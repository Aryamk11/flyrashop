'use server'
import { getServiceSupabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addProduct(prevState: any, formData: FormData) {
  console.log('--- addProduct Action Started ---');

  const rawTitle = formData.get('title');
  const rawDescription = formData.get('description');
  const rawPrice = formData.get('price');
  const rawImage = formData.get('image');

  console.log('Incoming Data:', {
    title: rawTitle,
    price: rawPrice,
    description: rawDescription ? 'Present' : 'Missing',
    image: rawImage ? 'Present' : 'Missing'
  });

  const title = (rawTitle as string)?.trim();
  const description = (rawDescription as string)?.trim();
  const priceStr = (rawPrice as string)?.trim();
  const image = rawImage as File;

  if (!title || title.length === 0) return { error: 'عنوان محصول الزامی است.' };
  if (!priceStr || priceStr.length === 0) return { error: 'قیمت محصول الزامی است.' };
  if (!image || image.size === 0) return { error: 'تصویر محصول الزامی است.' };

  const price = parseFloat(priceStr);
  if (isNaN(price)) return { error: 'قیمت وارد شده معتبر نیست.' };

  const supabase = getServiceSupabase();

  const fileExt = image.name.split('.').pop();
  const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  // Upload Image
  const { error: uploadError } = await supabase.storage.from('products').upload(filename, image);
  if (uploadError) {
    console.error('Upload Error:', uploadError);
    return { error: 'آپلود تصویر با خطا مواجه شد.' };
  }

  const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(filename);

  // Generate Slug
  const slug = title.replace(/\s+/g, '-');

  // Insert to DB
  console.log('Inserting into DB:', { title, slug, price, image_url: publicUrl });

  const { error: dbError } = await supabase.from('products').insert({
    title,
    slug,
    description,
    price,
    image_url: publicUrl
  });

  if (dbError) {
    console.error('Database Insert Error:', dbError);
    return { error: 'خطا در ذخیره اطلاعات در دیتابیس: ' + dbError.message };
  }

  console.log('Product added successfully');
  revalidatePath('/');
  redirect('/');
}