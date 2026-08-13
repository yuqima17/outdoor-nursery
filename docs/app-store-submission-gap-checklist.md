# App Store Submission Gap Checklist

Last updated: August 13, 2026

This checklist tracks the gap between the current internal TestFlight beta and a public App Store submission for Outdoor Nursery.

References:

- Apple App Review: https://developer.apple.com/app-store/review/
- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple App Privacy Details: https://developer.apple.com/app-store/app-privacy-details/
- Apple Manage App Privacy: https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy
- Apple TestFlight Overview: https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview

## Current State

Current release state:

```text
App: Outdoor Nursery
Platform: iOS only
Device target: iPhone only
Version: 0.1.0
Latest build: 8
Bundle ID: com.yuqima.outdoornursery
App Store Connect app ID: 6797605509
Privacy policy URL: https://yuqima17.github.io/outdoor-nursery/privacy-policy.html
Support URL: https://yuqima17.github.io/outdoor-nursery/support.html
Support email: outdoornursery@gmail.com
External TestFlight: skipped until testers are available
Public App Store release: not started
```

## Public Release Decisions

User confirmed on August 9, 2026:

- First public launch market: current 30-place launch dataset.
- First public release countries/regions: United States only.
- Pricing: free.
- External TestFlight before public App Review: no, skip for now.
- Privacy policy wording: final enough for the first public release.
- Current data quality: acceptable for the first public release.
- Current generated image assets: acceptable for public listing.
- Place card thumbnails should use simple logo-style category tiles instead of photo-like images.

Latest testing:

```text
Build 6: internal TestFlight smoke test passed on user's iPhone.
Build 7: user confirmed phone smoke test passed.
Build 8: EAS production build finished; EAS submission is queued for App Store Connect upload.
```

## Already Done

- Apple Developer Program is active.
- App Store Connect app record exists.
- iOS bundle identifier is configured.
- iPhone-only support is configured.
- EAS project is linked.
- Production EAS build profile exists.
- EAS submit profile includes `ascAppId`.
- EAS production build `0.1.0 (7)` completed, submitted successfully, and passed owner TestFlight smoke testing.
- EAS production build `0.1.0 (8)` completed successfully and is queued for App Store Connect upload.
- TestFlight internal testing works.
- Privacy policy is hosted on GitHub Pages.
- Support page is hosted through GitHub Pages.
- App metadata draft exists in [App Store Connect Metadata](app-store-connect-metadata.md).
- Public listing copy exists in [App Store Listing Copy](app-store-listing-copy.md).
- Public screenshot checklist exists in [App Store Screenshot Checklist](app-store-screenshot-checklist.md).
- Public screenshot shot list exists in [App Store Screenshot Shot List](app-store-screenshot-shot-list.md).
- Public listing browser preview exists in `public/app-store-listing-preview.html`.
- TestFlight beta notes exist in [TestFlight Beta Notes](testflight-beta-notes.md).
- No account/demo login is required.
- No live location, contacts, photos, payment, ads, or push notifications are used in the MVP.

## Must Do Before Public App Store Submission

These are required or strongly recommended before pressing public App Review submit.

