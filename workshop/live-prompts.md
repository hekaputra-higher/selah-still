# Live prompts

Use these one at a time. Read the agent's response before approving a change.

## 1 Understand the idea

I want a quiet Scripture reflection app called Selah Still. Who would use it, in what moment, and what problem would it solve? Ask at most three questions that materially change the product. Do not write code.

## 2 Define the MVP

Limit tonight to reading one passage, optional full chapter, D.W.E.L.L., signing in, saving and retrieving a private reflection. Define acceptance criteria and exclusions. The feelings-to-Scripture feature is future roadmap only.

## 3 Create context

Turn our decisions into concise docs for vision, users, requirements, flows, design, architecture, quality and roadmap. Flag contradictions. Do not invent requirements or implementation facts.

## 4 Inspect first

Read docs/ and inspect the repository, package scripts and Git status. Explain the current app, what works, and what remains unverified. Do not change files.

## 5 Plan only

Plan a narrow improvement: add a remaining-character hint under each D.W.E.L.L. response field. Identify the files, user behaviour, accessibility implications and verification. Do not implement yet.

## 6 Implement one slice

Implement only that character hint. Preserve writing, navigation, the 10,000-character limit, auth and saving. Avoid a live region that announces every keystroke. Run relevant checks and report the actual evidence.

## 7 Review the UI

Review the Scripture reading screen against docs/design-direction.md. Identify three concrete observations about hierarchy, spacing and readability. Do not change it yet.

## 8 Iterate UX

Implement the smallest approved UI correction. Keep the reading column and mobile navigation usable at 332px and 375px. Show the diff and verify keyboard focus.

## 9 Connect Supabase

Read docs/architecture.md and supabase/README.md. Use the dedicated project only. Review the migration and environment variable names. Never print keys or credentials. Connect browser Auth and Data API, and report anything that needs account setup.

## 10 Review Auth and RLS

Inspect the migration, grants, policies and client queries. Explain why user B cannot read, update or delete user A's reflection. Run npm run test:rls against two distinct confirmed demo accounts. Report BLOCKED if credentials are absent; do not claim policy review is a live test.

## 11 Accessibility

Verify headings, labels, keyboard focus, touch targets, contrast, expanded chapter state and error announcements. Test the full journey and report the methods used. Keep fixes narrowly scoped.

## 12 Quality gates

Run npm run quality. Read actual output. Fix failures, rerun affected checks, and distinguish passing tests from checks you could not execute.

## 13 Assumptions

List the assumptions you made about auth, Scripture text, network failures, draft persistence and deployment. Which are verified, which are decisions, and which require evidence?

## 14 Try to break it

Try empty writing, a long response, failed sign-in, failed save, refresh, cross-account access and narrow mobile width. Preserve test data privacy. Do not touch unrelated projects. Report observed failures with reproduction steps.

## 15 Git diff

Inspect git status and git diff. Look for unrelated files, secrets, generated output and scope expansion. Explain the user-visible change and any remaining risk before committing.

## 16 Commit and PR

After checks pass, commit the approved change on demo/live, push the branch, and open a PR to main with problem, change and verification. Do not merge until the preview is reviewed. If no remote exists, report the missing repository connection.

## 17 Preview review

Open the exact Vercel Preview for this commit. Verify the changed behaviour, reading, mobile layout, sign-in, save/retrieve and console. Confirm the preview points to the intended Supabase environment. Report evidence, not just deployment status.

## 18 Production readiness

Review the PR, check results, preview evidence and database migration status. Identify blockers. If authorized and all gates pass, merge and verify the resulting production deployment and real save/retrieve flow. Do not promote an incomplete backend as a finished private journal.
