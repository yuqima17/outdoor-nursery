# TestFlight Prep

This document explains what needs to happen before Outdoor Nursery can be shared through TestFlight.

References:

- Apple Developer Program: https://developer.apple.com/programs/
- App Store Connect: https://appstoreconnect.apple.com/
- Expo iOS submission docs: https://docs.expo.dev/submit/ios/
- Expo EAS Build docs: https://docs.expo.dev/build/introduction/

## Current Recommendation

Outdoor Nursery is now being prepared for a first iOS TestFlight path.

Use TestFlight when:

- Friends need to test asynchronously.
- You want a real installed app.
- Home/Detail/Saved/Profile have passed basic phone QA.
- Privacy wording is ready enough for beta.

## What User Needs To Do

These steps require your accounts or decisions.

### 1. Apple Developer Program

Apple Developer Program membership is active.

Notes:

- This is separate from a normal Apple ID.
- Codex cannot access Apple Developer or App Store Connect unless you complete the account steps yourself.

### 2. Expo Account

You need an Expo account to use EAS Build.

Status: active. CLI login works as `yuqi_expo`.

Useful check:

```bash
npx eas-cli@latest whoami
```

The linked project is under `yuqiexpos-team`.

### 3. Bundle Identifier

Chosen iOS bundle identifier:

```text
com.yuqima.outdoornursery
```

This is now configured in `app.json`.

### 4. App Store Connect App Record

Before submitting to TestFlight, create an app record in App Store Connect.

You will need:

- App name: `Outdoor Nursery`
- Bundle identifier: `com.yuqima.outdoornursery`
- SKU, for example `outdoor-nursery-ios`
- Primary language
- Category
- Contact/support info

Prepared copy/paste values:

- [App Store Connect Metadata](app-store-connect-metadata.md)
- [TestFlight Beta Notes](testflight-beta-notes.md)

### 5. Privacy/Support Info

Current support email:

```text
outdoornursery@gmail.com
```

Before TestFlight, choose:

- Whether the privacy policy will live in a public URL.
- Support URL or support email path.

Chosen privacy policy effective date:

```text
July 30, 2026
```

Prepared public policy files:

- [Privacy Policy Public Copy](privacy-policy-public.md)
- `public/privacy-policy.html`
- [GitHub Pages Hosting](github-pages-hosting.md)

## What Codex Can Do

Codex can help with:

- Add or update `ios.bundleIdentifier`.
- Add or update `ios.buildNumber`.
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
- Bundle identifier chosen: `com.yuqima.outdoornursery`.
- `app.json` has `ios.bundleIdentifier`.
- `app.json` has `ios.buildNumber`.
- `app.json` has `ios.supportsTablet: false` for the first iPhone-only beta.
- `eas.json` exists.
- EAS env vars are configured.
- Privacy policy draft has effective date and contact email.
- App Store Connect metadata draft exists.
- TestFlight beta notes draft exists.
- Public privacy policy copy exists.
- GitHub Pages deploy workflow exists.
- Final privacy policy URL is copied into App Store Connect.
- Local checks pass.
- First EAS build succeeds.

## Current Blockers

Blocked until user completes:

- App Store Connect app record.
- GitHub repository creation/push and GitHub Pages enablement.