| Area | Status | Owner | Notes |
| --- | --- | --- | --- |
| Latest build selected for release | needs_user_action | User | In App Store Connect, select the newest processed build under the iOS app version before submitting for App Review. |
| Public App Store screenshots | needs_user_action | User + Codex | Required for a public listing. Screenshot plan is drafted in [App Store Screenshot Checklist](app-store-screenshot-checklist.md) and [App Store Screenshot Shot List](app-store-screenshot-shot-list.md); user still needs final screenshots from the TestFlight/public candidate build. |
| App Store description | needs_quality_check | User + Codex | Public listing copy is drafted in [App Store Listing Copy](app-store-listing-copy.md). User should review tone and accuracy before submission. |
| Keywords | needs_quality_check | User + Codex | Public keywords are drafted in [App Store Listing Copy](app-store-listing-copy.md). User should review before submission. |
| Support URL | needs_user_action | User | Codex created `public/support.html`. Use `https://yuqima17.github.io/outdoor-nursery/support.html` in App Store Connect after GitHub Pages deploys. |
| App Review contact | needs_user_action | User | Apple needs the account owner's current name/phone/email. Codex should not invent phone/contact details. |
| App Privacy answers | needs_user_action | User + Codex | User confirmed privacy policy wording is final enough. Current recommendation: yes, app collects anonymous feedback data; no tracking; not linked to identity. User still needs to click the final App Store Connect answers. |
| Age rating questionnaire | needs_user_action | User | Likely 4+, but user must answer Apple's questionnaire. |
| Content rights | needs_quality_check | User | User confirmed current generated image assets are acceptable. Place cards now use simple category logo tiles instead of photo-like location thumbnails. |
| Pricing and availability | needs_user_action | User | User decision: free app, United States only for first release. User still needs to set this in App Store Connect. |
| License/agreement prompts | needs_user_action | User | If App Store Connect shows a new Apple Developer Program agreement, the account holder must accept it. Paid Apps agreement is not needed for a free app with no IAP unless Apple requires another account setup step. |
| Data quality disclaimer | needs_quality_check | User + Codex | User confirmed current data quality is acceptable for first public release. Public release should still avoid overly certain wording where facts may change. |
| Remove dev/prototype labels | needs_quality_check | User + Codex | Public-facing Home/Profile/error/privacy copy no longer uses obvious internal beta/prototype wording. Dev-only diagnostics still appear only in development builds. |
| Place card default thumbnails | needs_quality_check | User + Codex | Place cards now use simple logo-style category tiles for parks, playgrounds, and outdoor malls. |
| App icon and splash final review | needs_quality_check | User | Current assets are okay for beta, but public App Store polish should be checked once more. |
| Latest production QA | needs_quality_check | User | Run the full phone QA checklist on the final public candidate build. |

## Good Enough For Internal TestFlight

These do not block internal owner testing:

- Public App Store screenshots.
- External tester list.
- Public marketing copy.
- Paid Apps agreement for a free app with no IAP.
- Full official/field verification for all 30 places.
- Login/account system.
- Android package/build.

## External TestFlight Gap

External TestFlight is optional right now because no external testers are available.

Current decision: skip external TestFlight before public App Review.

If external testers become available, do these first:

1. Add beta app description.
2. Add beta feedback email.
3. Add beta review information.
4. Add external tester group.
5. Submit the first external beta build for Beta App Review.
6. Send invite links only after the build is approved for external testing.

External TestFlight does not require full public App Store screenshots, but Apple may review the beta and still expects complete enough app/test information.

## Recommended App Privacy Position

Current MVP behavior suggests this position:

- Tracking: No.
- Data linked to user: No.
- Data not linked to user:
  - Identifier: anonymous app-generated device/install identifier used for feedback deduplication.
  - Product interaction or usage data: quick feedback votes tied to place IDs.
- Not collected:
  - Name.
  - Email address.
  - Phone number.
  - Photos.
  - Contacts.
  - Precise location.
  - Live location history.
  - Payment information.
  - Child personal information.

Before public release, confirm whether Apple's questionnaire labels the anonymous install identifier as `Device ID`, `User ID`, or another identifier category. The important product truth is that it is anonymous, not used for tracking, and not linked to a real-world identity.

## What Codex Can Do Next

High-value tasks Codex can do without more Apple account access:

1. Quality-check hosted support page at `public/support.html`.
2. Add a Support/Privacy section in Profile that links to the public support and privacy URLs.
3. Remove or hide any remaining development labels from production builds.
4. Turn final phone screenshots into App Store-ready image files if App Store Connect rejects any sizes.
5. Refine App Store listing copy after user review.
6. Add a public-release QA checklist separate from beta QA.
7. Monitor build 8 upload/processing, then run owner TestFlight QA once it appears.

## What User Must Decide

User decisions before public release:

- App should launch publicly with the current first dataset: yes, for now.
- App should be free: yes.
- First release countries/regions: United States.
- Current generated image assets are acceptable for public listing: yes, but add default images for place cards.
- Privacy policy wording is final enough: yes.
- Current data quality is acceptable for a first public release: yes.
- Invite external testers before public App Review: no.

## Suggested Next 5 Steps

Recommended order:

1. Confirm the support page loads from GitHub Pages and add it to App Store Connect.
2. Quality-check logo-style place card thumbnails and public-facing wording on phone.
3. Review [App Store Listing Copy](app-store-listing-copy.md) and choose final subtitle/promotional text/description/keywords.
4. Capture final screenshots using [App Store Screenshot Checklist](app-store-screenshot-checklist.md) and [App Store Screenshot Shot List](app-store-screenshot-shot-list.md).
5. Run owner TestFlight QA on build 8 once Apple finishes processing it.
