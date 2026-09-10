# Four demo modes — choose before presenting

**60-second rule:** if the next action is not obvious within 60 seconds, move to the next usable mode. Preserve failed edits. A prepared script is not a completed rehearsal.

| Mode                    | What works                                                                                                        | Entry / trigger                                                 | Current acceptance                                                             |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| A — full live           | AI → real app/backend → quality → GitHub → Preview → Production                                                   | Preferred after all Higher Vision Ventures gates pass           | BLOCKED by cloud authorization                                                 |
| B — prepared full-stack | Known-good configured code → real Supabase → checked release workflow                                             | Live AI/code fails while cloud services still work              | BLOCKED until the backend/release flow is verified                             |
| C — local rehearsal     | Scripture → chapter → D.W.E.L.L. → clearly labelled tab-local save/retrieve; local code, SQL and quality evidence | Backend/auth/cloud unavailable; use unconfigured backup on 3001 | HTTP recovery tested; laptop UI rehearsal still needed                         |
| D — offline             | Self-contained HTML, screenshots, offline deck, prompts and attendee Markdown                                     | Internet or local runtime unavailable                           | Script syntax/resources inspected; laptop opening and walkthrough still needed |

## Mode C, exact fallback flow

Start the backup on port 3001 before presenting with no Supabase variables configured. Open Scripture; expand chapter; begin D.W.E.L.L.; enter fictional writing; Save → Enter local rehearsal → Save → My reflections. Say: “For this fallback, the writing stays in this tab. Supabase is the intended production backend.” The wording does not claim the unconnected backend has been deployed.

Show docs/architecture.md and the migration to explain ownership. Show only genuine local quality results. Explain GitHub/Preview using the diagram and local history while clearly stating that cloud execution is unavailable. Give attendees workshop/START-HERE.md if the new hosted destination is not available. Pre-distribute it locally before the event if internet cannot be relied on.

## Mode D, exact fallback flow

Open backups/offline.html directly on your laptop. Read the passage and chapter, type fictional text, use its save/retrieve controls. If local storage is unavailable in that browser, demonstrate writing without saving and use the supplied screenshots. Open the offline deck and local context files. Continue into attendees' own ideas using workshop/START-HERE.md. This mode never demonstrates real account privacy.

## Failure transitions

- Code breaks → Mode B if verified, otherwise C: “I have a prepared checkpoint. Let’s switch to it and keep going.”
- Supabase/auth fails → C: “The backend isn’t responding. I’ll use clearly labelled local rehearsal storage and show you the privacy rules in the code.”
- Preview fails → verified Higher Vision Ventures production if available, otherwise C: “The preview isn’t opening. We’ll use the prepared version and walk through the release steps.”
- Internet fails → D: “We can keep going offline—the decisions and the process are still here.”

## Rehearsal record

Live-code failure drill: terminal verified broken live HTTP 500, backup HTTP 200, restored live HTTP 200; latest result in evidence/recovery-drill.txt. This does not prove browser interaction.
Supabase unavailable: current local configuration is genuinely absent. The missing-configuration screen and rehearsal journey were browser-verified in the previous session on the now-retired cloud environment; that is historical UI evidence only. New environment verification is blocked.
Preview unavailable: current Higher Vision Ventures preview does not exist in accessible resources. Transition script prepared; no new preview failure simulation is claimed.
Full-stack and fallback presentation durations: NOT MEASURED. The cloud browser blocks localhost/file URLs, and Work cannot operate Hadi's physical laptop. Hadi must run the uninterrupted fallback walkthrough before calling the workshop ready.

If Mode C or D is rehearsed successfully on the laptop, the workshop can proceed using that mode even while A/B remain blocked. Do not present A/B as verified.
