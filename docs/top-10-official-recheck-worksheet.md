# Top 10 Official Recheck Worksheet

This worksheet prepares the official-source recheck for the first 10 prototype places.

Do not use this as proof that a place is production-ready. Each row needs a fresh official-source pass before beta.

## How To Use

For each place:

1. Open the official source URL from `data/sample-places.json`.
2. Check the fields below.
3. Update `data/sample-places.json` if needed.
4. Regenerate `supabase/seed.sql`.
5. Run the seed file in Supabase.

Required command after data changes:

```bash
node scripts/generate-supabase-seed.js
```

## Fields To Recheck

Official-source fields:

- Address.
- Admission or entrance fee.
- Parking fee.
- Reservation requirement.
- Restroom availability.
- Closure notices.
- Hours or seasonal limits.
- Official source URL still works.

Caregiver fields that still need parent confirmation:

- Baby care facilities.
- Stroller comfort.
- Shade reality.
- Crowd level.
- Best arrival point.
- Practical route notes.

## Top 10 Worksheet

| Place | Official URL Check | Admission | Parking Fee | Reservation | Restroom | Closure/Hours | Baby Care | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Stanford Shopping Center | todo | todo | todo | todo | todo | parent_needed | parent_needed | Check restrooms/family amenities if official site lists them. |
| Magical Bridge Playground | todo | todo | todo | todo | todo | todo | parent_needed | Check rules, closures, food/water guidance, restroom status. |
| Mitchell Park | todo | todo | todo | todo | todo | todo | parent_needed | Check park/restroom source and parking assumptions. |
| Baylands Nature Preserve | todo | todo | todo | todo | todo | todo | parent_needed | Check alerts, restroom locations, trail notes. |
| Shoreline at Mountain View | todo | todo | todo | todo | todo | todo | parent_needed | Check current playground/status notes and facility pages. |
| Coyote Point Recreation Area | todo | todo | todo | todo | todo | todo | parent_needed | Vehicle fee and playground status are beta blockers. |
| Koret Children's Quarter and Carousel | todo | todo | todo | todo | todo | todo | parent_needed | Check carousel fee/hours and playground status. |
| Vasona Lake County Park | todo | todo | todo | todo | todo | todo | parent_needed | Check vehicle fee, train/activity status, and park alerts. |
| Santana Row | todo | todo | todo | todo | todo | parent_needed | parent_needed | Check parking policy and restroom/family amenity info. |
| Central Park and Lake Elizabeth | todo | todo | todo | todo | todo | todo | parent_needed | Check official park page, restrooms, and arrival point. |

## Result Labels

Use these labels in notes:

- `official_confirmed`: confirmed from official source.
- `official_changed`: current seed data needs update.
- `not_found`: official source does not mention this field.
- `parent_needed`: cannot be verified from official source.
- `beta_blocker`: should be fixed before wider testing.

## Suggested Order

Start with:

1. Stanford Shopping Center.
2. Magical Bridge Playground.
3. Coyote Point Recreation Area.
4. Koret Children's Quarter and Carousel.
5. Vasona Lake County Park.

Reason:

- Stanford is likely a common first test place.
- Magical Bridge is a high-value playground anchor.
- Coyote Point, Koret, and Vasona have fee/activity/status details that are easy to get wrong.
