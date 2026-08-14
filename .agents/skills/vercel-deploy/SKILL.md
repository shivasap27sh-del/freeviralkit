---
name: vercel-deploy
description: Deploy and manage projects on Vercel using token-based authentication. Use for deployment actions and environment variable management.
metadata:
  author: vercel
  version: "4.0.0"
---

# Deploy to Vercel

Deploy any project to Vercel. **Always deploy as preview** unless explicitly asked for production.

**CRITICAL: AdSense Deployment Freeze**
DO NOT push or deploy until the user explicitly requests it, due to AdSense review processes.

## 1. Authentication (Token-based)

Vercel CLI must use a token via the `VERCEL_TOKEN` environment variable. **Never pass `--token` on the command line.**

```powershell
# Check for existing token
$env:VERCEL_TOKEN

# If not set, check .env file
Select-String -Path .env -Pattern 'VERCEL_TOKEN='

# Set token (do this before running vercel commands)
$env:VERCEL_TOKEN="vca_abc123"
```

## 2. Project State & Linking

Check if the project is linked. A linked project has `.vercel/project.json` or `.vercel/repo.json`.

```powershell
# Check for link files
Test-Path .vercel\project.json
Test-Path .vercel\repo.json

# Check Vercel CLI auth
vercel whoami
```

If not linked, link it:
```powershell
# With git remote (preferred)
vercel link --repo --yes

# Without git remote
vercel link --yes
```

## 3. Deployment Workflows

**A) Git Push (Preferred if linked and has remote)**
Vercel automatically builds on push.
```powershell
# ALWAYS ASK FOR USER APPROVAL BEFORE PUSHING!
git add .
git commit -m "deploy: updates"
git push
```

**B) CLI Deploy (No git remote or manual override)**
```powershell
# Preview deployment (default)
vercel deploy --yes --no-wait

# Production deployment (ONLY if explicitly requested)
vercel deploy --prod --yes --no-wait
```

## 4. Environment Variables

When adding variables, remember to sync `.env.local` to the Vercel Dashboard if required.

```powershell
# Add environment variable
"value" | vercel env add VAR_NAME

# Set for specific environment
"value" | vercel env add VAR_NAME production

# List environment variables
vercel env ls

# Pull env vars to local .env.local file
vercel env pull

# Remove a variable
vercel env rm VAR_NAME --yes
```

## 5. Post-Deployment Verification

Always show the deployment URL. Do not fetch/curl the URL.

```powershell
# List recent deployments to find the URL
vercel ls --format json

# Inspect a specific deployment build status
vercel inspect <deployment-url>

# View runtime logs
vercel logs <deployment-url>
```

## Working Agreement

1. **AdSense Freeze:** DO NOT deploy until the user explicitly requests it.
2. **Tokens:** Never use `--token` flag. Use `$env:VERCEL_TOKEN`.
3. **Previews:** Default to preview deployments.
4. **Git:** Never push without user approval.
5. **Syncing:** Remind the user to sync `.env.local` to Vercel if local env vars change.
