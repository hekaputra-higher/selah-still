# WORKSHOP READINESS — verification follow-up

| Area               | Status  | Evidence                                                                                                                        |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| SELAH STILL        | WARNING | Production UI/rehearsal verified; real account persistence blocked. Local development module-format bug fixed.                  |
| SUPABASE           | BLOCKED | Only unrelated hyperlocal os dev project is accessible. Organization/cost decision pending.                                     |
| RLS PRIVACY TEST   | BLOCKED | Test expanded to include owner update and re-login retrieval; cannot run without dedicated backend/two accounts.                |
| GITHUB             | BLOCKED | Dedicated repository search returned no results. Local checkpoints preserved; no remote/PR.                                     |
| VERCEL PREVIEW     | WARNING | Existing preview shows Vercel sign-in; app behind it not tested this session. Git-triggered flow blocked.                       |
| VERCEL PRODUCTION  | WARNING | Public UI and attendee page tested. No real backend configured.                                                                 |
| QUALITY CHECKS     | READY   | Formatting, lint, types, three tests and production build passed after module correction. Mobile/axe remain unexecuted.         |
| LIVE DEMO          | BLOCKED | Full timed rehearsal cannot complete while backend/release gates are blocked.                                                   |
| ATTENDEE RESOURCES | READY   | Ten-step public start page and working link checked at desktop size; phone check remains.                                       |
| LOCAL BACKUP       | WARNING | Terminal verified HTTP 200 while live was broken; laptop/browser visual checks remain.                                          |
| OFFLINE BACKUP     | WARNING | Self-contained resources and JavaScript syntax checked. Cloud browser blocks local files; actual opening remains a laptop task. |

## What changed

- Fixed package type from CommonJS to ES modules in Selah Still and generic starter. This resolved observed HTTP 500 development compilation errors; production-only checks had missed them.
- Added missing owner-update and retrieval-after-re-login assertions to the real Supabase test. No policy changes or new product features.
- Preserved all old tags; new 06-local-recovery is the latest usable code checkpoint. main and demo/live include the fix. 05-finished remains historical and should not be used to start the live dev server.
- Added TONIGHT-CUE-SHEET.md with the requested 0–40 minute rhythm, keeping four activities, plus one-screen EMERGENCY.md and LAPTOP.md.

## Rehearsal result

Full 35–40-minute rehearsal: NOT RUN / BLOCKED. No invented total or presentation timings.
Terminal recovery drill: 4.1 seconds successful run. Deliberate page syntax error → live HTTP 500 → backup HTTP 200 → exact original restored → live HTTP 200.
Prior attempts exposed duplicate-server startup and the module-format bug. Fix applied; prestart the two separate copies.

## Minimum unblock actions

1. Hadi selects the dedicated Supabase project's organization. The only visible choice is hyperlocal tech co (vtuwziqrfnohsidmvlrc). The Supabase get_cost tool explicitly says to ask the user for the organization first, then repeat the quoted cost for confirmation. No creation cost has yet been quoted or approved.
2. Create an empty selah-still-workshop GitHub repository and grant the existing connection access. Available connector tools cannot create a repository. After access is available, the prepared history can be pushed and a PR created.
3. Complete dedicated backend provisioning, migration, public configuration, two synthetic confirmed accounts and live RLS tests; then Git-linked Preview/merge/Production verification.
4. Hadi runs the laptop checks and uninterrupted full rehearsal, including mobile and offline opening, after the technical blockers are resolved.

## Evidence and limits

The production browser checks covered chapter expansion, step focus/labels, empty-save alert, sign-in handoff, fictional rehearsal save/retrieve, attendee navigation and no desktop overflow. No app-origin console errors were observed; browser-extension metadata errors were separate. The cloud browser explicitly blocks localhost and file URLs; no workaround was attempted. Terminal HTTP checks do not prove browser interactivity.

Current Supabase changelog and [RLS documentation](https://supabase.com/docs/guides/database/postgres/row-level-security) were reviewed. No relevant migration-breaking change was identified for this simple schema. Creating policies alone is not passing a live access test.

**NOT READY FOR TONIGHT** under the requested full-stack acceptance criteria. The UI/rehearsal fallback remains available, but cannot substitute for the missing privacy and release evidence.
