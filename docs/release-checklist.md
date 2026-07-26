# Release Checklist

This checklist tracks what Outdoor Nursery needs before a real beta build or store submission.

## Current Release Target

Current target:

- Small private beta.
- iOS first.
- Bay Area only.
- Expo Go or private EAS/TestFlight later.
- No public App Store release yet.

## Product

- Confirm app name.
- Confirm one-line app description.
- Confirm first market wording: Bay Area.
- Confirm category names: Parks, Playgrounds, Outdoor Malls.
- Confirm Home, Place Card, Detail, Saved, and Profile wording.
- Confirm Profile data/privacy wording is acceptable for testers.
- Confirm text feedback is intentionally skipped for now.

## App Configuration

- Add iOS bundle identifier before EAS/TestFlight.
- Add Android package name before Android build.
- Review/refine draft app icon.
- Review/refine draft splash screen asset.
- Confirm version and build number strategy.
- Confirm portrait-only orientation is intentional.
- Confirm tablet support is intentional or disable it.
- Confirm permissions are minimal.

## Backend

- Confirm Supabase project is the intended beta project.
- Confirm `.env` uses the beta Supabase URL and anon key.
- Confirm seed data is imported.
- Confirm app reads `Dev · Supabase · 30 places` in development.
- Confirm quick feedback writes rows to Supabase.
- Confirm public anon key cannot read raw `feedback`.
- Confirm admin read-only SQL queries work.
- Confirm review queue workflow is understandable.

## Data Quality

- Recheck Top 10 official sources before wider beta.
- Confirm admission labels.
- Confirm parking fee labels.
- Confirm reservation labels.
- Keep baby care as `Not reported` unless parent/official source confirms it.
- Keep caregiver notes conservative until parent verification.
- Decide whether any places should be removed from beta.

## Privacy

- Draft a public-facing privacy policy before TestFlight or wider beta.
- Explain anonymous quick feedback.
- Explain anonymous device id.
- Explain local saved places.
- Confirm no child personal data is collected.
- Confirm no live location collection.
- Decide feedback retention expectations.
- Decide support/contact email.

## QA

- Run `npm run typecheck`.
- Run `npm exec expo export -- --platform ios --output-dir /tmp/nursery-app-export-test`.
- Test on a physical iPhone.
- Test Home search and filters.
- Test Place Detail scrolling.
- Test Directions link.
- Test Save/unsave persistence.
- Test Quick Feedback.
- Test Profile page.
- Test Supabase fallback behavior.
- Test Home hero image on phone.
- Confirm app icon and splash load in Expo/EAS config.

## Beta Operations

- Choose first 3-5 testers.
- Send tester invite.
- Record results in beta feedback log.
- Triage issues as Blocker, High, Medium, Low.
- Decide build rhythm: ad hoc, weekly, or after meaningful changes.
- Decide who can edit Supabase data.

## TestFlight Readiness

Before TestFlight:

- Apple Developer account exists.
- Bundle identifier is final enough.
- App Store Connect app record exists.
- App icon is ready.
- Splash screen is ready.
- Privacy policy URL exists.
- Beta review notes are written.
- Tester instructions are written.
- EAS config exists.
- First EAS iOS build succeeds.

## Not Required Yet

- Login/accounts.
- Cloud synced saved places.
- Text reviews.
- Photos.
- Push notifications.
- Live location.
- In-app maps.
- Public App Store listing.
