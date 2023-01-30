import puppeteer from 'puppeteer';
import { getTemplate } from '$lib/invoiceTemplate';
import { getImageURL } from '$lib/utils';
import { encode } from 'node-base64-image';

export async function createInvoicePdf(data) {
	const imageUrl = getImageURL(data.company.collectionId, data.company.id, data.company.signature);
	const image = await encode(imageUrl, { string: true });
	// Create a browser instance
	// const browser = await puppeteer.launch({
	// 	dumpio: true,
	// 	headless: true,
	// 	executablePath: '/usr/bin/chromium-browser',
	// 	args: ['--disable-setuid-sandbox', '--no-sandbox', '--disable-gpu']
	// });
	const browser = await puppeteer.launch({
		args: ['--no-sandbox']
	});
	//const browser = await puppeteer.launch();

	// Create a new page
	const page = await browser.newPage();

	//Get HTML content from HTML file
	const html = await getTemplate(data, image);
	await page.setContent(html, { waitUntil: 'domcontentloaded' });

	// To reflect CSS used for screens instead of print
	await page.emulateMediaType('screen');

	// Downlaod the PDF
	const pdf = await page.pdf({
		// path: 'test.pdf',
		// printBackground: true,
		format: 'A4'
	});

	// Close the browser instance
	await page.close();
	await browser.close();

	return pdf;
}
