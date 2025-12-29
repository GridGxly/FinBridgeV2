import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locales = ['en', 'es', 'zh', 'hi', 'fr', 'tl', 'vi', 'ar', 'ht', 'de'];
const files = ['header.json', 'translation.json', 'about.json', 'chatbot.json'];

let hasError = false;

console.log("Starting JSON Validation...");

locales.forEach(lang => {
    files.forEach(file => {
        const p = path.join(__dirname, 'public/locales', lang, file);
        if (fs.existsSync(p)) {
            try {
                const content = fs.readFileSync(p, 'utf8');
                JSON.parse(content);
                JSON.parse(content);
            } catch (e) {
                console.error(`ERROR: ${lang}/${file} is invalid JSON: ${e.message}`);
                console.error(`CONTENT START: ${fs.readFileSync(p, 'utf8').substring(0, 100)}...`);
                hasError = true;
            }
        }
    });
});

if (!hasError) console.log("All JSON files are valid.");
else console.log("FIX REQUIRED: Found JSON errors.");
