# Place Data Update SOP

This SOP explains how to safely update Outdoor Nursery place data after admin review.

## Goal

When feedback or source checks show that a place detail may be wrong, update the public data carefully without letting one raw feedback row overwrite the app.

## Core Rule

Update public place data only after review.

Raw feedback should move through:

```text
feedback -> review_queue -> manual review -> place update -> feedback applied
```

## What To Update

### Update `places.place_json`

Update this when the mobile app should show a new value.

Examples:

- `amenities.parking`
- `amenities.parking_fee`
- `amenities.baby_care`
- `reservation`
- `cost`
- `parent_notes`
- `age_guidance`

### Update `place_facts`

Update this at the same time for the same field path.

`place_facts` stores:

- field path
- current value
- trust level
- source type
- source id
- verification date
- expiration date
- admin notes

### Update `place_sources`

Update or add source rows when an official page or external ID was used.

Use this for:

- official city/park pages
- mall venue pages
- parking pages
- reservation pages
- verified external IDs

### Update `review_queue`

Update this after the admin decision.

Use:

- `approved` when the review item should inform a data update.
- `dismissed` when the feedback is not actionable.
- `needs_more_info` when more reports or a field visit are needed.

### Update `feedback`

Update linked feedback after the decision.

Use:

- `reviewed` when the signal was checked but no public data changed.
- `applied` when it was used to update public data or parent notes.
- `dismissed` when it was weak, duplicate, unclear, or not actionable.

## Trust Level Guide

| Trust level | Use when |
| --- | --- |
| `official_verified` | A current official source confirms the value. |
| `third_party_verified` | A reputable third-party source confirms the value. |
| `trusted_parent_report` | A known or trusted parent report confirms a practical detail. |
| `crowd_confirmed` | Multiple independent feedback reports agree. |
| `needs_verification` | Useful but still needs source or parent confirmation. |
| `unknown` | No reliable information yet. |

## Field Update Rules

| Field type | Minimum evidence before changing public data |
| --- | --- |
| Admission, parking fee, reservation, hours, closures | Official source check. |
| Restroom availability | Official source, trusted parent report, or repeated parent reports. |
| Baby care details | Trusted parent report or repeated parent reports. |
| Stroller friendliness | Trusted parent report or repeated parent reports. |
| Crowd, wait, kid enjoyment, value | Parent notes only unless repeated reports are strong. |
| Safety or maintenance | Treat as high priority; verify before publishing strong claims. |

## Example: Parking Was Hard

1. User taps `Parking was hard`.
2. Feedback row is stored as `new`.
3. Admin query shows the report.
4. Review queue item is created for `amenities.parking`.
5. Admin checks official parking page or waits for repeated parent reports.
6. If confirmed, update:
   - `places.place_json -> amenities.parking`
   - `places.place_json -> amenities.parking_fee`, if needed
   - `place_facts` for the changed field paths
7. Mark review item `approved`.
8. Mark linked feedback `applied`.

## Example: Family Restroom Available

1. User taps `Family restroom available`.
2. Review queue item maps to `amenities.baby_care`.
3. If one trusted parent confirms it, update baby care details.
4. If only one anonymous report exists, mark `needs_more_info` or keep as parent note.
5. Do not publish `Family restroom available` as a fact unless evidence is strong enough.

## Example: Info Changed

1. User taps `Info changed`.
2. Admin reviews the place manually.
3. If the affected field is unclear, mark `needs_more_info`.
4. If the affected field is found, create or update a specific review item with the field path.
5. Update public data only after checking the relevant source.

## Local JSON Reminder

The app currently reads live place data from Supabase, with local JSON as fallback.

If a Supabase data change should also become part of the repo seed data, update:

- [data/sample-places.json](../data/sample-places.json)
- [supabase/seed.sql](../supabase/seed.sql) by running `node scripts/generate-supabase-seed.js`

Do not rely on manual Supabase edits as the only long-term record once the change is product-approved.

## SQL Templates

Use [supabase/admin-place-update-templates.sql](../supabase/admin-place-update-templates.sql) for manual update templates.
