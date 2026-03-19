const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  // Check if dist files exist
  const darkDistPath = path.join(__dirname, 'index-dist.html');
  const lightDistPath = path.join(__dirname, 'index-light-dist.html');

  if (!fs.existsSync(darkDistPath) || !fs.existsSync(lightDistPath)) {
    console.error('Error: Dist files not found. Please run "npm run build:env" first.');
    console.log('  This will create the production HTML files with environment variables.');
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();

  // Set high DPI screen for sharp rendering - match exact card width
  await page.setViewport({ width: 660, height: 1200, deviceScaleFactor: 3 });

  // Load the dark theme dist file
  await page.goto('file://' + darkDistPath, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // Get the exact dimensions of the card
  const dimensions = await page.evaluate(() => {
    const card = document.querySelector('.card');
    if (!card) return { width: 660, height: 1198 };
    const rect = card.getBoundingClientRect();
    return {
      width: Math.ceil(rect.width),
      height: Math.ceil(rect.height)
    };
  });

  console.log(`Card dimensions: ${dimensions.width}px × ${dimensions.height}px`);

  await page.pdf({
    path: 'marufa-biodata-dark.pdf',
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    preferCSSPageSize: false
  });

  console.log('✓ Dark theme PDF exported: marufa-biodata-dark.pdf');

  // Light version
  await page.goto('file://' + lightDistPath, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  const lightDimensions = await page.evaluate(() => {
    const card = document.querySelector('.card');
    if (!card) return { width: 660, height: 1168 };
    const rect = card.getBoundingClientRect();
    return {
      width: Math.ceil(rect.width),
      height: Math.ceil(rect.height)
    };
  });

  console.log(`Light card dimensions: ${lightDimensions.width}px × ${lightDimensions.height}px`);

  await page.pdf({
    path: 'marufa-biodata-light.pdf',
    width: `${lightDimensions.width}px`,
    height: `${lightDimensions.height}px`,
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    preferCSSPageSize: false
  });

  console.log('✓ Light theme PDF exported: marufa-biodata-light.pdf');

  await browser.close();
  console.log('✓ Both PDFs exported successfully');
})();
