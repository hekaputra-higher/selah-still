# Architecture

Next.js App Router + TypeScript, deployed on Vercel. Public reading page is statically renderable. A client component manages the reflection flow. Supabase JS handles browser authentication and authenticated Data API requests. Postgres checks each row's user_id against auth.uid(). Browser sessions are not trusted by any server authorization code; there are no private server routes in this slice.

Only NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY enter the client bundle. Privileged keys are unnecessary. Private data is never pre-rendered or cached by Next.js. Session storage is confined to visibly labelled, fictional rehearsal mode when the backend is absent.

Schema: reflections(id, user_id, passage_id, draw_near, write_it, examine_it, look_at_him, listen_live_it, created_at, updated_at). DB constraints limit response lengths; immutable creation time; update trigger refreshes updated_at. Schema is reproducible from supabase/migrations.

References checked September 10, 2026: https://supabase.com/docs/guides/auth/quickstarts/nextjs ; https://supabase.com/docs/guides/database/postgres/row-level-security ; https://supabase.com/changelog.md . No relevant Auth/RLS breaking change found in the fetched changelog. SSR cookies would be needed if future server-rendered private routes are introduced.
