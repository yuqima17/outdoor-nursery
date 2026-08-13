# Release Checklist

This checklist tracks what Outdoor Nursery needs before a real beta build or store submission.

## Current Release Target

Current target:

- First public release preparation.
- iOS first, iPhone-only.
- Bay Area only.
- Internal TestFlight build is available and passed a user phone smoke test.
- External TestFlight is intentionally skipped before public App Review.
- Public App Store release target is United States only and free.

## Product

- Confirm app name.
- Confirm one-line app description.
- Confirm first market wording: Bay Area. User confirmed Bay Area-only public launch.
- Confirm category names: Parks, Playgrounds, Outdoor Malls.
- Confirm Home, Place Card, Detail, Saved, and Profile wording.
- Confirm Profile data/privacy wording is acceptable for testers.
- Confirm text feedback is intentionally skipped for now.
- Add simple category thumbnails for place cards before public screenshots.
- Review final App Store listing copy in `docs/app-store-listing-copy.md`.

## App Configuration

- iOS bundle identifier configured: `com.yuqima.outdoornursery`.
- Add Android package name before Android build.
- Confirm `eas.json` build profiles.
- Review/refine draft app icon.
- Review/refine draft splash screen asset.
- Confirm version and build number strategy. Current iOS build number is `7`.
- Confirm portrait-only orientation is intentional.
- Tablet support disabled for first iPhone-only beta.
- Confirm permissions are minimal.

## Backend

- Confirm Supabase project is the intended beta project.
- Confirm `.env` uses the beta Supabase URL and anon key.
- Confirm EAS env vars are configured for development, preview, and production.
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

- Review and finalize the public-facing privacy policy.
- User confirmed privacy policy wording is final enough for the first public release.
- Public privacy policy copy exists in `docs/privacy-policy-public.md`.
- Static privacy policy HTML exists in `public/privacy-policy.html`.
- Static support HTML exists in `public/support.html`.
- GitHub Pages deploy workflow exists in `.github/workflows/deploy-pages.yml`.
- Privacy policy is published at `https://yuqima17.github.io/outdoor-nursery/privacy-policy.html`.
- Support page will publish at `https://yuqima17.github.io/outdoor-nursery/support.html`.
- Privacy policy URL is copied into App Store Connect.
- Explain anonymous quick feedback.
- Explain anonymous device id.
- Explain local saved places.
- Confirm no child personal data is collected.
- Confirm no live location collection.
- Decide feedback retention expectations.
- Confirm support/contact email: `outdoornursery@gmail.com`.
- Confirm effective date: July 30, 2026.

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
- Test Profile support and privacy links.
- Test Supabase fallback behavior.
- Test Home hero image on phone.
- Confirm app icon and splash load in Expo/EAS config.
- Prepare public App Store screenshots using `docs/app-store-screenshot-checklist.md`.
- Internal TestFlight build `0.1.0 (6)` installed and passed a smoke test on the user's iPhone.
- Latest production build `0.1.0 (7)` installed from TestFlight and passed a smoke test on the user's iPhone.

## Beta Operations

- Choose first 3-5 testers later.
- Send tester invite later.
- Record results in beta feedback log.
- Triage issues as Blocker, High, Medium, Low.
- Decide build rhythm: ad hoc, weekly, or after meaningful changes.
- Decide who can edit Supabase data.

## TestFlight Readiness

Before TestFlight:

- Apple Developer account exists.
- Bundle identifier is final enough: `com.yuqima.outdoornursery`.
- App Store Connect app record exists.
- App icon is ready.
- Splash screen is ready.
- Privacy policy URL exists.
- Beta review notes are written in `docs/testflight-beta-notes.md`.
- Tester instructions are written in `docs/testflight-beta-notes.md`.
- App Store Connect copy/paste metadata is written in `docs/app-store-connect-metadata.md`.
- Public App Store listing copy is drafted in `docs/app-store-listing-copy.md`.
- Public App Store screenshot checklist is drafted in `docs/app-store-screenshot-checklist.md`.
- Public App Store screenshot shot list is drafted in `docs/app-store-screenshot-shot-list.md`.
- EAS config exists.
- EAS env vars are configured.
- First EAS iOS build succeeds.
- GitHub Pages is enabled and `public/privacy-policy.html` loads from the final public URL.
- Internal TestFlight build `0.1.0 (6)` is visible in App Store Connect and passed smoke testing.
- Latest candidate build `0.1.0 (7)` is visible in TestFlight and passed owner smoke testing.
- Public App Store submission gaps are tracked in [App Store Submission Gap Checklist](app-store-submission-gap-checklist.md).
- User confirmed first public release decisions: Bay Area only, United States only, free, no external TestFlight before App Review, privacy policy acceptable, data quality acceptable.
- Profile public support/privacy links are implemented.
- Place cards use simple logo-style category thumbnails.

See:

- [EAS Build Plan](eas-build-plan.md)
- [TestFlight Prep](testflight-prep.md)
- [GitHub Pages Hosting](github-pages-hosting.md)
- [App Store Listing Copy](app-store-listing-copy.md)
- [App Store Screenshot Checklist](app-store-screenshot-checklist.md)
- [App Store Screenshot Shot List](app-store-screenshot-shot-list.md)

## Not Required Yet

- Login/accounts.
- Cloud synced saved places.
- Text reviews.
- Photos.
- Push notifications.
- Live location.
- In-app maps.
- External TestFlight testers.
