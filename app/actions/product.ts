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

  const title = (rawTitle as string)?.trim();
  const description = (rawDescription as string)?.trim();
  const priceStr = (rawPrice as string)?.trim();
  const image = rawImage as File;

  // Validations
  if (!title) return { error: 'عنوان محصول الزامی است.' };
  if (!priceStr) return { error: 'قیمت محصول الزامی است.' };
  if (!image || image.size === 0) return { error: 'تصویر محصول الزامی است.' };

  const price = parseFloat(priceStr);
  if (isNaN(price)) return { error: 'قیمت وارد شده معتبر نیست.' };

  const supabase = getServiceSupabase();

  // 1. Upload Image
  const fileExt = image.name.split('.').pop();
  const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage.from('products').upload(filename, image);
  if (uploadError) {
    console.error('Upload Error:', uploadError);
    return { error: 'آپلود تصویر با خطا مواجه شد.' };
  }

  const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(filename);

  // 2. Generate Unique Slug
  // Replace spaces with dashes and remove special characters that break URLs
  let slug = title.replace(/\s+/g, '-').replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, '');

  // Check for existing slug to prevent "duplicate key" error
  const { data: existingProduct } = await supabase
    .from('products')
    .select('id')
    .eq('slug', slug)
    .single();

  if (existingProduct) {
    // Append a short random string if the slug exists
    const shortId = Math.random().toString(36).substring(7);
    slug = `${slug}-${shortId}`;
  }

  // 3. Insert to DB
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

export async function updateProduct(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;
  const rawTitle = formData.get('title');
  const rawDescription = formData.get('description');
  const rawPrice = formData.get('price');
  const rawImage = formData.get('image');

  // Validations
  if (!id) return { error: 'شناسه محصول نامعتبر است.' };
  if (!rawTitle) return { error: 'عنوان محصول الزامی است.' };
  if (!rawPrice) return { error: 'قیمت محصول الزامی است.' };

  const title = (rawTitle as string)?.trim();
  const description = (rawDescription as string)?.trim();
  const priceStr = (rawPrice as string)?.trim();
  const image = rawImage as File;

  const price = parseFloat(priceStr);
  if (isNaN(price)) return { error: 'قیمت وارد شده معتبر نیست.' };

  const supabase = getServiceSupabase();
  let publicUrl = null;

  // 1. Upload New Image if provided
  if (image && image.size > 0) {
    const fileExt = image.name.split('.').pop();
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage.from('products').upload(filename, image);
    if (uploadError) {
      console.error('Upload Error:', uploadError);
      return { error: 'آپلود تصویر جدید با خطا مواجه شد.' };
    }

    const { data } = supabase.storage.from('products').getPublicUrl(filename);
    publicUrl = data.publicUrl;
  }

  // 2. Update DB
  const updateData: any = {
    title,
    description,
    price
  };

  if (publicUrl) {
    updateData.image_url = publicUrl;
  }

  const { error: dbError } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', id);

  if (dbError) {
    console.error('Database Update Error:', dbError);
    return { error: 'خطا در بروزرسانی محصول: ' + dbError.message };
  }

  revalidatePath('/');
  revalidatePath('/admin/products');
  redirect('/admin/products');
}