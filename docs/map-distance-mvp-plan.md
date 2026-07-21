# Map And Distance MVP Plan

This plan keeps map work simple until the place data proves useful.

## Current State

The app currently supports:

- Place latitude and longitude.
- External directions links.
- No embedded map.
- No live location permission.
- No distance sorting.

This is the right MVP default.

## Recommended Next Step

Add distance only after the user confirms it matters in testing.

First distance version:

- Ask for location permission only when the user taps a clear control.
- Show approximate distance, not live tracking.
- Sort by distance only after permission is granted.
- Keep category/search filters working without location.
- Keep `Directions` as an external maps link.

Do not add:

- Background location.
- Visit detection.
- Route tracking.
- Embedded map markers.
- Saved home address.

## Why Not Embedded Maps Yet

Embedded maps add:

- API key setup.
- Billing risk.
- More UI complexity.
- Marker clustering decisions.
- Provider terms and quota concerns.

The current product risk is whether parents trust the place details, not whether the map is beautiful.

## Distance Data Shape

Future computed UI-only fields:

```ts
{
  distance_miles: number;
  distance_label: "0.8 mi";
  distance_source: "device_location";
}
```

Do not store live user location in Supabase for MVP.

## Permission Copy

Possible prompt-adjacent copy:

```text
Use your location to sort nearby family-friendly outings. Outdoor Nursery does not store your location.
```

## Implementation Phases

### Phase 1: External Directions Only

Status: current.

- Use latitude/longitude links.
- No permission prompts.
- No billing.

### Phase 2: Optional Distance Sort

Status: later.

- Add foreground location permission.
- Compute distance locally on device.
- Show distance labels on cards.
- Add `Nearest` filter.

### Phase 3: Embedded Map

Status: much later.

- Only consider after beta users ask for map browsing.
- Decide Google Maps vs Mapbox vs Apple-first approach.
- Add provider cost estimate before implementation.

## Quality Questions Before Building

Ask testers:

- Did you need distance before choosing a place?
- Did city/area labels feel good enough?
- Would distance change your decision?
- Did opening external directions feel natural?
- Would map browsing be better than list browsing?
