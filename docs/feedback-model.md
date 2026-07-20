# Feedback Model

The MVP should collect lightweight feedback without requiring full reviews.

## Product Goal

Feedback should help keep place information fresh:

- Parking changed.
- Restrooms were closed.
- Baby care facilities were available or missing.
- A path was not stroller-friendly.
- Shade was worse than expected.
- The place was better or worse for toddlers than the listing said.

## MVP Feedback Types

Positive:

- `easy_parking`
- `stroller_worked`
- `restroom_was_easy`
- `baby_care_was_easy`
- `changing_table_available`
- `family_restroom_available`
- `good_nursing_spot`
- `clean_enough`
- `crowd_was_okay`
- `kid_loved_it`
- `good_value`

Negative:

- `parking_was_hard`
- `baby_care_missing`
- `too_crowded`
- `long_wait`
- `needs_maintenance`
- `info_changed`

MVP button labels used in the app:

- `Easy parking`
- `Parking was hard`
- `Stroller worked`
- `Restroom was easy`
- `Baby care was easy`
- `Changing table available`
- `Family restroom available`
- `Good nursing spot`
- `Baby care missing`
- `Clean enough`
- `Crowd was okay`
- `Too crowded`
- `Long wait`
- `Kid loved it`
- `Good value`
- `Needs maintenance`
- `Info changed`

## Feedback Record

```json
{
  "id": "string",
  "place_id": "string",
  "feedback_type": "string",
  "note": "string",
  "created_at": "YYYY-MM-DDTHH:mm:ssZ",
  "source": "local_prototype | user_submission",
  "status": "new | reviewed | applied | dismissed"
}
```

## MVP Behavior

For the local prototype:

- User taps one or more feedback buttons.
- Optional note field appears after button selection.
- Feedback can be stored locally or logged to the console.
- No account is required.
- No public display of feedback is required.

## Later Backend Behavior

When a backend exists:

- Store feedback records.
- Group feedback by place and type.
- Show admin queue for review.
- Update place data only after review.
- Keep raw user notes private until moderated.

## Quality Rule

Feedback should not immediately overwrite place facts.

Example:

- One user taps `restroom_closed_or_hard`.
- The app should flag the place for review.
- After confirmation, update `amenities.restroom` or add a temporary note.
