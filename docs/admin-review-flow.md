# Admin Review Flow

User feedback should improve the dataset, but it should not directly overwrite public place facts.

The admin review flow exists to protect parents from stale, wrong, or one-off information.

## Review Sources

Items can enter review from:

- User quick feedback buttons.
- User text notes.
- Admin manual edits.
- Official source re-checks.
- Future API or open-data ingestion jobs.
- Expired field verification dates.

## Review Item Shape

Future backend review items should include:

```json
{
  "id": "review_123",
  "place_id": "place_123",
  "field_path": "amenities.restroom",
  "proposed_value": "yes",
  "current_value": "unknown",
  "reason": "Multiple users reported restroom was easy.",
  "source_type": "user_feedback",
  "source_ids": ["feedback_1", "feedback_2"],
  "priority": "low | medium | high",
  "status": "new | in_review | approved | dismissed | needs_more_info",
  "created_at": "2026-07-18T00:00:00Z",
  "reviewed_at": null,
  "reviewed_by": null
}
```

## Priority Rules

### High Priority

Review quickly:

- Safety hazards.
- Closed facilities.
- Restrooms not available when the app says they are.
- Reservation required when the app says no reservation.
- Paid parking or admission when the app says free.
- Multiple recent reports disagree with a published fact.

### Medium Priority

Review during regular data passes:

- Parking is harder than expected.
- Stroller access is worse than listed.
- Baby care facility details are reported, such as changing table, family restroom, nursing spot, or quiet area.
- Maintenance issues.
- Age guidance feels wrong.
- Crowd or wait patterns changed.

### Low Priority

Use for product/content tuning:

- Kid loved it.
- Good value.
- Crowd was okay.
- Small wording improvements.
- Duplicate or vague feedback.

## Admin Actions

Admins can:

- Approve a proposed field update.
- Dismiss weak or duplicate feedback.
- Convert feedback into a parent note.
- Mark a field as `needs_verification`.
- Request more reports before changing a fact.
- Add or update source attribution.
- Set a new verification date and expiration window.

## Example: Restroom Feedback

1. User taps `Restroom was easy`.
2. Feedback record is saved.
3. If enough reports agree, create a review item for `amenities.restroom`.
4. Admin checks official source or trusted parent note.
5. Admin approves `restroom: yes`.
6. Field trust becomes `trusted_parent_report` or `crowd_confirmed`.
7. Public place detail updates after approval.

## Example: Info Changed

1. User taps `Info changed`.
2. App asks for optional note.
3. Review item is created immediately because the issue is ambiguous.
4. Admin checks whether it affects admission, parking, reservation, restrooms, or safety.
5. Admin updates the affected field or dismisses the report.

## MVP Admin Tool

The first admin tool can be very simple:

- A table of review items.
- Place name and field path.
- Current value and proposed value.
- Source feedback count.
- Source links.
- Approve / dismiss / needs more info buttons.

No complex dashboard is needed before beta.
