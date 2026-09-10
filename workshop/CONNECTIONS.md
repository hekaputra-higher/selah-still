# Connection correction — Higher Vision Ventures only

| Service  | Actual connection observed                               | Intended target                                       | Required action                                                                                    |
| -------- | -------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| GitHub   | hekaputra-hyper; only unrelated private repo is writable | hekaputra-higher/selah-still                          | Reauthorize this chat's GitHub connection as hekaputra-higher and grant selah-still access.        |
| Supabase | Only HyperLocal organization is visible                  | Higher Vision Ventures, dedicated Selah Still project | Reauthorize Supabase with the account owning Higher Vision Ventures and include that organization. |
| Vercel   | Only HyperLocal team is visible                          | Higher Vision Ventures team, Selah Still project      | Reauthorize Vercel for the Higher Vision Ventures team; authorize its GitHub access if requested.  |

The public target https://github.com/hekaputra-higher/selah-still exists. Search metadata reports pull=true and push=false. The local origin now points there. No remote write has been attempted through the wrong account.

Local inspection: no .env.local, no populated .env.example values, no .vercel/project.json, and previously no Git remote. No credential migration was needed. Existing cloud resources were not changed or deleted.

## Replacements made / still needed

- Local remote: set to hekaputra-higher/selah-still.
- Old repository name and production links: removed from active handoff.
- Old attendee QR: retired; generate a replacement only after verifying the new /workshop URL.
- Supabase project ref, URL and publishable key: still pending new account access.
- Vercel team/project and Preview/Production URLs: still pending new account access.
- Historical Git commits and old evidence are preserved; they are not current cloud readiness evidence.

## Supabase action required

Organization: Higher Vision Ventures (not visible to the current connection; ID unknown).
Project: Selah Still, dedicated project; reuse only after inspecting ownership/schema.
Cost: not yet quoted. Once the correct organization is accessible, obtain its actual quote and request cost confirmation if required before creating anything.
Hadi action: reconnect Supabase using the Higher Vision Ventures account and authorize that organization. No need to choose HyperLocal or repeat the organization decision.

## Resume after reconnection

List actual identities/teams and confirm ownership first. Inspect existing target repo/project before writes. Push preserved history without force; apply migration only to the dedicated inspected backend; configure new public values; create two synthetic test accounts and run real persistence/RLS checks; connect Git to Vercel; review a feature Preview and merge only after verification. Publish a replacement attendee QR only after the final URL works.
