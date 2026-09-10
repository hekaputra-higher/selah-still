# Selah Still — Higher Vision Ventures

Use the Higher Vision Ventures GitHub account, Supabase organization and Vercel team only. Repository: https://github.com/hekaputra-higher/selah-still . The current connection can read this public repository but cannot push. Old cloud deployment links are retired from this handoff.

## Run locally

Node 22 or newer. From this directory:

```sh
npm ci
npm run quality
npm run start -- --port 3001
```

For a separate live copy, in another terminal from this directory:

```sh
git worktree add ../selah-still-live demo/live
cd ../selah-still-live
npm ci
npm run dev
```

If that worktree exists, enter it instead of recreating it. Live is http://localhost:3000; backup is http://localhost:3001. Do not start two servers from one directory. Keep the backup unconfigured for rehearsal-only operation until an intentional backend setup is verified. For a prepared full-stack fallback use a separate known-good configured copy or verified Higher Vision Ventures production release.

The existing 06-local-recovery checkpoint fixes the development-server module mismatch. New 07-hvv-handoff adds environment correction and fallback instructions; no product features change. Old tags are preserved.

## Connect the full-stack environment

Read workshop/CONNECTIONS.md. The local origin targets the correct repository; no push has succeeded. After the GitHub connection is authorized, push main, demo/live and tags. Do not force-push or replace existing remote history if it has changed.

Create/use the dedicated Higher Vision Ventures Supabase project. Apply supabase/migrations only there. Copy .env.example to ignored .env.local and fill only the new project's URL and browser-safe publishable key. Configure the same intended project in Vercel Preview/Production after team ownership is verified. Never use privileged browser credentials.

## Checks and facilitation

npm run quality includes formatting, lint, types, tests and production build. npm run test:rls requires two distinct confirmed synthetic accounts. npm run preflight checks configured services. Read workshop/readiness.md for actual evidence.

Use workshop/TONIGHT-CUE-SHEET.md, live-prompts.md, FALLBACK-MODES.md and EMERGENCY.md. The attendee resource is workshop/START-HERE.md, or /workshop on the final verified Higher Vision Ventures deployment. No final public URL or QR is available yet.
