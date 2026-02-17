
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');

// Simple parser for .env file
function parseEnv(content) {
    const env = {};
    content.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim();
            env[key] = value;
        }
    });
    return env;
}

let env = {};
try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    env = parseEnv(envContent);
} catch (e) {
    console.error('Could not read .env.local');
    process.exit(1);
}

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
        .limit(5);

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
