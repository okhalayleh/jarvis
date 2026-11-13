# Jarvis 2

Omar's voice chief of staff. Say "Jarvis" (or tap the orb) and talk.

- **Fast lane:** what Jarvis needs (calendar, tasks, contacts, applicants, pipeline numbers) is loaded before you speak, so most answers need no lookup. Writes (tasks, meetings, reminders, drafts) are confirmed straight away and finish in the background; a red banner appears if one fails.
- **Slow lane:** reports and comparisons run as background jobs and appear as cards in Reports.
- **Never sends** an email or a WhatsApp message. Drafts go to Gmail; WhatsApp messages wait on screen for you to tap.
- **No scores** are ever shown or spoken.

This repo holds only the app shell and the brand pack. No data, keys or school documents are stored here: the app gets its data from a private backend in the school's own Google Workspace after a one-time pairing link, and keeps it on the device behind an access code.

See `PORTING.md` for moving Jarvis to another school.
