# Frontend Requirements

This document defines the first mobile app prototype for Outdoor Nursery.

The prototype should be built as a mobile app and powered by local seed data from [data/sample-places.json](../data/sample-places.json).

## Recommended Stack

- Expo
- React Native
- TypeScript

This keeps the product in the React ecosystem while making the first prototype feel like a real phone app. It also leaves room to run on iOS, Android, or Expo Go without committing to native Swift/Kotlin development.

## Product Goal

Help a caregiver quickly answer:

> "Where can I take my baby or toddler today, and what should I expect?"

## First Version Constraints

- Mobile app first.
- English U.S. product copy.
- Local JSON data only.
- No backend.
- No account system.
- No embedded map.
- Directions open in Google Maps or Apple Maps.
- Saves and quick feedback can live in local state or local storage.

## Navigation

Primary tabs:

- `Go`
- `Saved`
- `Profile`

The `Go` tab is the main experience.

## Home Page

Purpose: help users start quickly.

Required elements:

- Location selector showing the active metro area.
- Search bar with placeholder: `Search parks, playgrounds, malls`.
- Category shortcuts:
  - `Parks`
  - `Playgrounds`
  - `Outdoor Malls`
- Filter chips:
  - `Recommended`
  - `Nearest`
  - `Free`
  - `Stroller-friendly`
  - `Restrooms`
  - `Shade`
- Recommended place list.

### Home Card Fields

Each recommended place card should show:

- Place image or placeholder color block.
- Place name.
- Category and area.
- Distance placeholder if geolocation is not enabled.
- 3 to 5 tags.
- Best-for age fit.
- Admission summary.
- Parking summary.
- Stroller summary.
- Restroom summary.
- Baby care summary.
- Weather note, shortened to one line.
- `Directions` action.
- `Details` action.

## Category List Page

Purpose: compare places within one category.

Required elements:

- Category title.
- Count of available places.
- Sort/filter chips.
- Place cards using the same data hierarchy as Home.

The first prototype can implement category filtering entirely in frontend state.

## Place Detail Page

Purpose: help users decide whether the outing will work.

Required sections:

- Hero area:
  - Place name
  - Category
  - Area
  - Top tags
  - Save button
- Basic info grid:
  - Best-for age fit
  - Cost
  - Visit duration
  - Weather fit
  - Parking
  - Restroom
- Before You Go:
  - Stroller
  - Restroom/baby care
  - Parking
  - Shade
  - Food nearby
- Parent Notes:
  - Best time
  - Before-you-go checklist
  - What to bring
  - Safety notes
  - Avoid notes
- Source and freshness:
  - Last verified date
  - Data quality label
- Quick feedback:
  - Good parking
  - Parking hard
  - Stroller easy
  - Restroom convenient
  - Too crowded
  - Great for toddlers
  - Shade was limited
  - Info changed

## Saved Page

Purpose: show places the user saved.

MVP behavior:

- If no saved places, show a simple empty state.
- If saved places exist, use the same place card component.
- No account sync.

## Profile Page

Purpose: keep navigation stable while account features are deferred.

MVP behavior:

- Show placeholder sections:
  - Child age preferences
  - Favorite filters
  - Feedback history

These sections do not need to be functional in the first prototype.

## Filtering Rules

The frontend can filter local data with simple rules:

- `Free`: `cost.type` is `free`.
- `Stroller-friendly`: `amenities.stroller_friendly` is `yes`.
- `Restrooms`: `amenities.restroom` is `yes` or `seasonal`.
- `Shade`: `amenities.shade` is `good` or `partial`.
- `Parks`: `category` is `park`.
- `Playgrounds`: `category` is `playground`.
- `Outdoor Malls`: `category` is `outdoor_mall`.

## Empty States

Empty states should be practical:

- `No places match these filters yet. Try removing one filter.`
- `No saved places yet. Save a place when you find one you want to try.`

## Copy Tone

Use plain parent-to-parent language.

Good examples:

- `Best in the morning`
- `Bring layers`
- `Parking can be tight`
- `Good stroller walk`
- `Check restroom status before leaving`
- `Stroller works here`
- `Stroller optional`

Avoid generic travel language:

- `Must-see destination`
- `Perfect for everyone`
- `Hidden gem`
- `Highly rated`

Avoid wording that makes one family setup sound mandatory:

- Use `Stroller works here` instead of `Bring stroller` when stroller access is available but not required.
- Use age-aware guidance where possible, because older children may prefer walking.

## Prototype Acceptance Criteria

The mobile prototype is good enough when:

- A user can open the home page and understand the app within 10 seconds.
- A user can compare at least 5 places without opening every detail page.
- The detail page makes stroller/restroom/parking/shade tradeoffs obvious.
- Unknown data does not look like confirmed data.
- Directions open a maps URL.

## Second-Pass UI Notes

From first phone QA:

- Add more baby and children visual cues to the Home page and overall art direction.
- Fix Best for text truncation in place cards.
- Keep detail sections, but refine stroller wording so it reads as guidance, not an instruction.
