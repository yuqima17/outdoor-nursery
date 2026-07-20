# Seed Data Guide

This guide explains how to add and review places for the first Outdoor Nursery dataset.

## Goal

Seed data should help validate the product experience before the app has a full backend or automated data ingestion.

The goal is not to collect every possible place. The goal is to create a small set of places with enough caregiver-specific information to make the frontend useful.

## First Dataset

Use [data/sample-places.json](../data/sample-places.json) as the first seed file.

Recommended first target:

- 30 to 50 places total.
- One U.S. metro area.
- Three categories: `park`, `playground`, and `outdoor_mall`.
- Official source URL for every place when possible.
- Honest `unknown` values instead of guesses.

## How To Choose Places

Prioritize places that are likely to answer real parent needs:

- Easy stroller outing.
- Short toddler walk.
- Strong playground anchor.
- Bathrooms nearby.
- Shade or weather backup.
- Food nearby.
- Easy parking.
- Worth a weekend trip.
- Good for visitors who do not know the area.

Avoid adding places just because they are popular. A famous place with poor toddler logistics may still be useful, but only if the notes clearly explain the tradeoff.

## Field Judgement Rules

### `stroller_friendly`

- `yes`: mostly paved, smooth, or easy stroller paths.
- `partial`: some stroller-friendly areas, but also sand, grass, stairs, steep slopes, rough trails, or restricted stroller zones.
- `no`: stroller use would be difficult for the core outing.
- `unknown`: not confirmed by source or visit.

### `restroom`

- `yes`: official source confirms restrooms.
- `seasonal`: restrooms may only operate seasonally or during facility hours.
- `no`: official source or visit confirms no restroom.
- `unknown`: not confirmed.

### `baby_care`

Use `not_reported` unless a reliable source, parent visit, or reviewed user report confirms the details.

Baby care facilities are broader than changing tables. Track changing tables, family restrooms, nursing-friendly spots, quiet areas, and other low-age caregiving support.

Do not display unconfirmed baby care as absent. Use `Baby care: Not reported` until details are verified.

### `changing_table`

Keep this as a specific baby-care sub-fact. Use `unknown` or `not_reported` unless a reliable source or parent visit confirms it.

### `parking`

- `easy`: dedicated parking is available and usually not the main stress point.
- `limited`: parking exists but may fill, be street-based, or require planning.
- `paid`: parking or vehicle entry usually costs money.
- `street`: mainly street parking.
- `unknown`: not confirmed.

### `shade`

- `good`: shade is a major strength of the outing.
- `partial`: some shade exists, but users should still prepare for sun.
- `limited`: mostly exposed.
- `unknown`: not confirmed.

### `age_fit`

Use practical fit, not strict rules:

- `baby`: good for stroller walks, shade, nursing/rest breaks, or calm outdoor time.
- `toddler`: safe enough for short walks, simple play, and close supervision.
- `preschool`: better for more active play, climbing, or longer attention spans.

## Caregiver Notes

Good notes sound like one parent helping another.

Useful notes:

- "Best in the morning before the playground gets hot."
- "Bring layers because the waterfront gets windy."
- "Stroller works for the main loop, but not every side path."
- "Check playground closure notices before leaving."
- "Parking is easier if you arrive before lunch."

Weak notes:

- "Great place for families."
- "Beautiful park."
- "Kids love it."
- "Highly rated."

## Verification Status

Each place has a `data_quality` block:

```json
{
  "base_details": "official_source",
  "caregiver_notes": "needs_parent_verification"
}
```

Use `official_source` when the address, amenities, or base facts come from an official city, county, park, or venue page.

Use `needs_parent_verification` until a caregiver has visited recently or a trusted parent source has confirmed the practical outing details.

## Do Not Copy Reviews

Do not copy review text from Google, Yelp, blogs, or social media.

It is okay to use public information to identify a place, but Outdoor Nursery's caregiver notes should be first-party writing based on official information, personal visits, or explicit user submissions.

## Before A Place Goes To Production

Check:

- Address is correct.
- Coordinates are close enough for navigation.
- Official URL still works.
- Restroom status is not guessed.
- Stroller notes are specific.
- Safety notes mention water, traffic, bikes, steep paths, heat, or crowds when relevant.
- `last_verified_at` is current.
- Unknowns are still marked honestly.
