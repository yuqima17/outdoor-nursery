# Quality Check

This file lists what needs human review before moving from planning/data into frontend implementation.

## Done

- MVP product scope documented.
- Frontend requirements documented.
- Low-fidelity wireframes documented.
- Feedback model documented.
- Map strategy documented.
- Lightweight system design documented.
- Seed data expanded to 30 Bay Area places.
- Expo + React Native app skeleton created.
- First mobile prototype implemented.
- JSON syntax validated.
- Required field check passed.
- TypeScript check passed.
- Peer dependency check passed.
- Expo config check passed.
- Expo SDK is pinned to 54 for Expo Go compatibility.
- Missing `babel-preset-expo` red-screen issue fixed and validated with an iOS Metro export.
- User confirmed Bay Area as the first city/market.
- User confirmed `park`, `playground`, and `outdoor_mall` as first categories.
- User confirmed the current card/detail information direction is enough for MVP.
- User reviewed the first phone build and confirmed Home is understandable, flow order feels right, card content is useful, and detail sections are necessary.

## Seed Data Status

Current file:

- [data/sample-places.json](../data/sample-places.json)

Current count:

- 30 total places
- 12 parks
- 10 playgrounds
- 8 outdoor malls

Target count:

- 30 places before the first richer demo

## Needs User Review

### First Phone QA Notes

Reviewed on a real phone on 2026-07-18.

Confirmed:

- Home page is understandable.
- Home page order feels natural.
- Home page density is acceptable and not too crowded.
- Place card content is useful enough.
- Detail page content is strong overall.
- Detail sections are necessary for caregiver decision-making.

Follow-up adjustments from the first QA pass:

- Add more baby and children visual elements so the app feels more clearly family-oriented. Status: implemented in Home hero cues, needs second phone QA.
- Fix Best for display on place cards; card and detail should now match. Status: implemented, needs second phone QA.
- Refine stroller-related copy. `Bring stroller` can sound mandatory, but older children may walk. Status: UI guidance implemented, needs second phone QA.

### Second Phone QA Checklist

Check after the second-pass polish:

- Home has a little more baby/children warmth without feeling too cute or noisy.
- Best for no longer truncates awkwardly on place cards.
- Card Best for and detail Best for show the same range.
- Stroller wording feels like guidance, not an instruction.
- Quick feedback buttons on the detail page can be selected and unselected.
- Admission labels are clearer than raw values like `mixed`.
- Parking includes a fee/cost cue, even when exact dollar amounts are not verified yet.
- Reservation guidance is visible before a family decides to go.
- Quick feedback options feel natural for U.S. parents and caregivers.
- Detail age guidance is more useful than the compact card label and does not overpromise precision.
- Outdoor malls, parks, and other all-ages places do not look restricted to young children.
- Search, category chips, filter chips, save/unsave, and directions still work.

### Mobile Prototype

Review the app on a phone or simulator.

Check:

- Does the home screen feel immediately understandable?
- Are place cards too dense?
- Is the detail page useful or too long?
- Are the filters the right first set?
- Does save/unsave feel natural?
- Does the visual style feel close enough to the soft family-friendly direction?
- Should outdoor malls look visually different from parks/playgrounds?

### Product Direction

Confirmed:

- MVP should stay Bay Area first.
- First categories are `park`, `playground`, and `outdoor_mall`.
- Outdoor malls belong in the first release as practical backup outings for parents.

### Place Cards

Review whether the frontend card fields feel right:

- Name
- Category and area
- Tags
- Age fit
- Parking
- Restroom
- Weather note
- Directions
- Details

Question:

> Can a parent compare places from the card without opening every detail page?

### Place Detail

Review whether the detail page sections answer the real outing questions:

- Basic info
- Before you go
- Parent notes
- Safety notes
- Avoid notes
- Source and freshness
- Quick feedback

Question:

> Does this page help a tired parent decide whether to leave home?

### Data Quality

Review these fields carefully:

- `age_fit`
- `amenities.stroller_friendly`
- `amenities.parking`
- `amenities.shade`
- `parent_notes`
- `safety_notes`
- `avoid_notes`

Many caregiver notes are marked `needs_parent_verification`. That is acceptable for the prototype, but not acceptable for production. The product should later let users submit corrections and fresh caregiver notes, with review before public facts change.

Current audit summary:

- 30/30 places have source URLs.
- 30/30 places have `base_details: official_source`.
- 30/30 places still have `caregiver_notes: needs_parent_verification`.
- 30/30 places have `baby_care: not_reported`.
- 30/30 places keep `changing_table: unknown` as a sub-fact.
- 3/30 places have `restroom: unknown`.
- Parking fee and reservation labels are suitable for prototype review, but should be spot-checked before beta.

Top 10 QA:

- See [docs/top-10-quality-check.md](top-10-quality-check.md).
- All Top 10 are useful enough for prototype testing.
- Coyote Point, Koret Children's Quarter, and Vasona need official rechecks before beta because fees, hours, or facility status can materially affect the outing.
- All Top 10 need parent visit confirmation for baby care and practical caregiver notes.
- Parent visits are intentionally deferred for now.
- Official recheck is planned in [docs/official-recheck-plan.md](official-recheck-plan.md), but not executed yet.

### Coordinates

Coordinates are good enough for prototype mapping links but should be checked before production.

Quality check should confirm:

- Pin lands near the correct entrance or useful arrival point.
- For large parks, pin should be near the stroller-friendly entrance or main family destination.
- If a park has multiple entrances, add arrival guidance in `parent_notes.before_you_go`.

## Blocked

### Device QA

Blocked until the app is run on a real target.

Reason:

Typecheck confirms code shape, but mobile layout still needs visual testing.

Expo dev server smoke test did not fully complete in the Codex sandbox because `expo start` entered non-interactive port handling after reporting a port prompt. Running from a normal local terminal should be the next check.

Open question:

- Should the first run target Expo Go on a physical phone, iOS simulator, Android emulator, or all three?

### API Integrations

Blocked until after frontend prototype.

Reason:

The first app can use local JSON. Google Places, OpenStreetMap, and weather integration should wait until the frontend proves which fields actually matter.

## Recommended Next Quality Check Pass

1. Read the Home and Place Detail sections in [docs/frontend-requirements.md](frontend-requirements.md).
2. Read [docs/wireframes.md](wireframes.md).
3. Open [data/sample-places.json](../data/sample-places.json) and scan 5 to 8 places.
4. Mark any place that feels weak, wrong, or not useful.
5. Run the mobile app prototype and note visual/UX issues.
