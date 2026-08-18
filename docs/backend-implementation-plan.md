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

- Automated place/event import jobs.
- City selector UI.
- Custom admin UI.

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

Status: implemented, needs phone QA

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

Env variables configured locally:

  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`

Important rule:

UI screens should not call Supabase directly. Screens should call the data service.

## Phase 6: Feedback Writes To Supabase

Owner: Codex

Status: implemented, needs phone QA

Implementation:

- Keep local selected feedback state for UI responsiveness.
- Insert a `feedback` row into Supabase when a quick feedback button is selected.
- Use an anonymous device id stored in AsyncStorage.
- Store source as `quick_feedback`.
- Store stable snake-case feedback codes in `feedback_type`.
- Store the display label in `metadata.feedback_label`.
- Avoid duplicate backend submissions for the same device, place, and feedback type.
- Store metadata with app version, interaction type, platform, and screen.
- If remote insert fails, keep local behavior and show no scary error in the MVP.
- Do not automatically update public place facts.
- Added [supabase/normalize-feedback-types.sql](../supabase/normalize-feedback-types.sql) to clean up early test rows that stored labels instead of codes.

Feedback insert target:

```text
feedback
```

## Phase 7: Review Queue

Owner: later

Status: SQL helpers exist; custom admin UI is deferred.

Do not build an admin UI yet.

First version can be:

- Supabase Table Editor.
- Manual review.
- Later internal admin screen.

Current SQL helpers:

- [supabase/admin-feedback-queries.sql](../supabase/admin-feedback-queries.sql)
- [supabase/admin-create-review-items-from-feedback.sql](../supabase/admin-create-review-items-from-feedback.sql)
- [supabase/admin-review-queue-actions.sql](../supabase/admin-review-queue-actions.sql)
- [supabase/admin-place-update-templates.sql](../supabase/admin-place-update-templates.sql)

## Phase 8: City And Data Expansion

Owner: Codex with user data QA

Status: schema foundation implemented locally, needs Supabase migration

Implementation:

- Add locality fields to `places`: `country_code`, `metro_area`, `region`, and `neighborhood`.
- Add data-quality fields to `places`: `source_quality`, `last_checked_at`, `needs_recheck`, and `place_status`.
- Add nested `location` facts for admin review.
- Keep current app behavior unchanged until the UI needs city/region filters.

Migration:

- [supabase/migrations/2026-08-18-place-locality-and-quality.sql](../supabase/migrations/2026-08-18-place-locality-and-quality.sql)

See also:

- [Place Data Expansion Plan](place-data-expansion-plan.md)

## Phase 9: Events And Scheduled Imports

Owner: later

Status: planned

Start with official event sources and admin review.

Do not publish event imports directly to users. Import into staging/review first.

See:

- [Events MVP Plan](events-mvp-plan.md)

## Phase 10: Beta Hardening

Before beta:

- Official recheck high-priority places.
- Decide whether anonymous feedback is allowed.
- Add privacy policy.
- Decide iOS-only or iOS + Android.
- Consider Supabase Pro.
- Consider backups.

## Current Next Action

Codex action:

```text
Prepare the locality/data-quality migration and docs.
```

Expected result:

```text
The backend can support more cities and future event ingestion without changing user-facing app behavior yet.
```

User action later:

```text
Run the new migration in Supabase SQL Editor, then rerun the regenerated seed SQL when ready.
```
