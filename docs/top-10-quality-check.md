# Top 10 Quality Check

This document tracks the first quality pass for the 10 places most useful for early parent testing.

The goal is not production verification yet. The goal is to decide which records are strong enough for a friend-and-family prototype, and what must be checked before beta.

## Method

This pass uses the current local seed data only.

Important limitation:

- Source URLs are present in the dataset, but this pass does not claim live official-page verification.
- Parent experience fields are not verified until a caregiver visit or trusted parent report confirms them.
- Baby care is intentionally `Not reported` until someone confirms changing tables, family restrooms, nursing-friendly spots, or quiet areas.
- User agreed to defer parent visits for now.
- Official recheck is planned separately in [docs/official-recheck-plan.md](official-recheck-plan.md).

## Status Labels

- `good_for_prototype`: useful enough for app UX testing.
- `needs_official_recheck`: check official pages before beta.
- `needs_parent_visit`: needs real caregiver confirmation.
- `too_weak_for_beta`: should not be included in beta until improved.

## Top 10 List

| Place | Category | Area | Prototype Status | Main Beta Gaps |
| --- | --- | --- | --- | --- |
| Stanford Shopping Center | Outdoor mall | Peninsula | `good_for_prototype` | Baby care, restroom details, parking/crowd reality |
| Magical Bridge Playground | Playground | South Bay | `good_for_prototype` | Baby care, shade/heat, crowd, stroller logistics |
| Mitchell Park | Park | South Bay | `good_for_prototype` | Baby care, parking stress, best arrival point |
| Baylands Nature Preserve | Park | South Bay | `good_for_prototype` | Stroller route, wind/exposure, parent route notes |
| Shoreline at Mountain View | Park | South Bay | `good_for_prototype` | Current playground/status notes, wind, route selection |
| Coyote Point Recreation Area | Park | Peninsula | `needs_official_recheck` | Vehicle fee, playground status, baby care, wind |
| Koret Children's Quarter and Carousel | Playground | San Francisco | `needs_official_recheck` | Carousel hours/fee, parking, baby care, crowd |
| Vasona Lake County Park | Park | South Bay | `needs_official_recheck` | Vehicle fee, train/activity status, route choice |
| Santana Row | Outdoor mall | South Bay | `good_for_prototype` | Baby care, restroom locations, crowds/parking |
| Central Park and Lake Elizabeth | Park | East Bay | `good_for_prototype` | Arrival point, route size, baby care, restroom spot check |

## Place Notes

### Stanford Shopping Center

Current strengths:

- Strong prototype fit for an easy stroller outing.
- `Best for: 6 mo+ / all ages` now reads correctly.
- Admission and reservation labels are clear.
- Food, restrooms, and stroller-friendly walking are plausible core values.

Needs official recheck:

- Parking fee/garage policy.
- Public restroom locations and operating assumptions.
- Whether official amenities mention family restrooms or nursing rooms.

Needs parent visit:

- Baby care facilities.
- Stroller comfort across the common walking loop.
- Crowd level at weekday morning vs weekend.
- Whether `Easy parking` feels true with a stroller.

Prototype decision:

- Keep in Top 10.

### Magical Bridge Playground

Current strengths:

- Strong playground anchor for the MVP.
- Official source coverage looks strong in the seed data.
- Notes already mention hot equipment, food rules, stroller parking, and closures.
- Best-for range `2-8 years` is appropriate for active playground use.

Needs official recheck:

- Current closure notices or rules.
- Restroom status and any posted playground guidance.

Needs parent visit:

- Baby care facilities.
- Shade and surface heat in real conditions.
- Whether stroller parking and entry flow feel easy.
- Crowd level and whether gates/supervision feel manageable.

Prototype decision:

- Keep in Top 10.

### Mitchell Park

Current strengths:

- Good park-plus-playground context.
- Free admission, restrooms, stroller-friendly, and picnic/walking-path tags make it easy to compare.
- Best-for all-ages wording is better than a narrow child-only range.

Needs official recheck:

- Restroom and parking details.
- Any park or playground closure notices.

Needs parent visit:

- Baby care facilities.
- Best arrival/parking area for families.
- Whether parking becomes stressful during library, sports, or weekend traffic.
- Whether parent notes should distinguish Mitchell Park from Magical Bridge more clearly.

Prototype decision:

- Keep in Top 10.

### Baylands Nature Preserve

Current strengths:

- Useful contrast against playground/mall outings.
- Notes correctly frame it as stroller/carrier walk, not play-first.
- Weather/exposure caveats are visible.
- Best-for all-ages wording is appropriate for a nature preserve.

Needs official recheck:

- Restroom locations/status.
- Any trail or preserve alerts.

Needs parent visit:

- Which short route works best with stroller or toddler.
- Whether paths are smooth enough for normal stroller wheels.
- Wind/shade reality.
- Whether `food_nearby: no` and seating notes feel accurate.

