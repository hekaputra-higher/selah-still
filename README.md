# Selah Still workshop preparation

Next.js + TypeScript + Supabase, prepared for FaithTech Vancouver on September 10, 2026.

## Run

Use Node 22 or newer. From this folder:

```
npm ci
npm run dev
```

Open http://localhost:3000. Without Supabase configuration the reading flow works; account saving is unavailable. Sign in → Enter local rehearsal enables explicitly labelled fictional tab-local saving.

For real accounts, copy .env.example to .env.local, provision the dedicated backend using supabase/README.md, fill in URL and publishable key, then restart. Never commit the environment file.

## Verify

```
npm run quality
npm run test:e2e
npm run test:rls
npm run preflight
```

Browser test setup: `npx playwright install chromium`. Live RLS needs two confirmed accounts in ignored .env.local. See the readiness report for checks actually run in this preparation session.

## Facilitate

- workshop/technical-runbook.md: timed script aligned with the existing deck and four activities.
- workshop/live-prompts.md: 18 copy/paste prompts.
- workshop/recovery.md: worktrees and emergency fallback.
- workshop/START-HERE.md and /workshop: participant entry point.
- workshop/cosmos-brief.md: moodboard preparation.
- workshop/manual-preflight.md: leaving-the-house check.
- docs/: concise project context.

## GitHub and Vercel

A local Git history and checkpoint tags are included. The connected GitHub tool exposes no repository-creation operation; no unrelated repository was modified. To finish, create an empty dedicated GitHub repository, then:

```
git remote add origin https://github.com/YOUR-OWNER/selah-still-workshop.git
git push -u origin main --tags
```

Create demo/live from 05-finished and use prompts 5–6 for a real small change. After verification, push it and open the PR using workshop/demo-pr.md. Link this repository to the existing Vercel project `selah-still-workshop`, add Supabase variables to Preview and Production, and rebuild. Non-main pushes should create previews; verify the actual commit and URL. Do not claim Git-triggered deployment is verified until that push has happened.

The initial direct Vercel deployment contains public reading and labelled rehearsal mode only. The private journal is not ready until backend setup and the live Auth/RLS test pass.
