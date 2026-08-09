# App Store Submission Gap Checklist

Last updated: August 9, 2026

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
Latest build: 7
Bundle ID: com.yuqima.outdoornursery
App Store Connect app ID: 6797605509
Privacy policy URL: https://yuqima17.github.io/outdoor-nursery/privacy-policy.html
Support email: outdoornursery@gmail.com
External TestFlight: skipped until testers are available
Public App Store release: not started
```

## Public Release Decisions

User confirmed on August 9, 2026:

- First public launch market: Bay Area only.
- First public release countries/regions: United States only.
- Pricing: free.
- External TestFlight before public App Review: no, skip for now.
- Privacy policy wording: final enough for the first public release.
- Current data quality: acceptable for the first public release.
- Current generated image assets: acceptable for public listing, but place cards still need default images.

Latest testing:

```text
Build 6: internal TestFlight smoke test passed on user's iPhone.
Build 7: user confirmed phone smoke test passed.
```

## Already Done

- Apple Developer Program is active.
- App Store Connect app record exists.
- iOS bundle identifier is configured.
- iPhone-only support is configured.
- EAS project is linked.
- Production EAS build profile exists.
- EAS submit profile includes `ascAppId`.
- EAS production build `0.1.0 (7)` completed and submitted successfully.
- TestFlight internal testing works.
- Privacy policy is hosted on GitHub Pages.
- App metadata draft exists in [App Store Connect Metadata](app-store-connect-metadata.md).
- TestFlight beta notes exist in [TestFlight Beta Notes](testflight-beta-notes.md).
- No account/demo login is required.
- No live location, contacts, photos, payment, ads, or push notifications are used in the MVP.

## Must Do Before Public App Store Submission

These are required or strongly recommended before pressing public App Review submit.

| Area | Status | Owner | Notes |
| --- | --- | --- | --- |
| Latest build selected for release | needs_user_action | User | In App Store Connect, select the newest processed build under the iOS app version before submitting for App Review. |
| Public App Store screenshots | blocked | User + Codex | Required for a public listing. Codex can prepare a screenshot plan/copy; user should approve final phone screenshots. |
| App Store description | needs_quality_check | User + Codex | Draft short metadata exists; public listing copy should be more polished than beta notes. |
| Keywords | needs_quality_check | User + Codex | Need App Store search keywords, likely parent outing, playground, park, toddler, stroller, Bay Area. |
| Support URL | needs_user_action | User + Codex | Current support path is email only. Best next step: create `public/support.html` and use that URL in App Store Connect. |
| App Review contact | needs_user_action | User | Apple needs the account owner's current name/phone/email. Codex should not invent phone/contact details. |
| App Privacy answers | needs_user_action | User + Codex | User confirmed privacy policy wording is final enough. Current recommendation: yes, app collects anonymous feedback data; no tracking; not linked to identity. User still needs to click the final App Store Connect answers. |
| Age rating questionnaire | needs_user_action | User | Likely 4+, but user must answer Apple's questionnaire. |
| Content rights | needs_quality_check | User | User confirmed current generated image assets are acceptable, but place card default images are still needed before final screenshot/public polish. |
| Pricing and availability | needs_user_action | User | User decision: free app, United States only for first release. User still needs to set this in App Store Connect. |
| License/agreement prompts | needs_user_action | User | If App Store Connect shows a new Apple Developer Program agreement, the account holder must accept it. Paid Apps agreement is not needed for a free app with no IAP unless Apple requires another account setup step. |
| Data quality disclaimer | needs_quality_check | User + Codex | User confirmed current data quality is acceptable for first public release. Public release should still avoid overly certain wording where facts may change. |
| Remove dev/prototype labels | needs_code | Codex | Public build should not show labels like `Dev`, `UI preview`, or internal diagnostics on Home. |
| Place card default images | needs_code | Codex | User confirmed public image direction is acceptable, but place cards need default images instead of blank/placeholder image areas. |
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

1. Create a hosted support page at `public/support.html`.
2. Add a Support/Privacy section in Profile that links to the public support and privacy URLs.
3. Remove or hide development labels from production builds.
4. Draft final App Store listing copy: subtitle, promotional text, description, keywords, support copy.
5. Create an App Store screenshot plan with required screens and captions.
6. Add a public-release QA checklist separate from beta QA.
7. Prepare build 8 after final UI/content changes.

## What User Must Decide

User decisions before public release:

- App should launch publicly as Bay Area only: yes, for now.
- App should be free: yes.
- First release countries/regions: United States.
- Current generated image assets are acceptable for public listing: yes, but add default images for place cards.
- Privacy policy wording is final enough: yes.
- Current data quality is acceptable for a first public release: yes.
- Invite external testers before public App Review: no.

## Suggested Next 5 Steps

Recommended order:

1. Create `public/support.html` and add it to GitHub Pages.
2. Add default place card images and remove internal/dev wording from production UI.
3. Draft App Store listing copy and screenshot checklist.
4. Run one final data/content pass on the first 10 places.
5. Build and submit the next production candidate after those changes.