Prototype decision:

- Keep in Top 10, but do not overpromote as baby-easy in hot/windy weather.

### Shoreline at Mountain View

Current strengths:

- Strong stroller/walk/lake outing.
- Weather warnings about wind and exposure are useful.
- All-ages best-fit wording is appropriate.

Needs official recheck:

- Current park facilities and amenity status.
- Playground/Play Scow status if referenced in notes.
- Parking rules.

Needs parent visit:

- Best short family route.
- Wind reality and shade breaks.
- Restroom convenience from likely parking points.
- Whether stroller access is truly `yes` for the recommended family route.

Prototype decision:

- Keep in Top 10.

### Coyote Point Recreation Area

Current strengths:

- High-value regional family outing.
- Data already flags paid parking/vehicle fees and waterfront wind.
- Safety notes mention playground age zones and waterfront risks.

Needs official recheck:

- Vehicle entry fee and current posted rates.
- Playground renovation/status.
- Reservable facility vs normal family visit rules.
- CuriOdyssey or nearby attraction assumptions if mentioned later.

Needs parent visit:

- Baby care facilities.
- Which arrival point works best with stroller.
- Whether the outing is too large or spread out for a tired toddler.
- Wind and playground crowd reality.

Prototype decision:

- Keep in Top 10, but mark as `needs_official_recheck` before beta.

### Koret Children's Quarter and Carousel

Current strengths:

- Strong San Francisco anchor.
- Playground plus carousel is a useful family decision point.
- Notes already warn about carousel variability, layers, parking, and crowds.
- Best-for `2-8 years` is reasonable.

Needs official recheck:

- Carousel hours, weather/school schedule rules, and current fee.
- Restroom status.
- Any playground or Golden Gate Park facility updates.

Needs parent visit:

- Baby care facilities.
- Parking stress and best arrival strategy.
- Stroller flow around playground and carousel.
- Whether concrete slides/climbing structures need stronger safety notes.

Prototype decision:

- Keep in Top 10, but mark as `needs_official_recheck` before beta.

### Vasona Lake County Park

Current strengths:

- Strong larger park example.
- Vehicle fee is visible.
- Best-for all-ages wording is appropriate because the park works beyond young children.
- Parent notes already suggest choosing one main activity.

Needs official recheck:

- Vehicle entry fee/current rate.
- Train/activity availability if later surfaced.
- Trail or facility closures.

Needs parent visit:

- Baby care facilities.
- Best family parking/arrival point.
- Whether stroller access should be `partial` or more route-specific.
- Whether the recommended duration should change for a bigger outing.

Prototype decision:

- Keep in Top 10, but mark as `needs_official_recheck` before beta.

### Santana Row

Current strengths:

- Good outdoor mall contrast to Stanford.
- All-ages best-fit wording is appropriate.
- Good for stroller, food, and low-commitment outing use cases.
- Notes warn about weekend/evening crowds.

Needs official recheck:

- Parking policy.
- Public restroom assumptions.
- Event schedule implications if used for crowd notes.

Needs parent visit:

- Baby care facilities.
- Restaurant/restroom convenience.
- Stroller flow through busy corridors.
- Whether `parking: limited` feels right.

Prototype decision:

- Keep in Top 10.

### Central Park and Lake Elizabeth

Current strengths:

- Strong East Bay large-park example.
- Notes already warn about large park size and lake/bike path risks.
- Best-for all-ages wording is appropriate.

Needs official recheck:

- Restroom status and facility updates.
- Any lake/path/park alerts.
- Parking rules and best entrance.

Needs parent visit:

- Baby care facilities.
- Best pin or arrival point for stroller-friendly family use.
- Whether the full lake loop warning is strong enough.
- Which playground or short route should be recommended first.

Prototype decision:

- Keep in Top 10.

## Cross-Cutting Findings

Strong enough for prototype:

- Name, category, area, address, and source metadata are present.
- Admission/reservation labels are understandable.
- Best-for wording is now less likely to be mistaken for admission age limits.
- Parking fee labels are good enough for prototype comparison.

Not ready for beta:

- Baby care is unreported for all Top 10 places.
- Parent/caregiver notes need real visit confirmation.
- Exact parking/admission costs need official recheck for paid or mixed places.
- Large parks need better arrival-point guidance.
- Restroom convenience needs more than yes/unknown; distance and usability matter.

## Next Recommended Work

Before expanding the dataset:

1. Live-check official pages for Coyote Point, Koret, Vasona, Stanford, and Santana Row.
2. Pick 3 to 5 places for real parent visit checks.
3. Add a simple `arrival_tip` or improve `parent_notes.before_you_go` for large parks.
4. Add reviewed baby care reports when available.
5. Keep unknowns visible as `Not reported`, not as negative facts.
