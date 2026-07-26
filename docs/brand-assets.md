# Brand Assets

Outdoor Nursery now has first-pass generated brand assets for prototype review.

These are draft assets, not final App Store assets.

## Asset Files

| Asset | Path | Current use | Status |
| --- | --- | --- | --- |
| App icon | `assets/icon.png` | Referenced by `app.json` as `expo.icon` and Android adaptive icon foreground | draft |
| Splash image | `assets/splash.png` | Referenced by `app.json` as `expo.splash.image` | draft |
| Home hero | `assets/home-hero.png` | Used on the Home screen hero card | needs phone QA |
| Visual asset board | `assets/visual-asset-board.png` | Reference only for future icons/empty states | concept only |

## Direction

The visual direction is:

- mint and teal base
- sunshine yellow warmth
- cream path / outdoor calm
- small coral accents
- soft 3D / flat-hybrid illustration
- parent-friendly and trustworthy
- kid-aware but not overly childish

## Prompt Summaries

App icon:

- stroller on a winding outdoor path
- leaf and sun cues
- rounded-square mobile icon
- simple silhouette
- no text

Splash:

- centered stroller/path/sun/leaf mark
- pale mint background
- calm negative space
- no text

Home hero:

- Bay Area-inspired park walkway
- caregiver, stroller, and small child
- playground and plaza hints
- wide hero image with room for app copy
- warm, practical family outing mood

Visual asset board:

- category icon concepts for parks, playgrounds, outdoor malls
- empty-state concepts for saved places and no matches
- badge concepts for stroller, restroom, parking, baby care
- reference only, not final individual icons

## Before TestFlight

- Refine app icon into a simpler final icon that reads well at small sizes.
- Confirm splash behavior in a real EAS/TestFlight build.
- Consider reducing Home hero file size if bundle size matters.
- Generate separate final category and empty-state assets instead of cropping the concept board.
- Confirm the style still feels suitable after friend testing.
