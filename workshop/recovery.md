# Recovery without losing your work

Never use reset --hard or git clean on stage.

## Prepare two separate copies before leaving

Keep the extracted `selah-still` folder as the known-good copy. Duplicate it to `selah-still-live` for experiments, or use a worktree after all tags exist:

```
git worktree add ../selah-still-live -b demo/live 05-finished
cd ../selah-still-live
npm ci
```

Copy .env.local privately into the worktree if using real Supabase. It is intentionally not in Git. Preinstall both copies before the event. Run the known-good copy on port 3001 with `npm run start -- --port 3001` after building; run the live copy on 3000 with `npm run dev`.

If a live edit fails, leave the worktree intact and open http://localhost:3001. No reset, checkout or installation required. To preserve and reset the live branch later: commit or stash the work deliberately, then create another worktree from 05-finished.

## Checkpoints

Use `git show <tag>` to teach the changes without switching a running server. Use `git worktree add ../inspect-02 02-ui` to inspect a checkpoint in isolation. Early tags are teaching snapshots, not all runnable releases.

| Tag         | Contents                                 | Recovery role                                                                        |
| ----------- | ---------------------------------------- | ------------------------------------------------------------------------------------ |
| 00-starter  | Tooling and lockfile                     | Inspect setup; use the separate generic starter for runnable participant boilerplate |
| 01-context  | Product decisions in docs/               | Show the world the agent receives                                                    |
| 02-ui       | Scripture and D.W.E.L.L. UI, client seam | Inspect initial app; no configured backend                                           |
| 03-supabase | Migration and live two-user test         | Teach policy; provisioning remains separate                                          |
| 04-quality  | Tests, CI and checks                     | Show gates and evidence                                                              |
| 05-finished | Complete local preparation package       | Always use this for known-good recovery                                              |

## Failure ladder

Live branch → known-good copy on 3001 → verified Vercel URL → backups/offline.html. The offline file uses fictional tab-local writing and never claims to be Supabase.

| Failure               | Do this                                                                                                       | Say this                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Agent latency/failure | Stop after 60 seconds; open known-good app and planned diff                                                   | “I prepared a checkpoint so we can keep learning.”           |
| Wi-Fi                 | Open local app or offline.html                                                                                | “The workflow still matters when a service is unavailable.”  |
| npm/packages          | Use the preinstalled known-good copy                                                                          | “We are using the prepared environment.”                     |
| Supabase/Auth         | Check configured URL/key and confirmed account; then show migration and saved test evidence only if it exists | “This connection is not verified right now.”                 |
| GitHub                | Show local log, diff and prepared PR text; preserve commits                                                   | “The change is committed locally; remote review is pending.” |
| Vercel                | Open previously verified deployment; do not redeploy repeatedly                                               | “This known-good release is our fallback.”                   |
| Build                 | Read first actionable error, otherwise open known-good app                                                    | “A failed build is evidence that should stop release.”       |
| Env variables         | Check names without showing values; rebuild after NEXT_PUBLIC changes                                         | “Configuration is part of the application.”                  |

No backend or network result may be represented as PASS based on the offline example.
