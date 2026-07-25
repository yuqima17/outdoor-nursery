# Admin Workflow

This is the first lightweight backend/admin workflow for Outdoor Nursery. It uses Supabase SQL Editor instead of a custom admin UI.

## Goal

Help the admin answer four questions:

1. What new parent feedback came in?
2. Which places have repeated or important feedback?
3. Which feedback should become a review queue item?
4. Which reviewed items should update public place data later?

## Admin Files

- [Admin Feedback Queries](../supabase/admin-feedback-queries.sql): read-only dashboard and QA queries.
- [Review Queue Helper](../supabase/admin-create-review-items-from-feedback.sql): preview and optional insert of review queue candidates from feedback groups.
- [Review Queue Actions](../supabase/admin-review-queue-actions.sql): manual status updates for review queue and linked feedback.
- [Admin Feedback Review](admin-feedback-review.md): feedback format and QA expectations.
- [Admin Review Flow](admin-review-flow.md): product rules for reviewing user feedback.

## Weekly Workflow

1. Open Supabase SQL Editor.
2. Run the read-only queries in [Admin Feedback Queries](../supabase/admin-feedback-queries.sql).
3. Check:
   - latest raw feedback
   - feedback grouped by place and type
   - high-priority feedback
   - place-level issue summary
   - review queue backlog
4. Open [Review Queue Helper](../supabase/admin-create-review-items-from-feedback.sql).
5. Run Step 1 preview only.
6. If candidates look reasonable, run the commented Step 2 insert.
7. Open [Review Queue Actions](../supabase/admin-review-queue-actions.sql).
8. Mark review items as `in_review`, `approved`, `dismissed`, or `needs_more_info`.
9. Mark linked feedback as `reviewed`, `applied`, or `dismissed`.

## Safety Rules

- Quick feedback is a signal, not proof.
- Feedback never directly updates public place facts.
- Do not update `places.place_json` without also considering `place_facts`.
- Recheck official sources for fees, reservations, hours, restroom availability, closures, and safety-related details.
- Parent feedback can support parent notes, but public facts should stay conservative.

## Status Lifecycle

Feedback:

```text
new -> reviewed -> applied
new -> dismissed
```

Review queue:

```text
new -> in_review -> approved
new -> in_review -> dismissed
new -> needs_more_info
```

## Priority Rules

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
- `stroller_worked`
- `restroom_was_easy`
- `baby_care_was_easy`
- `clean_enough`
- `crowd_was_okay`
- `kid_loved_it`
- `good_value`

## First Admin QA Pass

For the first backend/admin QA pass, only run read-only queries:

1. Latest raw feedback.
2. New feedback grouped by place and type.
3. Higher-priority review candidates.
4. Feedback summary for the last 7 days.
5. Review queue backlog.

Then send the row counts or screenshots back to Codex if anything is confusing.

## When To Build Admin UI

Do not build a custom admin UI yet. SQL Editor is enough until:

- More than one person reviews data.
- Feedback volume becomes hard to scan manually.
- Updating place data becomes a repeated weekly task.
- You need audit logs or role-based admin access.
