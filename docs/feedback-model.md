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
- `stroller_was_hard`
- `restroom_was_hard`
- `baby_care_missing`
- `too_crowded`
- `long_wait`
- `felt_pricey`
- `needs_cleaning`
- `needs_maintenance`
- `info_changed`

MVP quick feedback is displayed as paired votes in the app:

| Topic | Positive | Negative |
| --- | --- | --- |
| Parking | Easy parking | Parking was hard |
| Stroller | Stroller worked | Stroller was hard |
| Restroom | Restroom was easy | Restroom was hard |
| Baby care | Baby care helped | Baby care missing |
| Crowd | Crowd was okay | Too crowded |
| Cleanliness | Clean enough | Needs cleaning |
| Value | Good value | Felt pricey |

Other feedback labels kept for later/admin use:

- `Changing table available`
- `Family restroom available`
- `Good nursing spot`
- `Long wait`
- `Kid loved it`
- `Good value`
- `Felt pricey`
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

Current prototype behavior:

- User taps one side of a paired quick feedback vote.
- The selected button state is stored locally on the device.
- When Supabase is configured, selecting a side calls `submit_feedback_vote`.
- `feedback_votes` stores the current vote for one anonymous device, place, and topic.
- `feedback` stores append-only history for admin review.
- The app reads public aggregate counts through `get_feedback_vote_counts`.
- The database stores stable snake-case feedback codes, not display labels.
- The original button label is stored in `metadata.feedback_label`.
- Choosing the other side of the same pair updates that device's current vote in `feedback_votes`.
- Tapping the selected side again clears that device's current vote for the topic through `clear_feedback_vote`.
- Choosing the other side does not delete backend history from `feedback`.
- No account is required.
- No public display of feedback is required.
- Remote insert errors are silent in the MVP so the outing screen does not feel fragile.

Current insert payload:

```json
{
  "place_id": "string",
  "device_id": "anonymous device id",
  "feedback_type": "easy_parking",
  "source": "quick_feedback",
  "metadata": {
    "app_version": "0.1.0",
    "feedback_label": "Easy parking",
    "interaction": "quick_feedback_select",
    "platform": "expo",
    "submitted_from": "place_detail"
  }
}
```

Current vote payload:

```json
{
  "place_id": "string",
  "device_id": "anonymous device id",
  "vote_topic": "Parking",
  "feedback_type": "easy_parking",
  "feedback_label": "Easy parking",
  "app_version": "0.1.0",
  "metadata": {
    "interaction": "paired_feedback_vote",
    "platform": "expo",
    "submitted_from": "place_detail"
  }
}
```

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
