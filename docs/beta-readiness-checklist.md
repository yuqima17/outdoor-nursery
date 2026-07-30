# Beta Readiness Checklist

This checklist tracks what needs to happen before Outdoor Nursery is shared beyond a small private test.

## Product

- Confirm first launch city and area wording.
- Confirm MVP categories: parks, playgrounds, outdoor malls.
- Confirm Home, place card, and detail page information hierarchy.
- Confirm age guidance language.
- Confirm baby care language.
- Confirm quick feedback options.

## Data

- Recheck official sources for the first 10 priority places.
- Confirm admission and parking fee wording.
- Confirm reservation wording.
- Confirm restroom availability from reliable sources where possible.
- Keep baby care as `not_reported` until parent or official confirmation exists.
- Decide whether to add more Bay Area cities before beta.

## Backend

- Confirm Supabase project region and Free plan setup.
- Confirm `places`, `place_sources`, `place_facts`, `feedback`, and `review_queue` exist.
- Confirm 30 seed places are imported.
- Confirm app reads places from Supabase.
- Confirm quick feedback writes rows to Supabase.
- Confirm feedback cannot be publicly read through the anon key.
- Run admin feedback review queries after a few test submissions.

## App

- Test Expo Go on iPhone.
- Test Home search and filters.
- Test place detail scroll.
- Test Directions link.
- Test Save/unsave.
- Test Quick Feedback.
- Test local JSON fallback by temporarily removing Supabase env values.

## Release Configuration

- Review [Beta Distribution Plan](beta-distribution-plan.md).
- Review [Release Checklist](release-checklist.md).
- Review [Expo Config Audit](expo-config-audit.md).
- Next test can stay on Expo Go while EAS/TestFlight setup is prepared.
- First beta scope is iOS-only and iPhone-only.
- iOS bundle identifier is configured as `com.yuqima.outdoornursery`.
- Decide app icon and splash direction before TestFlight.
- Create or log into an Expo account before the first EAS build.

## Privacy

- Confirm no account is required for MVP.
- Confirm the app does not collect child personal data.
- Confirm anonymous device id purpose is documented.
- Draft public privacy policy before wider beta.

## Launch Operations

- Decide how bugs and parent feedback will be reviewed.
- Decide who can edit Supabase data.
- Decide commit/release rhythm.
- Make a simple QA checklist for every build.
- Use TestFlight before public app store work when asynchronous tester installs are needed.
