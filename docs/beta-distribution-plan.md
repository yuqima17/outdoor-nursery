# Beta Distribution Plan

This plan explains how to let other people test Outdoor Nursery without jumping too early into App Store work.

## Current Recommendation

Use internal TestFlight for owner QA, then move to external TestFlight when testers are available.

Recommended path:

```text
Local phone QA -> EAS internal iOS build -> Internal TestFlight -> External TestFlight when testers exist -> App Store
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

Status: skipped for now.

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

Status: done enough for MVP beta setup.

Current result:

```text
Version: 0.1.0
Build: 6
Internal TestFlight smoke test: passed on user's iPhone
```

Use this when:

- You want a real app installed on phones.
- Testers should not need Expo Go.
- You are ready to manage native build settings.

Likely needed:

- Expo account.
- EAS CLI.
- iOS bundle identifier: `com.yuqima.outdoornursery`.
- Android package name if testing Android.
- App icon and splash assets.

See [EAS Build Plan](eas-build-plan.md).

This can still be private and does not require public App Store listing.

## Stage 4: External TestFlight

Status: intentionally skipped until external testers are available.

Use this when:

- Friends need to test asynchronously.
- You want crash/runtime behavior closer to release.
- The app is stable enough for a weekly build rhythm.

Needed:

- Apple Developer Program account.
- App Store Connect app record.
- iOS bundle identifier: `com.yuqima.outdoornursery`.
- Privacy details.
- App icon.
- Test information and beta review notes.

See [TestFlight Prep](testflight-prep.md).

Recommended first external TestFlight scope when ready:

- iOS only.
- iPhone only for the first beta.
- 3-5 trusted testers.
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

Before moving from internal TestFlight to external TestFlight, decide:

- Apple Developer account: active.
- App display name: `Outdoor Nursery` or another name.
- Bundle id: `com.yuqima.outdoornursery`.
- Beta scope: iOS-only for now.
- Whether Supabase project should remain dev-only or move to a production project.
- Whether current anonymous feedback is enough for beta.
- Who the first external testers are.
