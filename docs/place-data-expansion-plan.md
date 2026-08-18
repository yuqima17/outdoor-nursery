# Place Data Expansion Plan

This plan keeps Outdoor Nursery useful while the database grows beyond the first 30 places.

## Goal

Add more places and cities without turning the app into a generic map directory.

The product should still answer the parent question:

```text
Is this outing practical with a baby, toddler, or young child today?
```

## Current State

- Launch scope is United States first.
- Current dataset is 30 places in the first metro area.
- Current categories are `park`, `playground`, and `outdoor_mall`.
- Supabase stores published places, source rows, field-level facts, feedback, and review queue rows.
- The app can still fall back to local seed data if Supabase is unavailable.

## New Locality Fields

The place schema now supports:

- `country_code`
- `metro_area`
- `region`
- `city`
- `neighborhood`
- nested `location`

Recommended display hierarchy:

```text
country_code -> metro_area -> region -> city -> neighborhood
```

For the current dataset:

```text
US -> San Francisco Bay Area -> Peninsula/East Bay/South Bay/San Francisco -> city
```

## Data Quality Fields

The place schema now also supports:

- `source_quality`
- `last_checked_at`
- `needs_recheck`
- `place_status`

These fields are for admin workflow first. The user-facing app should keep copy simple, such as `Recently checked`, `Parent notes needed`, or no label at all.

## Expansion Sequence

1. Upgrade Supabase with the locality/data-quality migration.
2. Rerun the seed SQL so the existing 30 places have populated fields.
3. Add 10 to 20 new places in the same metro area.
4. Review whether the Home filters still feel useful with 40 to 50 places.
5. Add city/region selector only after there is enough data to make the selector useful.
6. Add a second metro area only after the first market has a repeatable data-entry workflow.

## Data Entry Rules

For each new place:

- Use official source URLs whenever possible.
- Save at least one source URL.
- Set unknown parent-specific details to `Not reported` instead of guessing.
- Add `last_checked_at`.
- Mark `needs_recheck: true` until an owner/admin has reviewed the place.
- Keep `place_status: active` only when the place appears publicly open.

## First City Selector

Do not build a city selector from a hard-coded city list.

Recommended source:

```sql
select distinct metro_area, region, city
from places
where published_status = 'published'
  and place_status = 'active'
order by metro_area, region, city;
```

First UI version:

- `All`
- Region chips, such as `Peninsula`, `East Bay`, `South Bay`, `San Francisco`
- Later: city chips or a city picker

## Admin Review

Expansion should use the same rule as feedback:

```text
Candidate data -> review -> published place data
```

New places can start as `draft` or `published` depending on confidence, but weak records should not be promoted only because they exist in a source.
