# Data Trust Model

Outdoor Nursery needs field-level trust, not only place-level trust.

A place can have an official address but unverified stroller comfort. The app should keep those separate.

## Trust Levels

Use these levels for future backend records and admin review.

| Level | Meaning | Example |
| --- | --- | --- |
| `official_verified` | Confirmed from official city, county, park, venue, or mall source. | Official page lists restrooms or parking rules. |
| `third_party_verified` | Confirmed from a reputable third-party source or structured dataset. | Google Places identity or OpenStreetMap toilet tag. |
| `trusted_parent_report` | Confirmed by a known caregiver, tester, or team member. | Parent tester confirms stroller route and changing table. |
| `crowd_confirmed` | Multiple user feedback reports agree. | Several users report parking is hard on weekends. |
| `needs_verification` | Plausible but not verified enough for strong production language. | Seed-data parent note inferred from public info. |
| `unknown` | No reliable information yet. | Changing table status when no source or visit confirms it. |

## Field-Level Trust

Future database records should allow trust metadata per field or field group.

Example:

```json
{
  "field": "amenities.changing_table",
  "value": "yes",
  "trust_level": "trusted_parent_report",
  "source_type": "user_feedback",
  "source_id": "feedback_123",
  "verified_at": "2026-07-18",
  "expires_at": "2026-10-18"
}
```

## Suggested Trust By Field

| Field Group | Preferred Trust |
| --- | --- |
| Name, address, coordinates | `official_verified` or `third_party_verified` |
| Admission and reservation | `official_verified` |
| Parking availability and fee | `official_verified` plus `trusted_parent_report` |
| Restroom existence | `official_verified` or `trusted_parent_report` |
| Baby care facilities | `trusted_parent_report` or `crowd_confirmed` |
| Changing table sub-fact | `trusted_parent_report` or `crowd_confirmed` |
| Stroller comfort | `trusted_parent_report` or `crowd_confirmed` |
| Shade, crowd, cleanliness | `trusted_parent_report` or `crowd_confirmed` |
| Age guidance | `trusted_parent_report`, then refined by feedback |
| Parent notes and avoid notes | `trusted_parent_report` with admin review |

## Expiration Rules

Some facts age quickly.

Suggested review windows:

- Parking fees: 90 days
- Reservation requirements: 90 days
- Restroom availability: 90 days
- Baby care facilities: 180 days
- Changing table sub-fact: 180 days
- Stroller comfort: 180 days
- Shade/crowd/cleanliness notes: 90 days
- Address/coordinates: 365 days

If a field expires, do not remove it automatically. Mark it for review and soften the UI language if needed.

Official recheck work should follow [docs/official-recheck-plan.md](official-recheck-plan.md).

## UI Language By Trust

Use stronger language for verified facts:

- `Restrooms available`
- `No reservation needed`
- `Parking is usually free`

Use softer language for uncertain or experience-based facts:

- `Check restroom status before leaving`
- `Parking may be limited`
- `Stroller works in some areas`
- `Parent verification needed`

## MVP Rule

The current local prototype can keep simple `data_quality` fields, but the backend should move toward field-level trust before public launch.

## Vote-Informed Cards

Paired quick feedback can help decide which facts deserve more prominence on place cards, but vote totals are signals, not facts. Future card updates should use thresholds and admin review before changing public summaries, for example:

- Repeated `parking_was_hard` votes can surface a parking caution.
- Repeated `stroller_was_hard` votes can soften stroller-friendly language.
- Repeated `restroom_was_hard` or `needs_cleaning` votes can move restroom or cleanliness details higher on the card.
- Repeated `good_value` or `felt_pricey` votes can adjust value language after review.
