# Beta Distribution Plan

This plan explains how to let other people test Outdoor Nursery without jumping too early into App Store work.

## Current Recommendation

Use Expo Go for the next tiny beta, then move to TestFlight when the app needs testing beyond people who can follow setup instructions.

Recommended path:

```text
Local phone QA -> Expo Go friend test -> EAS internal build -> TestFlight -> App Store
```

## Stage 1: Local Phone QA

Status: current.

Use this when:

- The app is changing daily.
- Only the builder is testing.
- It is fine to start Metro from a laptop.

How:

```bash
npm run start:clear
```

Then open Expo Go and scan the QR code.

Pros:

- Fastest loop.
- No paid Apple Developer account needed.
- Good for checking layout, wording, and data.

Limits:

- Tester needs to be near the dev server or on a reachable network.
- Not good for asynchronous testing by friends.
- Not a real installed beta app.

## Stage 2: Expo Go Friend Test

Status: next practical step.

Use this when:

- 1-3 friends can test while you are available to help.
- You want feedback on the concept and screens, not release mechanics.

Tester needs:

- Expo Go installed.
- QR code or Expo link.
- Same reachable network or tunnel mode if needed.

Good for:

- Home clarity.
- Place Card readability.
- Detail page usefulness.
- Save and Quick Feedback flows.
- Profile privacy/data wording.

Not good for:

- Store-like install experience.
- Testing push notifications.
- Testing native modules that Expo Go does not include.

## Stage 3: EAS Internal Build

Status: later.

Use this when:

- You want a real app installed on phones.
- Testers should not need Expo Go.
- You are ready to manage native build settings.

Likely needed:

- Expo account.
- EAS CLI.
- `eas.json`.
- iOS bundle identifier.
- Android package name if testing Android.
- App icon and splash assets.

This can still be private and does not require public App Store listing.

## Stage 4: TestFlight

Status: later, before wider beta.

Use this when:

- Friends need to test asynchronously.
- You want crash/runtime behavior closer to release.
- The app is stable enough for a weekly build rhythm.

Needed:

- Apple Developer Program account.
- App Store Connect app record.
- iOS bundle identifier.
- Privacy details.
- App icon.
- Test information and beta review notes.

Recommended first TestFlight scope:

- iOS only.
- 5-10 trusted testers.
- Bay Area data only.
- Anonymous quick feedback only.
- No account system.

## Stage 5: App Store

Status: not yet.

Do not start public App Store submission until:

- Data quality is stronger.
- Privacy policy is ready.
- App icon and screenshots are ready.
- Top priority places have official-source rechecks.
- There is a support/contact path.
- You are comfortable with public users seeing prototype limitations.

## iOS vs Android

Recommended beta order:

1. iOS first, because the current testing path is already working on iPhone.
2. Android later, after core UX/data decisions are stable.

Reasons:

- Smaller QA surface.
- Faster decisions.
- Fewer device-specific layout issues during early product validation.

## Decision Points

Before moving from Expo Go to TestFlight, decide:

- Apple Developer account: yes/no.
- App display name: `Outdoor Nursery` or another name.
- Bundle id, likely `com.yuqima.outdoornursery` or similar.
- Whether beta is iOS-only.
- Whether Supabase project should remain dev-only or move to a production project.
- Whether current anonymous feedback is enough for beta.
