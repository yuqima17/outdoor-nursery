# Official Recheck Plan

This plan defines the official-source checks needed before beta.

It does not execute the checks yet. It creates the queue, fields, and result format so the work can be done consistently later.

## Current Decision

- Parent visits are deferred until later.
- Official recheck is planned but not executed.
- Backend remains later.
- Unknown caregiver details should stay visible as `Not reported` or soft guidance.

## Why Official Recheck Matters

Some fields can materially change a family outing:

- Admission or vehicle entry fee.
- Parking cost.
- Reservation requirements.
- Public restroom availability.
- Facility or playground closure.
- Carousel, train, water play, or seasonal activity status.
- Mall hours, event schedules, or garage policies.

These fields should be rechecked against official sources before beta.

## Recheck Queue

| Place | Priority | Fields To Recheck | Why |
| --- | --- | --- | --- |
| Coyote Point Recreation Area | High | Vehicle fee, parking fee, playground status, restroom, reservation/facility rules | Fee/status affects outing decisions. |
| Koret Children's Quarter and Carousel | High | Carousel hours, carousel fee, restroom, parking, facility status | Hours and fees can vary. |
| Vasona Lake County Park | High | Vehicle fee, parking fee, train/activity status, restroom, closures | County fees and seasonal activity status matter. |
| Stanford Shopping Center | Medium | Parking policy, restroom locations, baby care, mall hours | Mall amenities affect baby outings. |
| Santana Row | Medium | Parking policy, restroom locations, baby care, event schedule | Crowds/events affect stroller outings. |
| Magical Bridge Playground | Medium | Closure notices, current rules, restroom, playground guidance | Playground rules and heat/closure guidance matter. |
| Shoreline at Mountain View | Medium | Facility status, playground/Play Scow status, restroom, parking rules | Notes mention specific amenities that may change. |
| Mitchell Park | Low | Restroom, parking, park/playground closure notices | Good prototype record, but beta still needs source freshness. |
| Baylands Nature Preserve | Low | Restroom, trail/preserve alerts, parking, source freshness | Exposure/trail conditions are relevant but less fee-sensitive. |
| Central Park and Lake Elizabeth | Low | Restroom, parking, facility updates, entrance/arrival guidance | Large park needs source freshness and arrival guidance. |

## Field Paths

Use these field paths when recording recheck results:

- `cost.label`
- `cost.price_level`
- `cost.note`
- `amenities.parking`
- `amenities.parking_fee.label`
- `amenities.parking_fee.note`
- `reservation.required`
- `reservation.note`
- `amenities.restroom`
- `amenities.baby_care`
- `parent_notes.before_you_go`
- `parent_notes.safety_notes`
- `parent_notes.avoid_notes`
- `source.urls`
- `source.last_verified_at`

## Result Record

When a field is checked, record the result like this:

```json
{
  "place_id": "coyote-point-recreation-area-san-mateo",
  "field_path": "amenities.parking_fee",
  "checked_at": "2026-07-18",
  "source_url": "https://official-source.example",
  "old_value": "$ parking",
  "new_value": "$ parking",
  "confidence": "official_verified",
  "notes": "Vehicle entry or parking fee applies. Exact amount should only be displayed after confirming current posted rate."
}
```

## Result Status

Use one of these result statuses:

- `confirmed`: current value matches official source.
- `updated`: value changed after recheck.
- `not_found`: official source did not answer the field.
- `needs_parent_report`: official source cannot answer the practical caregiver question.
- `needs_follow_up`: source is ambiguous or points to another page.

## Recheck Rules

- Do not add exact dollar amounts unless the official source clearly states a current rate.
- Do not mark baby care as available or unavailable unless the source explicitly says so.
- If the official source does not mention baby care, keep `Baby care: Not reported`.
- If a field affects safety, cost, reservation, or restroom availability, prefer soft UI language until verified.
- Update `source.last_verified_at` only after a real recheck is completed.

## Suggested Order

1. Coyote Point Recreation Area.
2. Koret Children's Quarter and Carousel.
3. Vasona Lake County Park.
4. Stanford Shopping Center.
5. Santana Row.
6. Magical Bridge Playground.
7. Shoreline at Mountain View.
8. Mitchell Park.
9. Baylands Nature Preserve.
10. Central Park and Lake Elizabeth.

## After Recheck

After official recheck is completed:

- Update the affected place fields.
- Update `source.last_verified_at`.
- Add or update field-level trust metadata when the backend exists.
- Keep parent experience fields separate from official facts.

