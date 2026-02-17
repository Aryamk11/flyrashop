
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');

const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.trim();
    }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

    if (error) {
        console.error('Error fetching products:', error);
        return;
    }

    if (products && products.length > 0) {
        console.log('Last product:', products[0]);
        console.log('Product keys:', Object.keys(products[0]));
    } else {
        console.log('No products found.');
    }
}

main();
