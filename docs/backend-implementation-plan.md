# Backend Implementation Plan

This plan moves Outdoor Nursery from local JSON to a Supabase-backed prototype.

Do not do all steps at once. Each phase should be verified before moving on.

## Phase 0: Current State

Completed:

- Local Expo app works.
- Local sample data has 30 Bay Area places.
- Data schema is documented.
- Feedback model is documented.
- Admin review flow is documented.
- Backend decision is Supabase first.
- Supabase schema SQL exists at [supabase/schema.sql](../supabase/schema.sql).
- Supabase project exists.
- Schema has been run successfully in Supabase.
- Seed import SQL exists at [supabase/seed.sql](../supabase/seed.sql).
- Seed generator exists at [scripts/generate-supabase-seed.js](../scripts/generate-supabase-seed.js).
- Seed data has been imported successfully.
- App data reads are wired through a provider with Supabase-first, local JSON fallback behavior.

Not started:

- Feedback writes.

## Phase 1: Create Supabase Project

Owner: user

Status: done

Follow [Backend Setup Guide](backend-setup-guide.md).

Output needed from user:

- Confirmation that project exists.
- Project URL.
- Anon public key.

Do not share:

- Database password.
- Service role key.

## Phase 2: Run SQL Schema

Owner: user with Codex guidance

Status: done

Steps:

1. Open Supabase SQL Editor.
2. Paste [supabase/schema.sql](../supabase/schema.sql).
3. Run it.
4. Confirm these tables exist:
   - `places`
   - `place_sources`
   - `place_facts`
   - `feedback`
   - `review_queue`

Expected result:

```text
Schema exists, but no data has been imported yet.
```

## Phase 3: Prepare Seed Import

Owner: Codex

Status: done

Created [scripts/generate-supabase-seed.js](../scripts/generate-supabase-seed.js), which transforms [data/sample-places.json](../data/sample-places.json) into [supabase/seed.sql](../supabase/seed.sql).

Mapping:

- `places.place_json`: full place JSON.
- `places.tags`: place tags.
- `place_sources`: source URLs and external IDs.
- `place_facts`: important field-level facts and trust metadata.

Initial `published_status`:

```text
published
```

Reason:

The prototype should read these records immediately after import.

Regenerate the seed file after changing sample data:

```bash
node scripts/generate-supabase-seed.js
```

## Phase 4: Import Seed Data

Owner: Codex with user running the final command or SQL

Status: done

Options:

- SQL insert file.
- Node script using Supabase anon/service context.
- Manual import through Supabase dashboard.

Recommended first approach:

```text
Run supabase/seed.sql in Supabase SQL Editor.
```

Reason:

It avoids app secrets and keeps the first import transparent.

## Phase 5: App Reads Places From Supabase

Owner: Codex

Status: implemented, needs env values

Implementation:

- Added Supabase client dependency.
- Added `react-native-url-polyfill`.
- Added `.env.example`.
- Added data service and provider:
  - [src/data/supabaseClient.ts](../src/data/supabaseClient.ts)
  - [src/data/places.ts](../src/data/places.ts)
  - [src/state/PlacesContext.tsx](../src/state/PlacesContext.tsx)
- App behavior:
  - Uses local JSON immediately.
  - If Supabase env values are configured, loads published places from Supabase.
  - If Supabase is unavailable or returns no published places, falls back to local JSON.

Env variables still needed:

  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`

Important rule:

UI screens should not call Supabase directly. Screens should call the data service.

## Phase 6: Feedback Writes To Supabase

Owner: Codex

Implementation idea:

- Keep local selected feedback state for UI responsiveness.
- Also insert feedback into Supabase when configured.
- If remote insert fails, keep local behavior and show no scary error in the MVP.

Feedback insert target:

```text
feedback
```

## Phase 7: Review Queue

Owner: later

Do not build an admin UI yet.

First version can be:

- Supabase Table Editor.
- Manual review.
- Later internal admin screen.

## Phase 8: Beta Hardening

Before beta:

- Official recheck high-priority places.
- Decide whether anonymous feedback is allowed.
- Add privacy policy.
- Decide iOS-only or iOS + Android.
- Consider Supabase Pro.
- Consider backups.

## Current Next Action

User action:

```text
Send Codex the Supabase Project URL and anon public key, or create a local .env file from .env.example.
```

Expected result:

```text
The phone app reads the 30 places from Supabase instead of bundled JSON.
```

Do not share:

```text
service_role key
database password
```
