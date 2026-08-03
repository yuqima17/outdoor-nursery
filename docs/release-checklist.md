# Release Checklist

This checklist tracks what Outdoor Nursery needs before a real beta build or store submission.

## Current Release Target

Current target:

- Small private beta.
- iOS first, iPhone-only.
- Bay Area only.
- Expo Go now; EAS/TestFlight preparation in progress.
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

- iOS bundle identifier configured: `com.yuqima.outdoornursery`.
- Add Android package name before Android build.
- Confirm `eas.json` build profiles.
- Review/refine draft app icon.
- Review/refine draft splash screen asset.
- Confirm version and build number strategy. Current iOS build number is `5`.
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
- Public privacy policy copy exists in `docs/privacy-policy-public.md`.
- Static privacy policy HTML exists in `public/privacy-policy.html`.
- GitHub Pages deploy workflow exists in `.github/workflows/deploy-pages.yml`.
- Publish the privacy policy with GitHub Pages and copy the final URL into App Store Connect.
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
- Bundle identifier is final enough: `com.yuqima.outdoornursery`.
- App Store Connect app record exists.
- App icon is ready.
- Splash screen is ready.
- Privacy policy URL exists.
- Beta review notes are written in `docs/testflight-beta-notes.md`.
- Tester instructions are written in `docs/testflight-beta-notes.md`.
- App Store Connect copy/paste metadata is written in `docs/app-store-connect-metadata.md`.
- EAS config exists.
- EAS env vars are configured.
- First EAS iOS build succeeds.
- GitHub Pages is enabled and `public/privacy-policy.html` loads from the final public URL.

See:

- [EAS Build Plan](eas-build-plan.md)
- [TestFlight Prep](testflight-prep.md)
- [GitHub Pages Hosting](github-pages-hosting.md)

## Not Required Yet

- Login/accounts.
- Cloud synced saved places.
- Text reviews.
- Photos.
- Push notifications.
- Live location.
- In-app maps.
- Public App Store listing.
