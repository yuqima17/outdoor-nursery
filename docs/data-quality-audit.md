# Data Quality Audit

This audit summarizes the current Bay Area seed dataset and what must improve before production launch.

Current dataset:

- File: [data/sample-places.json](../data/sample-places.json)
- Dataset version: `0.4.0`
- Places: 30
- Market: San Francisco Bay Area, CA
- Categories: 12 parks, 10 playgrounds, 8 outdoor malls

## Current Strengths

- Every place has an official or public source URL.
- Every place has address, coordinates, category, tags, and source metadata.
- Every place has caregiver-facing fields for age guidance, admission, parking fee, reservation, stroller access, restroom, shade, weather fit, and parent notes.
- User-facing labels now avoid unclear internal values like `mixed`.
- The dataset is good enough for prototype UX validation.

## Current Weaknesses

- All 30 places still have `caregiver_notes: needs_parent_verification`.
- All 30 places have `baby_care: not_reported`.
- All 30 places still keep `changing_table: unknown` as a specific sub-fact.
- 3 places have `restroom: unknown`.
- Parking fee labels are intentionally approximate, not exact verified dollar amounts.
- Reservation guidance assumes normal family visits and still needs official spot checks.
- Age guidance is useful for UX testing but has not been validated by parent visits.
- Shade, crowd, cleanliness, and stroller comfort are practical experience fields and need recent caregiver confirmation.

## Field Risk Levels

### Lower Risk

These can usually be verified from official or public sources:

- Place name
- Address
- City/area
- Category
- Coordinates
- Official URL
- General admission model
- Whether normal visits require a reservation
- Whether restrooms exist, when official pages say so

### Medium Risk

These may change, vary by entrance, or need current checks:

- Parking availability
- Parking fee or vehicle entry fee
- Restroom operating status
- Seasonal closures
- Food nearby
- Indoor backup
- Weather suitability
- Best time to visit

### High Risk

These should not be presented as strongly verified without parent visit or fresh user feedback:

- Baby care facilities, including changing table, family restroom, nursing-friendly spots, and quiet areas
- Stroller comfort
- Cleanliness
- Crowd level
- Shade quality from a baby/toddler perspective
- Toddler safety feel
- Whether kids actually enjoy the outing
- Maintenance issues
- Practical age fit

## Production Readiness Rules

Before a place is production-ready:

- Base details should be `official_verified` or equivalent.
- `restroom` should not be `unknown` for high-priority places.
- `baby_care` can remain `not_reported`, but the UI should treat it as not reported, not absent.
- `changing_table` should be treated as one baby-care sub-fact, not the whole category.
- Parking should include both availability and fee guidance.
- Reservation guidance should be checked against official pages.
- Caregiver notes should be reviewed by a real visit, trusted parent report, or repeated user feedback.
- Safety and avoid notes should mention obvious hazards such as water, traffic, bikes, heat, exposed trails, rough surfaces, or crowds.

## Recommended Next Data Pass

Prioritize the first 10 places that users are most likely to open:

1. Verify restroom and baby care status.
2. Check parking fee and reservation pages.
3. Confirm stroller notes from photos, maps, official accessibility details, or parent visit.
4. Improve age guidance where the current range feels too broad.
5. Add a short verified note with source and date.

Do not expand beyond 30 places until the top 10 feel trustworthy.
