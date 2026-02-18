import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Create absolute path to the HTML file
    // Script is in scripts/ probably? No wait, I'm putting it in root based on previous file locations?
    // I'll put it in root for simplicity or scripts.
    // Let's assume this script runs from root.
    const htmlPath = path.join(process.cwd(), 'readme_for_pdf.html');

    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

    await page.pdf({
        path: 'Manuale_Utente.pdf',
        format: 'A4',
        printBackground: true,
        margin: {
            top: '0mm',
            bottom: '0mm',
            left: '0mm',
            right: '0mm'
        }
    });

    await browser.close();
    console.log('PDF Generated: Manuale_Utente.pdf');
})();
