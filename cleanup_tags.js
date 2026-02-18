import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initial basic parsing of .env
const envPath = path.join(__dirname, '.env');
let envConfig = {};

console.log(`Reading .env from ${envPath}`);

try {
    if (fs.existsSync(envPath)) {
        const envFile = fs.readFileSync(envPath, 'utf8');
        const lines = envFile.split(/\r?\n/); // Handle both \n and \r\n
        lines.forEach(line => {
            line = line.trim();
            if (!line || line.startsWith('#')) return;

            const idx = line.indexOf('=');
            if (idx !== -1) {
                const key = line.substring(0, idx).trim();
                let value = line.substring(idx + 1).trim();

                // Remove surrounding quotes if present
                if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.substring(1, value.length - 1);
                }

                envConfig[key] = value;
            }
        });
        console.log('Loaded env keys:', Object.keys(envConfig));
    } else {
        console.log('.env file not found');
    }
} catch (e) {
    console.error("Could not read .env file", e);
}

const supabaseUrl = envConfig.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = envConfig.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env');
    console.log('Current envConfig:', envConfig);
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanupTags() {
    console.log('Starting tag cleanup...');

    // 1. Fetch all territories
    const { data: territories, error } = await supabase
        .from('territori')
        .select('id, number, tags');

    if (error) {
        console.error('Error fetching territories:', error);
        return;
    }

    let count = 0;
    for (const t of territories) {
        if (t.tags && t.tags.length > 1) {
            let newTags = [];

            // Extended Priority Logic:
            // 1. Con cascine (Most specific)
            // 2. Senza condomini
            // 3. Residenziale (Least specific)

            if (t.tags.includes('Con cascine')) {
                newTags = ['Con cascine'];
            } else if (t.tags.includes('Senza condomini')) {
                newTags = ['Senza condomini'];
            } else if (t.tags.includes('Residenziale')) {
                newTags = ['Residenziale'];
            } else {
                // If none of the standard ones, just keep the first one
                newTags = [t.tags[0]];
            }

            console.log(`Territory ${t.number}: Converting ${JSON.stringify(t.tags)} -> ${JSON.stringify(newTags)}`);

            const { error: updateError } = await supabase
                .from('territori')
                .update({ tags: newTags })
                .eq('id', t.id);

            if (updateError) {
                console.error(`Error updating territory ${t.number}:`, updateError);
            } else {
                count++;
            }
        }
    }

    if (count === 0) {
        console.log('No territories found with multiple tags.');
    } else {
        console.log(`Successfully updated ${count} territories.`);
    }
}

cleanupTags();
