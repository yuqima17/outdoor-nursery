# App Store Screenshot Checklist

Last updated: August 12, 2026

This checklist is for preparing public App Store screenshots for Outdoor Nursery. Use the final TestFlight or production candidate build, not Expo Go and not a development client.

## Apple Requirements

- Screenshots are required for the public App Store listing.
- Apple accepts one to 10 screenshots per device display size.
- Upload `.jpg`, `.jpeg`, or `.png` files.
- Screenshots cannot have alpha channels or transparency.
- For an iPhone-only app, start with iPhone 6.9-inch portrait screenshots. App Store Connect can scale accepted screenshots for smaller iPhone displays in many cases.
- If App Store Connect asks for another required display size, add that size before submitting.

Useful current iPhone portrait sizes:

| Display size | Portrait sizes Apple accepts |
| --- | --- |
| 6.9-inch | `1260 x 2736`, `1290 x 2796`, or `1320 x 2868` |
| 6.5-inch | `1284 x 2778` or `1242 x 2688` |
| 6.1-inch | `1170 x 2532`, `1125 x 2436`, or `1080 x 2340` |

## Capture Rules

- Capture from the TestFlight app when possible.
- Do not capture Expo Go, Safari, developer menus, debug overlays, QR screens, or red error screens.
- Do not show `Dev`, `Supabase`, `beta`, `prototype`, or internal diagnostics in public screenshots.
- Use light mode.
- Use default text size.
- Avoid low battery screenshots.
- Avoid personal notifications.
- Use realistic saved state, but do not show private email, phone number, Apple ID, or internal credentials.
- Keep the first screenshot focused on what the app does, not on settings or Profile.

## Recommended Screenshot Set

Minimum useful public set: 5 screenshots.

1. Home screen.
   - Show the hero, search, category filters, and the start of the place list.
   - Purpose: immediately explains that this is a Bay Area outing finder.

2. Place list with cards.
   - Show several place cards with the simple category logo thumbnails.
   - Purpose: shows fast comparison across age, admission, parking, stroller, restroom, and baby-care fields.

3. Place detail top.
   - Show the detail hero card, directions/save actions, Basic Info, and Family fit notes.
   - Purpose: shows the app is practical and parent-oriented.

4. Place detail before-you-go.
   - Show admission, parking fee, reservation, restroom/baby-care, stroller, food, or parent notes.
   - Purpose: shows the app helps decide before leaving home.

5. Quick feedback voting.
   - Show the paired vote controls after a user has selected one or two options.
   - Purpose: shows anonymous parent feedback and community improvement.

Optional 6th screenshot:

6. Saved tab.
   - Show saved places.
   - Purpose: shows planning and revisit value.

## Optional Caption Copy

If we add marketing text around the screenshots later, use short captions like these:

1. Find low-stress outings nearby.
2. Compare the details parents check first.
3. Know the fit before you go.
4. See parking, restroom, and stroller notes.
5. Vote on what matched your visit.
6. Save ideas for later.

## Pre-Capture QA

Before taking screenshots, check these on the phone:

- Home color palette is the final public palette.
- Home hero image is correctly cropped and does not cover text.
- Category logo thumbnails are single-layer and not overlapping old thumbnails.
- Detail page shows the correct category logo.
- Place cards still show short best-for labels.
- Detail pages show more specific best-fit guidance.
- Quick feedback paired votes can be selected and unselected.
- Support and privacy links work from Profile.
- No public screen says `for this app`, `needs_parent_verification`, or another internal phrase that would confuse users.
- No screen makes exact claims about hours, parking fees, reservations, or closures unless the data is confirmed.

## User Must Do

- Capture final screenshots from the TestFlight candidate or simulator.
- Upload screenshots in App Store Connect.
- Tell Codex if App Store Connect rejects a size so we can resize or recapture.

## Codex Can Do

- Prepare a screenshot capture script if using iOS Simulator.
- Add optional caption frames if raw screenshots feel too plain.
- Check final screenshot files for size, format, transparency, and obvious public-copy issues.
