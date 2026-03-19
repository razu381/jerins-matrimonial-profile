# GitHub Secrets Setup Guide

## How to Add Your Secrets to GitHub

### Step 1: Go to Your Repository Settings
1. Open your repository on GitHub: https://github.com/razu381/jerins-matrimonial-profile
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions** in the left sidebar
4. Click **New repository secret**

### Step 2: Add Your Secrets

Create these two secrets:

#### Secret 1: PHONE
- **Name**: `PHONE`
- **Value**: `01813385381` (or your actual phone number)
- Click **Add secret**

#### Secret 2: ADDRESS
- **Name**: `ADDRESS`
- **Value**: `Bashar Manjil, East Fatehpur, Kabirhat Pouroshova, Noakhali` (or your actual address)
- Click **Add secret**

### Step 3: Enable GitHub Pages

1. In repository **Settings**
2. Click **Pages** in the left sidebar
3. Under **Source**, select **GitHub Actions**

### Step 4: Deploy!

Every time you push to the `main` branch, GitHub Actions will:
1. Read your secrets
2. Build the HTML files with your real data
3. Automatically deploy to GitHub Pages

Your site will be at: https://razu381.github.io/jerins-matrimonial-profile/

## Local Development

For local testing, use the `.env` file:

```bash
npm run build:env
# Then open index-dist.html or index-light-dist.html in your browser
```

## Security

✅ Your secrets are **never** visible in the repository
✅ They're only used during the GitHub Actions build process
✅ The built files deployed to GitHub Pages contain the actual values
