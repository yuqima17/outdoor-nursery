# Admin Feedback Review

This is the first lightweight admin workflow for checking parent feedback in Supabase.

Feedback is useful signal, but it should not directly update public place facts. Treat it as review input.

## Where To Look

In Supabase:

1. Open `Table Editor`.
2. Open `feedback`.
3. Sort by `created_at` descending.

Useful columns:

- `place_id`
- `feedback_type`
- `device_id`
- `status`
- `metadata`
- `created_at`

## Current App Behavior

- Quick feedback is anonymous.
- The app stores an anonymous `device_id` on the phone.
- The app stores selected button state locally.
- Selecting a quick feedback button sends one backend row per device, place, and feedback type.
- Deselecting a button only changes local UI state.
- Public place facts are not automatically changed.

## Feedback Type Format

The app displays friendly labels, but stores stable codes.

Examples:

| Label | Stored `feedback_type` |
| --- | --- |
| Easy parking | `easy_parking` |
| Parking was hard | `parking_was_hard` |
| Family restroom available | `family_restroom_available` |
| Info changed | `info_changed` |

The original label is also stored in `metadata.feedback_label`.

## Review Queries

Use [supabase/admin-feedback-queries.sql](../supabase/admin-feedback-queries.sql) in Supabase SQL Editor.

Recommended first checks:

1. Latest raw feedback.
2. New feedback grouped by place and type.
3. Higher-priority review candidates.

If early testing created rows where `feedback_type` contains display labels such as `Easy parking`, run [supabase/normalize-feedback-types.sql](../supabase/normalize-feedback-types.sql) once.

## Status Meaning

- `new`: not reviewed yet.
- `reviewed`: seen by admin, no public fact change yet.
- `applied`: used to update a public place fact or parent note.
- `dismissed`: weak, duplicate, unclear, or not actionable.

## Priority Guidance

High priority:

- `info_changed`
- `needs_maintenance`
- `baby_care_missing`
- `parking_was_hard`

Medium priority:

- `long_wait`
- `too_crowded`
- `changing_table_available`
- `family_restroom_available`
- `good_nursing_spot`

Low priority:

- `easy_parking`
- `kid_loved_it`
- `good_value`
- `crowd_was_okay`

## Before Updating Public Data

Before changing a place fact:

1. Check whether the feedback is recent.
2. Check whether more than one device reported the same issue.
3. Check official source if the field is admission, parking fee, reservation, hours, or restroom availability.
4. Update `place_json` and `place_facts` together.
5. Mark related feedback as `applied` or `reviewed`.

For now, manual review in Supabase is enough. A full admin UI can wait.
