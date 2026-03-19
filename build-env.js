const fs = require('fs');
const path = require('path');

// Read .env file
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    console.error('.env file not found!');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envVars = {};

  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim().replace(/^"|"$/g, '');
    }
  });

  return envVars;
}

// Replace placeholders in HTML
function buildHtml(templatePath, outputPath, envVars) {
  let html = fs.readFileSync(templatePath, 'utf-8');

  // Replace placeholders
  html = html.replace(/__PHONE__/g, envVars.PHONE || '');
  html = html.replace(/__ADDRESS__/g, envVars.ADDRESS || '');

  fs.writeFileSync(outputPath, html);
  console.log(`✓ Built ${path.basename(outputPath)}`);
}

// Main build process
function build() {
  console.log('Loading environment variables...');
  const envVars = loadEnv();
  console.log(`  PHONE: ${envVars.PHONE}`);
  console.log(`  ADDRESS: ${envVars.ADDRESS}`);

  console.log('\nBuilding HTML files...');

  // Build dark theme
  buildHtml(
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'index-dist.html'),
    envVars
  );

  // Build light theme
  buildHtml(
    path.join(__dirname, 'index-light.html'),
    path.join(__dirname, 'index-light-dist.html'),
    envVars
  );

  console.log('\n✓ Build complete!');
  console.log('  → index-dist.html (dark theme)');
  console.log('  → index-light-dist.html (light theme)');
}

build();
