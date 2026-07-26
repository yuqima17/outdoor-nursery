# TestFlight Prep

This document explains what needs to happen before Outdoor Nursery can be shared through TestFlight.

References:

- Apple Developer Program: https://developer.apple.com/programs/
- App Store Connect: https://appstoreconnect.apple.com/
- Expo iOS submission docs: https://docs.expo.dev/submit/ios/
- Expo EAS Build docs: https://docs.expo.dev/build/introduction/

## Current Recommendation

Do not move to TestFlight until after 3-5 Expo Go friend tests.

Use TestFlight when:

- Friends need to test asynchronously.
- You want a real installed app.
- Home/Detail/Saved/Profile have passed basic phone QA.
- Privacy wording is ready enough for beta.

## What User Needs To Do

These steps require your accounts or decisions.

### 1. Apple Developer Program

You need an Apple Developer Program membership before TestFlight.

What to do:

1. Go to https://developer.apple.com/programs/
2. Enroll with your Apple ID.
3. Choose individual or organization.
4. Complete payment and verification.

Notes:

- This is separate from a normal Apple ID.
- Apple may take time to approve enrollment.
- Codex cannot complete this for you.

### 2. Expo Account

You need an Expo account to use EAS Build.

What to do later:

```bash
npx eas-cli login
```

or install EAS CLI globally if preferred.

### 3. Bundle Identifier

Choose one stable iOS bundle identifier.

Recommended options:

- `com.outdoornursery.app`
- `com.yuqima.outdoornursery`
- `com.outdoornursery.mobile`

Pick one before the first TestFlight build. Changing it later is possible but annoying.

### 4. App Store Connect App Record

Before submitting to TestFlight, create an app record in App Store Connect.

You will need:

- App name: `Outdoor Nursery`
- Bundle identifier
- SKU, for example `outdoor-nursery-ios`
- Primary language
- Category
- Contact/support info

### 5. Privacy/Support Info

Current support email:

```text
outdoornursery@gmail.com
```

Before TestFlight, choose:

- Privacy policy effective date.
- Whether the privacy policy will live in a public URL.
- Support URL or support email path.

## What Codex Can Do

Codex can help with:

- Add `ios.bundleIdentifier` after you choose it.
- Add `ios.buildNumber`.
- Adjust `ios.supportsTablet`.
- Update `eas.json`.
- Prepare EAS environment variable instructions.
- Draft TestFlight beta review notes.
- Draft tester instructions.
- Run local checks.
- Help debug EAS build errors.

Codex cannot:

- Enroll in Apple Developer Program for you.
- Pay Apple fees.
- Access App Store Connect unless you connect/provide tooling.
- Decide the legal/privacy final wording for you.

## First TestFlight Notes Draft

Use this as a starting point for beta review/tester notes.

```text
Outdoor Nursery is an early private beta for finding baby- and kid-friendly places to go in the Bay Area, including parks, playgrounds, and outdoor malls.

This beta focuses on browsing curated place details, saving places locally, opening directions, and submitting anonymous quick feedback.

The app does not require an account. It does not collect child personal information, contacts, photos, live location, or payment information.

Place data is prototype data and should be confirmed before a real trip, especially fees, hours, reservations, and facilities.
```

## First Tester Instructions Draft

```text
Please try the app for 5-10 minutes.

Try:
1. Browse Home.
2. Search or filter places.
3. Open a place detail page.
4. Save and unsave a place.
5. Tap quick feedback buttons.
6. Open Profile and read the privacy/data notes.

Please tell me what feels useful, confusing, too crowded, or missing.
```

## Before First TestFlight Build

Checklist:

- Apple Developer Program active.
- Expo/EAS login works.
- Bundle identifier chosen.
- `app.json` has `ios.bundleIdentifier`.
- `eas.json` exists.
- EAS env vars are configured.
- Privacy policy draft has effective date and contact email.
- Local checks pass.
- First EAS build succeeds.

## Current Blockers

Blocked until user decides or completes:

- Apple Developer Program enrollment.
- iOS bundle identifier.
- Whether first TestFlight is iOS-only.
- Where the final privacy policy will be hosted.
