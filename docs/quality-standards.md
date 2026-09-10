# Evidence before release

Run npm run quality. Run npm run test:e2e for desktop/mobile reading and rehearsal flow, axe accessibility checks and page errors. Run npm run test:rls with two distinct confirmed users against the target database. Never substitute mocked data for RLS evidence.

Manually: sign in, save, refresh, retrieve, sign out; try wrong credentials; disconnect network and save; check 332px/375px widths, tab navigation, focus and loading. Verify Scripture against the linked public-domain source. Check Git diff and tracked files for credentials. Run npm audit --omit=dev and assess findings. Review actual Vercel Preview before production.

Missing credentials mean BLOCKED for live auth/RLS, not PASS. Unreachable deployments mean BLOCKED for hosted readiness, even when a local build passes.
