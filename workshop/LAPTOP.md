# Presenting laptop — final checks

Tests in this package ran in the workspace, not on your physical laptop. Use the updated 06-local-recovery checkpoint; 05-finished is preserved historical source with the former dev-server configuration bug.

## Setup before leaving (terminal 1, extracted workshop-prep/selah-still)

```sh
npm ci
npm run quality
npm run start -- --port 3001
```

## Live copy (terminal 2, start in extracted workshop-prep/selah-still)

```sh
git worktree add ../selah-still-live demo/live
cd ../selah-still-live
npm ci
npm run dev
```

If the worktree already exists, enter it; do not add it again. Confirm 3000 and 3001 in the server output. Copy .env.local privately into each copy only after backend setup. Open both URLs and the offline HTML now, before leaving. Servers must stay running. This package excludes node_modules and build output; install/build while online.

First prompt: “Read docs/ and inspect Git status and the repository. Plan only an accessible remaining-character hint for the D.W.E.L.L. field. Identify files, assumptions, risks and verification. Do not modify files yet.”

## Tab order

1. Deck (offline copy)
2. Local live app — http://localhost:3000
3. Editor: docs/ and live-prompts.md
4. Cosmos references
5. Supabase: dedicated project, schema and synthetic demo accounts
6. Terminal: quality and privacy evidence
7. GitHub: dedicated repository / PR
8. Vercel Preview (signed in)
9. Production — https://selah-still-workshop.vercel.app/
10. Attendee page — https://selah-still-workshop.vercel.app/workshop
11. Local backup — http://localhost:3001
12. Offline HTML / emergency cue sheet

## Personally check

- [ ] Laptop local UI and backup both work; offline fallback opens and saves fictional writing.
- [ ] Real demo A can save, refresh, re-login and retrieve; B privacy test passed after provisioning.
- [ ] GitHub, Vercel, Supabase, coding agent and Cosmos are signed in.
- [ ] Open production/attendee page on your phone; scan companion QR.
- [ ] Complete the uninterrupted timed run using TONIGHT-CUE-SHEET.md; record actual total.
- [ ] Offline deck downloaded; prompts accessible; terminal font and browser zoom readable.
- [ ] Do Not Disturb on; Slack/email/messages and confidential TIC/hyperlocal tabs closed; credentials hidden.
- [ ] Charger, HDMI/USB-C adapter, hotspot; mouse and extension lead if useful.
