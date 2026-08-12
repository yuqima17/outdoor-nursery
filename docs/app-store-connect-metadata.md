# App Store Connect Metadata

This document prepares copy/paste values for the first Outdoor Nursery App Store Connect app record.

References:

- Apple Add a New App: https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app/
- Apple TestFlight Overview: https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/
- Apple Provide Test Information: https://developer.apple.com/help/app-store-connect/test-a-beta-version/provide-test-information
- Apple App Information Reference: https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/
- Apple Platform Version Information Reference: https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information
- App Store listing copy draft: [App Store Listing Copy](app-store-listing-copy.md)
- App Store screenshot plan: [App Store Screenshot Checklist](app-store-screenshot-checklist.md)

## App Record

Use these values when creating the app record in App Store Connect.

| Field | Recommended value | Notes |
| --- | --- | --- |
| Platform | iOS | First beta is iPhone-only. |
| Name | Outdoor Nursery | Matches current app display name. |
| Primary language | English (U.S.) | The first product version is U.S.-focused. |
| Bundle ID | `com.yuqima.outdoornursery` | Already configured in `app.json`. |
| SKU | `outdoor-nursery-ios` | Internal identifier; users do not see it. |
| User Access | Full Access | Simplest while there is only one owner. |

## App Information Draft

Use these values after the app record exists.

| Field | Recommended value | Notes |
| --- | --- | --- |
| Category | Lifestyle | Parent/caregiver outing planning fits better here than pure navigation. |
| Secondary category | Travel | Optional; useful if Apple asks for a second category. |
| Content rights | Needs user confirmation | Current app uses original/generated assets and public place facts. Confirm before public release. |
| Age rating target | 4+ | App is for adults/caregivers, has no accounts, no public user content, no ads, and no live location. |
| Support email | `outdoornursery@gmail.com` | Use for beta feedback and privacy questions. |
| Support URL | `https://yuqima17.github.io/outdoor-nursery/support.html` | Hosted with GitHub Pages. |
| Privacy policy URL | `https://yuqima17.github.io/outdoor-nursery/privacy-policy.html` | Hosted with GitHub Pages. |

## Public App Store Listing Draft

Use the full, maintained copy in [App Store Listing Copy](app-store-listing-copy.md).

| Field | Recommended value |
| --- | --- |
| Subtitle | `Baby-friendly outings` |
| Promotional Text | `Find low-stress outings with practical parent notes for parks, playgrounds, and outdoor malls.` |
| Keywords | `baby,toddler,kids,family,park,playground,stroller,outings,parents,restroom` |
| What is new in this version | `First public release.` |

Short description for quick reference:

```text
Find practical outings for babies, toddlers, and young kids, with parent-first notes on parks, playgrounds, and outdoor malls.
```

## App Privacy Draft

Use this as a starting point for Apple's App Privacy questionnaire. Review before submitting to Apple.

Tracking:

- Does the app track users across apps or websites owned by other companies? Recommended answer: No.

Data linked to the user:

- Recommended answer for MVP: None.

Data not linked to the user:

- Identifiers: anonymous app-generated device ID.
- Usage Data / Product Interaction: quick feedback button selections tied to a place ID.

Data not collected:

- Name.
- Email address.
- Phone number.
- Photos.
- Contacts.
- Precise location.
- Live location history.
- Payment information.
- Child personal information.

Purpose:

- App Functionality: saved local state and anonymous feedback deduplication.
- Analytics / Product Improvement: understanding which place facts may need manual review.

Important notes:

- Saved places stay on device in the MVP and are not uploaded.
- Quick feedback is not publicly displayed.
- No free-text feedback is collected in the current MVP.
- No account is required.
- No Supabase service role key is included in the app.

## Beta Review Contact Draft

Use the account owner's name and phone number in App Store Connect.

Use this email:

```text
outdoornursery@gmail.com
```

Demo account:

```text
Not required. The app does not have login or account creation in this beta.
```

Review notes:

```text
Outdoor Nursery helps parents and caregivers find baby- and kid-friendly places to go, including parks, playgrounds, and outdoor malls.

No login is required. Please open the app, browse Home, open a place detail page, save/unsave a place, open directions, and try anonymous quick feedback buttons.

The app does not collect child personal information, contacts, photos, payment information, or live GPS location. Place details can change and should be confirmed before real trips, especially fees, hours, reservations, closures, and facilities.
```

## User Must Still Do

- Keep App Store Connect metadata current as the product changes.
- Decide whether the draft category, age rating, and privacy answers still feel right before external TestFlight.
- Add external testers later when testers are available.
