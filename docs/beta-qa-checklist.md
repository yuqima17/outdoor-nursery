# Beta QA Checklist

Use this checklist when testing the Outdoor Nursery MVP on a phone.

## Current QA Status

Latest internal TestFlight smoke test:

```text
Version: 0.1.0
Build: 6
Date: August 5, 2026
Result: passed on user's iPhone
```

External friend testing is intentionally skipped for now because no external testers are available yet.

## Before Testing

- Confirm the Home screen shows `Dev · Supabase · 30 places`.
- Ask the tester to think like a parent planning a real outing, not like a developer.
- Tell the tester the data is prototype data and does not need field verification during this round.

## Phone Flow To Test

1. Open Home and scan the first screen.
2. Search for a place, category, or area.
3. Try each main filter: Recommended, Free, Stroller-friendly, Restrooms, Shade.
4. Open one park, one playground, and one outdoor mall.
5. Check whether Place Card content is easy to understand.
6. Check whether Detail page sections answer the parent questions before leaving home.
7. Save a place from Home.
8. Confirm it appears in Saved Places.
9. Unsave it from Detail.
10. Reload the app and confirm saved places persist.
11. Tap a few Quick Feedback options on Detail.
12. Pull down on Home to refresh data.
13. Open Profile and read the beta/privacy/data status notes.

## What To Ask

- What did you understand this app is for?
- What would you tap first?
- Which detail made you feel more confident about going?
- Which detail felt confusing or unnecessary?
- Did any card feel too crowded?
- Did any age range feel wrong?
- Did any wording sound too certain for prototype data?
- Would you trust this enough to plan a low-stakes outing?
- What one thing would make it more useful?

## Issues To Record

For each issue, write:

- Screen: Home, Place Card, Detail, Saved, Profile
- Place name, if relevant
- What happened
- What the tester expected
- Severity: low, medium, high
- Whether it blocks a beta release

## Pass Criteria For MVP Beta

- Tester understands the app purpose within 10 seconds.
- Tester can open a place detail without help.
- Tester understands Best for, Admission, Parking, Reserve, and Baby care.
- Tester can save and unsave a place.
- Tester understands Profile privacy/data notes.
- No screen feels broken, stuck, or impossible to read on phone.

## Deferred

- Field-checking place facts.
- Official website rechecks for every place.
- External TestFlight testing until testers are available.
- Login, cloud saved places, or account settings.
- Text feedback from users.
- Live location and map distance.
