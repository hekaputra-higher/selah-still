# Backend setup

Create or inspect a dedicated Selah Still project under Higher Vision Ventures only. The current connection must be reauthorized before this organization is visible.
Use the Supabase CLI migration in this directory: link the project, inspect `supabase db push --dry-run`, then `supabase db push`. Verify commands with the installed CLI's `--help`.

Copy the project URL and publishable key into .env.local and both Vercel Preview/Production environments. Restart/rebuild after changing NEXT_PUBLIC values.

Create two confirmed, fictional demo accounts through Supabase Auth. Keep passwords in a password manager and ignored .env.local fields TEST_USER_A_* / TEST_USER_B_*. Do not disable email confirmation globally merely to speed up the demo. Pre-confirm only controlled demonstration accounts using the dashboard. Do not put real participant reflections in shared demo accounts.

Run npm run test:rls. It signs in as both accounts using the public API, inserts a temporary fictional reflection, proves access boundaries, and removes it. This is not yet a test result until run against a provisioned backend.

Plain English: signing in proves who you are. RLS checks that your user ID owns each requested reflection. Hiding Sarah's row in the UI does not protect it; the database must refuse access too.
