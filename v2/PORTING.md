# Porting Jarvis to another school (core + pack)

Jarvis is built in two halves so it can move without carrying any school's data or materials with it.

| Part | What it is | Where it lives | Moves to a new school? |
|---|---|---|---|
| **Core** | The app shell (`index.html`), voice session code, client tools, snapshot cache, job cards, memory review, service worker | This repo | Yes, unchanged |
| **Pack** | `pack/<school>/pack.json`: brand colours, fonts, wordmark, wake word, links, pipeline stages, KPI tiles | This repo, one folder per school | A new pack is written for the new school |
| **Backend** | Apps Script: data sheet, snapshot, writes, jobs, school rules and prompt (`Jarvis2.gs`, `Jarvis2Agent.gs`) | The school's own Google Workspace | **No.** A fresh copy is set up in the new school's Workspace |
| **Voice agent** | ElevenLabs agent built from `Jarvis2Agent.gs` | The owner's ElevenLabs account | A new agent is created from the new backend |

## Make a new pack (about an hour)

1. Copy `pack/manara/pack.json` to `pack/<new-school>/pack.json`.
2. Change `brand` (two darkest brand colours for the rail, primary and secondary), `fonts`, `name`, `tagline`, `links`, and the `pipeline` stages and `kpis` to match that school's admissions process.
3. Open the app with `?pack=<new-school>` to test. When it is right, make it the default in `index.html` (`PACK_ID`).
4. Set up a **new** backend in the new school's Google Workspace: a new sheet, a new Apps Script project with the two Jarvis 2 files, its own folder IDs, its own `J2_TOKEN`, and its own prompt facts in `J2A_PROMPT`.
5. Create a new voice agent with `j2AgentSync()` from that backend. Pair each device with the new backend's pairing link.

## Never carry over

- No Manara data of any kind: applicant exports, the applicant index, contacts, tasks, memory notes, Drive files, reports.
- No Manara artefacts: rubrics, handbooks, templates, decks, the Pulse, the CAT4 rules or thresholds.
- No Manara keys or links: `J2_TOKEN`, the ElevenLabs agent, the Apps Script URLs, folder IDs.
- The Manara pack folder can stay in this repo, but no other school's deployment should ever load it.

## Rules for a KAIR pack

- **Never copy a Manara artefact, rubric or data into KAIR.**
- **No financial aid, fee support or scholarships at KAIR.** The only reductions are sibling, staff, company or group discounts, and only when Finance has confirmed them. Remove every aid-related rule from the prompt, and add this one instead.
- **Each school's committee decides.** Jarvis never makes, predicts or recommends an admissions decision.
- **AI prepares, a named person approves** anything a family sees. Jarvis only saves drafts and prepares messages; a person reviews and sends.
- Keep the same privacy rules: never read scores aloud, student names and family details stay private, and nothing is sent automatically.
