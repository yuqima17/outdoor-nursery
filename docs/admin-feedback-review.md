# Admin Feedback Review

This is the first lightweight admin workflow for checking parent feedback in Supabase.

Feedback is useful signal, but it should not directly update public place facts. Treat it as review input.

## Where To Look

In Supabase:

1. Open `Table Editor`.
2. Open `feedback`.
3. Sort by `created_at` descending.

Useful columns:

- `id`
- `place_id`
- `feedback_type`
- `source`
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

Paired vote counts require [supabase/feedback-votes.sql](../supabase/feedback-votes.sql) to be run once after the base schema.

Recommended first checks:

1. Latest raw feedback.
2. New feedback grouped by place and type.
3. Higher-priority review candidates.
4. Feedback summary for the last 7 days.
5. Place-level issue summary.
6. Review queue backlog.

If early testing created rows where `feedback_type` contains display labels such as `Easy parking`, run [supabase/normalize-feedback-types.sql](../supabase/normalize-feedback-types.sql) once.

To turn repeated or high-priority feedback into manual review queue candidates, use [supabase/admin-create-review-items-from-feedback.sql](../supabase/admin-create-review-items-from-feedback.sql). Preview Step 1 first; only run the commented insert after checking the candidates.

To update review item and feedback statuses after manual review, use [supabase/admin-review-queue-actions.sql](../supabase/admin-review-queue-actions.sql). All write examples are commented out by default.

For the overall admin routine, see [Admin Workflow](admin-workflow.md).

## Query QA Checklist

Run only read-only query blocks in [supabase/admin-feedback-queries.sql](../supabase/admin-feedback-queries.sql) for the basic QA pass.

Recommended order:

1. Submit one fresh quick feedback from the phone.
2. Run `Latest raw feedback`.
3. Run `New feedback grouped by place and type`.
4. Run `Higher-priority review candidates`.
5. Run `Feedback summary for the last 7 days`.
6. Run `Review queue backlog`.
7. Send the row counts or screenshots back to Codex if anything looks confusing.

### 1. Latest Raw Feedback

Use this to confirm the app is writing rows.

Expected:

- Newest row appears at the top.
- `place_name` is readable.
- `feedback_type` is a stable code like `easy_parking`, not `Easy parking`.
- `source` is `quick_feedback`.
- `feedback_label` contains the button label.
- `metadata.feedback_label` contains the button label.
- `device_id` starts with `anon_`.

If this query returns no rows:

- Submit a new quick feedback from the phone.
- Confirm `.env` is loaded by restarting Expo.
- Confirm Supabase RLS allows public insert into `feedback`.

### 2. New Feedback Grouped By Place And Type

Use this to see repeated reports.

Expected:

- `report_count` increases when multiple devices report the same place/type.
- `device_count` shows how many anonymous devices reported the same place/type.
- Single-device testing may show only `1`.
- `latest_report_at` should match recent phone tests.

If groups look messy:

- Check whether old display-label feedback rows still exist.
- Run [supabase/normalize-feedback-types.sql](../supabase/normalize-feedback-types.sql) once if needed.

### 3. Higher-Priority Review Candidates

Use this to decide what needs manual review first.

Expected:

- `info_changed`, `needs_maintenance`, `baby_care_missing`, and `parking_was_hard` appear as `high`.
- baby care detail reports like `family_restroom_available` appear as `medium`.
- positive confidence signals like `kid_loved_it` appear as `low`.

Important:

- These are signals only.
- Do not update public place data until the feedback is reviewed.

## QA Result Notes

Use this table while checking:

| Check | Expected | Result |
| --- | --- | --- |
| Latest row appears | yes | todo |
| `feedback_type` is snake-case | yes | todo |
| `source` is `quick_feedback` | yes | todo |
| `metadata.feedback_label` exists | yes | todo |
| `device_id` starts with `anon_` | yes | todo |
| Grouped query returns understandable counts | yes | todo |
| Priority query separates high/medium/low | yes | todo |

## Status Meaning

- `new`: not reviewed yet.
- `reviewed`: seen by admin, no public fact change yet.
- `applied`: used to update a public place fact or parent note.
- `dismissed`: weak, duplicate, unclear, or not actionable.

Review queue statuses:

- `new`: candidate exists, but admin has not started.
- `in_review`: admin is checking source or context.
- `approved`: admin agrees the item should inform a data update.
- `dismissed`: not actionable.
- `needs_more_info`: wait for more parent reports or official-source confirmation.

## Priority Guidance

High priority:

- `info_changed`
- `needs_maintenance`
- `needs_cleaning`
- `baby_care_missing`
- `restroom_was_hard`
- `stroller_was_hard`
- `parking_was_hard`

Medium priority:

- `felt_pricey`
- `long_wait`
- `too_crowded`
- `changing_table_available`
- `family_restroom_available`
- `good_nursing_spot`

Low priority:

- `easy_parking`
- `stroller_worked`
- `restroom_was_easy`
- `baby_care_was_easy`
- `clean_enough`
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

Use [Place Data Update SOP](place-data-update-sop.md) and [supabase/admin-place-update-templates.sql](../supabase/admin-place-update-templates.sql) for the manual update steps.

For now, manual review in Supabase is enough. A full admin UI can wait.
