# Cloudflare Pages Deployment Guide

## Prerequisites

- GitHub account with this repository
- Cloudflare account (free tier works)
- Convex account already set up

## Step 1: Get Cloudflare Credentials

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Account Details** → Copy your **Account ID**
3. Go to **API Tokens** → Create token with:
   - Permissions: `Account.Cloudflare Pages`
   - Resources: All accounts

## Step 2: Configure GitHub Secrets

1. Go to your GitHub repository
2. Settings → Secrets and Variables → Actions
3. Add these secrets:
   - `CLOUDFLARE_API_TOKEN`: Your token from Step 1
   - `CLOUDFLARE_ACCOUNT_ID`: Your account ID from Step 1
   - `VITE_CONVEX_URL`: Your Convex deployment URL (e.g., `https://xxx.convex.cloud`)
   - `CONVEX_DEPLOYMENT`: Your Convex deployment ID

## Step 3: Push to GitHub

```powershell
git add .
git commit -m "Configure Cloudflare Pages deployment"
git push origin main
```

This triggers the GitHub Actions workflow automatically.

## Step 4: Verify Deployment

1. Go to GitHub → Actions tab
2. Watch the "Deploy to Cloudflare Pages" workflow
3. Once complete, you'll get a `.pages.dev` URL
4. Test your app at that URL

## Step 5: Connect Custom Domain (Optional)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain
3. Go to **Pages** → Select `storybook` project
4. Custom domains → Add your domain
5. Follow DNS setup if needed

## Local Deployment (Manual)

To deploy manually from your computer:

```powershell
# Deploy backend to Convex
npm run deploy:convex

# Build and deploy to Cloudflare
npm run deploy:cloudflare
```

Or deploy only the frontend:

```powershell
npm run build
wrangler pages deploy dist
```

## Environment Variables

The following variables are required:

| Variable | Example | Where to Set |
|----------|---------|--------------|
| `VITE_CONVEX_URL` | `https://xxx.convex.cloud` | GitHub Secrets + `.env.production` |
| `CONVEX_DEPLOYMENT` | `your-project` | GitHub Secrets |

## Troubleshooting

**Deployment failed in GitHub Actions:**
- Check that all secrets are set correctly
- Verify `VITE_CONVEX_URL` starts with `https://`
- Check Cloudflare Pages logs in dashboard

**App shows blank page:**
- Verify `VITE_CONVEX_URL` is correct in GitHub Secrets
- Check browser console for errors
- Verify Convex deployment is active

**Custom domain not working:**
- Wait 5-10 minutes for DNS propagation
- Verify domain is added in Cloudflare Pages settings
- Check that Cloudflare is your domain's nameserver

## Files Created

- `wrangler.toml` - Cloudflare Pages configuration
- `_redirects` - SPA routing configuration
- `.env.production` - Production environment variables
- `.github/workflows/deploy.yml` - CI/CD automation
