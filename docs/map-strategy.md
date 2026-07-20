# Map Strategy

The MVP should avoid embedded map complexity.

## Recommendation

Start with external directions links only.

For each place, generate a maps URL from the address or coordinates:

```text
https://www.google.com/maps/search/?api=1&query={latitude},{longitude}
```

This is enough for the first prototype because users mainly need to compare places and then navigate.

## Why Not Embedded Map Yet

Embedded maps add cost and implementation complexity:

- API keys
- Billing setup
- Mobile layout edge cases
- Marker clustering
- Permission prompts
- Provider terms

The MVP's core risk is content usefulness, not map rendering.

## Later Options

Possible providers:

- Google Maps Platform
- Mapbox
- Apple Maps links on iOS
- OpenStreetMap-based rendering

## Future Map Features

- Nearby search.
- Distance from current location.
- Place markers.
- Route preview.
- Stroller-friendly path overlays.
- Parking entrance hints.

These should come after the first user tests confirm that the place data and detail pages are useful.

