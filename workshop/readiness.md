# Readiness — 10 September 2026

**NOT READY FOR TONIGHT for the requested full-stack demonstration.** The public Scripture/D.W.E.L.L. experience and explicit rehearsal fallback are usable. Real account persistence, two-user RLS evidence and GitHub → Preview → merge are not yet verified.

| Area               | Status  | Evidence / remaining gate                                                                                                                          |
| ------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Selah Still        | WARNING | Production browser: passage, full chapter, all five prompts, sign-in handoff, rehearsal save/retrieve passed. Real account saving unavailable.     |
| Supabase           | BLOCKED | Migration, ownership policies and two-user test prepared. No dedicated project provisioned; no Auth/RLS live test.                                 |
| GitHub             | BLOCKED | Local Git commits, six checkpoint tags and demo branch prepared. Connected access exposes only unrelated hyperlocal-os; no dedicated remote or PR. |
| Vercel             | WARNING | Production READY and browser checked. Separate preview READY but redirects to Vercel login. Git-triggered preview/release not verified.            |
| Live demo          | WARNING | 40-minute runbook, prompts and four activities ready. Backend/release claims must wait for evidence.                                               |
| Attendee resources | READY   | Public /workshop entry page checked; generic starter installs and production build passed.                                                         |
| Backups            | WARNING | Offline HTML and two actual rehearsal screenshots included; rehearse opening them on the presenting laptop.                                        |

## Verified evidence

- Main app formatting, ESLint, TypeScript, three validation tests and production build passed.
- Production browser verified the complete fictional rehearsal journey; no app console errors observed. This is not evidence of Supabase persistence.
- Desktop layout had no horizontal overflow at the inspected viewport. Mobile and automated axe/E2E checks are authored but not executed: these remain gates.
- Production dependency audit reported zero vulnerabilities at preparation time. This is a limited package audit, not a security certification.
- Generic starter npm ci, formatting, lint, types and production build passed. Its single test is an explicit TODO for participants, not a product verification.
- Preflight script reports missing backend/GitHub/deployment configuration as warnings, rather than inventing passing checks.

## Live links

- Production: https://selah-still-workshop.vercel.app
- Attendee entry: https://selah-still-workshop.vercel.app/workshop
- A/B exercise: https://selah-still-workshop.vercel.app/compare
- Preview (Vercel login required): https://selah-still-workshop-irn6lrzin-hyperlocal-tech-co.vercel.app

## Critical actions before leaving

1. Confirm whether the dedicated Supabase project should belong to **hyperlocal tech co**. The provisioning tool explicitly requires organization selection and cost confirmation; it has not been created under the existing organization by assumption.
2. Create an empty **selah-still-workshop** GitHub repository in the intended account and grant this connection access. The available GitHub connection cannot create repositories. Do not use the unrelated hyperlocal-os repository.
3. After provisioning: apply the committed migration, set the URL/publishable key locally and on Vercel, create two confirmed synthetic demo accounts, run npm run test:rls, rebuild/deploy, and verify real save/retrieve on mobile. No service-role key belongs in browser code.
4. Connect the dedicated GitHub repo to Vercel; verify the actual feature branch → PR → Preview → checked merge → production path. Log in to Vercel on the presenting browser before opening protected previews.
5. On the presenting laptop: npm ci and npm run preflight; prepare both local copies below, download deck/backups, open offline.html, arrange tabs and enable Do Not Disturb. Do this while internet is available.

If these cannot be completed in time, explicitly present the UI/rehearsal version and explain backend policies from source. Do not describe the full-stack demo as verified.

## Live starting point

The included source Git repository has clean main, tags 00-starter through 05-finished, and demo/live at the finished checkpoint. Dependency folders and builds are excluded from this portable package.

From selah-still:

```sh
npm ci
npm run build
npm run start -- --port 3001
```

In a second terminal, from selah-still (demo/live already exists):

```sh
git worktree add ../selah-still-live demo/live
cd ../selah-still-live
npm ci
npm run dev
```

Use http://localhost:3000 for edits and http://localhost:3001 for recovery. Copy .env.local privately to both copies only when configured.

First prompt:

> Read docs/ and inspect the repository without changing files. Summarize the current user journey, the private-data boundary, and the available checks. Propose a narrow plan to add an accessible character-count hint to the reflection field. Do not implement yet. Identify assumptions and wait for my review.

## Emergency recovery

1. Stop interacting with the failing live edit; preserve its files.
2. Open the already-running http://localhost:3001 known-good copy.
3. If local execution fails, open the verified production link above.
4. If internet also fails, open backups/offline.html or the supplied screenshots. The HTML saves fictional writing in the current tab only. Never call this a private cloud journal.
5. Resume at the next runbook checkpoint. Do not troubleshoot for more than 60 seconds on stage.

No destructive reset or clean command is needed. Read selah-still/workshop/recovery.md before the session.
