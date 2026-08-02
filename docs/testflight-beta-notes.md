# TestFlight Beta Notes

Use this copy for the first Outdoor Nursery TestFlight setup.

## Beta App Description

```text
Outdoor Nursery helps parents and caregivers find baby- and kid-friendly places to go in the Bay Area, including parks, playgrounds, and outdoor malls.

This early beta focuses on practical outing details: best-fit age guidance, stroller notes, restrooms, parking, admission, reservations, weather fit, saved places, directions, and anonymous quick feedback.
```

## What To Test

```text
Please test whether the app helps you decide where to go with a baby, toddler, or young child.

Try:
1. Browse Home.
2. Search or filter places.
3. Open a place detail page.
4. Save and unsave a place.
5. Open directions.
6. Tap anonymous quick feedback buttons.
7. Open Profile and read the beta/privacy notes.

Please report anything confusing, too crowded, inaccurate-looking, broken, or missing.
```

## Beta Review Notes

```text
Outdoor Nursery is an early private beta for finding baby- and kid-friendly places to go in the Bay Area.

No account or login is required. The app opens directly to Home.

Suggested review path:
1. Open the app.
2. Browse Home.
3. Open any place detail page.
4. Save/unsave a place.
5. Tap a quick feedback button.
6. Open directions.
7. Open Profile to review privacy/data notes.

The app does not collect child personal information, contacts, photos, payment information, or live GPS location. It stores saved places locally on device and submits anonymous quick feedback to support manual place-data review.

Place data is prototype data and should be confirmed before real trips, especially fees, hours, reservations, closures, and facilities.
```

## Feedback Email

```text
outdoornursery@gmail.com
```

## Demo Account

```text
No demo account is required. This beta does not include login or account creation.
```

## Internal Tester Invite

```text
Hi! Outdoor Nursery is ready for a small iPhone beta through TestFlight.

Please try it for 5-10 minutes:
1. Browse Home.
2. Open a few place cards.
3. Check a detail page.
4. Save and unsave a place.
5. Try quick feedback.

The data is still prototype data, so please do not treat it as fully verified trip advice yet. I am mainly checking whether the app is understandable and useful for planning low-stress outings with babies or young kids.
```

## First TestFlight Pass Criteria

- App installs from TestFlight.
- App opens without Metro or Expo Go.
- Home loads Supabase-backed place data or a clear local fallback.
- Detail page opens for at least one park, one playground, and one outdoor mall.
- Save/unsave works and persists after app restart.
- Quick feedback taps do not crash the app.
- Directions opens the phone's map flow.
- Profile privacy/data wording is visible.
