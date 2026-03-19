# Jerins Bio - Matrimonial Profile

A beautiful biodata website with dark and light themes, built with Tailwind CSS v4.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy the example environment file and add your details:
```bash
cp .env.example .env
```

3. Edit `.env` with your phone and address:
```
PHONE=01813385381
ADDRESS="Your Full Address"
```

## Development

### Build CSS
```bash
npm run build
```

### Build with Environment Variables (Production)
```bash
npm run build:env
```
This creates `index-dist.html` and `index-light-dist.html` with your actual contact info.

### Generate PDFs
```bash
npm run build:env  # First, build with your data
npm run pdf        # Then generate PDFs
```

### Watch CSS Changes
```bash
npm run dev         # Watch dark theme
npm run dev:light   # Watch light theme
```

### Run Local Server
```bash
npm start
```
Then open http://localhost:3000

## Files

- `index.html` - Dark theme (with placeholders)
- `index-light.html` - Light theme (with placeholders)
- `index-dist.html` - Dark theme (production, with real data)
- `index-light-dist.html` - Light theme (production, with real data)
- `marufa-biodata-dark.pdf` - Generated dark theme PDF
- `marufa-biodata-light.pdf` - Generated light theme PDF

## Deployment

### Option 1: GitHub Pages with GitHub Actions (Recommended - Automated)

**One-time setup:**

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add two secrets:
   - `PHONE`: Your phone number
   - `ADDRESS`: Your full address
3. Go to **Settings** → **Pages**
4. Under **Source**, select **GitHub Actions**

**That's it!** Every push to `main` branch will automatically:
- Build your site with real data from GitHub Secrets
- Deploy to GitHub Pages

See [SETUP.md](SETUP.md) for detailed instructions.

### Option 2: Manual Deployment

For manual deployment to any static hosting:

```bash
# Build with your data
npm run build:env

# Deploy the dist files
# Use index-dist.html and index-light-dist.html
```

## Important

- `.env` file is **never** committed to Git (see `.gitignore`)
- Placeholders (`__PHONE__`, `__ADDRESS__`) are used in source files
- GitHub Secrets keep your data safe during automated builds
- Local development: Use `.env` file
- Production: GitHub Actions use GitHub Secrets automatically
