---
name: vercel-deploy
description: Deploy and manage projects on Vercel using token-based authentication. Use for deployment actions and environment variable management.
metadata:
  author: vercel
  version: "4.0.0"
---

# Deploy to Vercel

Deploy any project (e.g., Next.js 15 apps like FreeViralKit) to Vercel. **Always deploy as preview** unless explicitly asked for production.

**CRITICAL: AdSense Deployment Freeze**
DO NOT push or deploy until the user explicitly requests it, due to AdSense review processes.

## 1. Authentication (Token-based)

Vercel CLI must use a token via the `VERCEL_TOKEN` environment variable. ❌ **Never pass `--token` on the command line.**

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

## 3. Environment Variable Validation

Validate environment variables to prevent runtime crashes.

**Code Example:**
```ts
// lib/env.ts — validate at build time
const requiredEnvVars = [
  'DATABASE_URL', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN',
  'QSTASH_TOKEN', 'QSTASH_CURRENT_SIGNING_KEY', 'QSTASH_NEXT_SIGNING_KEY',
  'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'NEXTAUTH_SECRET',
] as const;

for (const key of requiredEnvVars) {
  if (!process.env[key]) throw new Error(`Missing required env var: ${key}`);
}
```

- ✅ **Sync checklist:** When adding a new env var locally, IMMEDIATELY add it to the Vercel dashboard.
- ✅ **Environments:** Ensure vars are set for Preview AND Production (they are separate in Vercel).

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

## 4. Deployment Workflows

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

### Preview Branch Naming
- ✅ **Feature branches:** `feat/<feature-name>` → auto-creates preview deployment.
- ✅ **Fix branches:** `fix/<issue-description>`.
- Each PR gets its own preview URL: `<project>-<branch>-<user>.vercel.app`.
- Preview deployments auto-expire after 30 days (Hobby plan).

## 5. Deployment Safety Checklist

Before any production deploy, verify the following actionable checklist:
- [ ] `npm run build` passes locally.
- [ ] `npx tsc --noEmit` — zero type errors.
- [ ] All env vars synced to Vercel dashboard.
- [ ] No `.py` files or scripts in the commit (AGENTS.md rule).
- [ ] AdSense compliance verified (no policy-violating content).
- [ ] Database migrations applied (if any).
- [ ] Previous deployment URL noted for rollback.

## 6. Post-Deployment Verification & Debugging

Always show the deployment URL. Do not fetch/curl the URL.

```powershell
# List recent deployments to find the URL
vercel ls --format json

# Inspect a specific deployment build status
vercel inspect <deployment-url>

# View runtime logs
vercel logs <deployment-url>
```

### Build Failure Debugging

```powershell
# View build logs for failed deployment
vercel logs <deployment-url> --output raw
```
**Common failures:**
1. **Missing env vars** → `vercel env ls` to check.
2. **TypeScript errors** → run `npx tsc --noEmit` locally first.
3. **ESLint errors** → run `npx next lint` locally first.
4. **OOM during build** → add `NEXT_PRIVATE_STANDALONE=true` or increase memory.

- ✅ **Pre-flight build check:** Always run `npm run build` locally before pushing.
- ✅ **Diff check:** Review `git diff --stat` before committing to avoid pushing unintended files.

## 7. Rollback Procedures

If a deployment fails or introduces a critical bug, roll back immediately:

```powershell
# List recent deployments
vercel ls --limit 10

# Promote a previous deployment to production (instant rollback)
vercel promote <deployment-url> --yes

# Or via git revert
git revert HEAD
git push
```
- ✅ Always verify rollback with `vercel inspect <url>` after promoting.
- ✅ Keep the last 3 known-good deployment URLs in a comment in the deploy script.

## Working Agreement

1. **AdSense Freeze:** DO NOT deploy until the user explicitly requests it.
2. **Tokens:** Never use `--token` flag. Use `$env:VERCEL_TOKEN`.
3. **Previews:** Default to preview deployments.
4. **Git:** Never push without user approval.
5. **Syncing:** Remind the user to sync `.env.local` to Vercel if local env vars change.

## Cross-References
- See [robust-errors](file:///d:/Youtube%20tag%20and%20hashtag%20and%20description%20and%20title%20updater/.agents/skills/robust-errors/SKILL.md) for error boundaries that work in production.
- See [security-guard](file:///d:/Youtube%20tag%20and%20hashtag%20and%20description%20and%20title%20updater/.agents/skills/security-guard/SKILL.md) for environment variable protection.
