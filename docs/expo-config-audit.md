# Expo Config Audit

This audit reviews the current Expo release configuration for the first iOS beta path.

## Current Files

- `app.json`
- `package.json`
- `.env.example`
- `.nvmrc`

There is currently no Android package name because the first beta is iOS-only.

`eas.json` now exists with `preview` and `production` build profiles.

Draft visual assets now exist:

- `assets/icon.png`
- `assets/splash.png`
- `assets/home-hero.png`
- `assets/visual-asset-board.png`

See [Brand Assets](brand-assets.md) for direction and status.

## Current `app.json`

| Field | Current value | Status | Notes |
| --- | --- | --- | --- |
| `expo.name` | `Outdoor Nursery` | okay for MVP | User-facing display name can stay unless product name changes. |
| `expo.slug` | `outdoornursery` | configured | Matches the linked Expo project slug. |
| `expo.version` | `0.1.0` | okay | Good MVP version. |
| `expo.orientation` | `portrait` | okay | Matches current phone-first product. |
| `expo.userInterfaceStyle` | `light` | okay | App currently designed for light mode only. |
| `expo.icon` | `./assets/icon.png` | draft | Good for prototype; refine before TestFlight/App Store. |
| `expo.splash` | `./assets/splash.png` | draft | Good for prototype; confirm native splash behavior before EAS/TestFlight. |
| `assetBundlePatterns` | `["**/*"]` | okay for MVP | Can tighten later if needed. |
| `ios.bundleIdentifier` | `com.yuqima.outdoornursery` | configured | Stable identifier for the first iOS beta. |
| `ios.buildNumber` | `8` | configured | Current App Store Connect/TestFlight build number. |
| `ios.supportsTablet` | `false` | configured | First beta is iPhone-only. |
| `ios.infoPlist.ITSAppUsesNonExemptEncryption` | `false` | configured | Records standard/exempt encryption usage for Apple export compliance prompt. |
| `expo.owner` | `yuqiexpos-team` | configured | Project is linked under the Expo team account. |
| `extra.eas.projectId` | `338f84dc-eb17-40c2-99d1-61205a5257a1` | configured | Local app is linked to the Expo project. |
| `android.adaptiveIcon.foregroundImage` | `./assets/icon.png` | draft | Good for prototype; Android adaptive icon should be refined separately before Android beta. |
| `android.adaptiveIcon.backgroundColor` | `#EAF8F2` | okay | Matches current palette. |
| `web.bundler` | `metro` | okay | Web is not the release target. |
| `plugins` | `["expo-font"]` | configured | Ensures the native font loader is included in custom builds. |

## Missing Before Wider TestFlight

Still useful before inviting external testers:

- Final app icon review.
- Final splash screen image and background color review.
- Additional owner QA on internal TestFlight.
- External tester list.

Add before Android beta:

- `android.package`, for example `com.yuqima.outdoornursery`.
- `android.versionCode`.
- Final Android adaptive icon foreground image.

## Current `package.json`

| Field | Current value | Status | Notes |
| --- | --- | --- | --- |
| `name` | `outdoor-nursery` | okay | Package name is local-only. |
| `version` | `0.1.0` | okay | Matches app version. |
| `main` | `index.js` | okay | Standard Expo entry. |
| `scripts.start` | `expo start` | okay | Local dev. |
| `scripts.start:clear` | `expo start --clear` | okay | Useful after env/config changes. |
| `scripts.typecheck` | `tsc --noEmit` | okay | Keep before every release-like build. |
| `expo` | `~54.0.0` | okay | Matches Expo Go testing path. |

## Permissions Audit

Current app behavior:

- Opens external directions links.
- Reads Supabase data.
- Stores local saved places and feedback selections.
- Does not request live location.
- Does not request camera.
- Does not request photos.
- Does not request contacts.
- Does not request notifications.

This is good for MVP privacy.

## Environment Variables

Current public env vars:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

These are expected to be public in a client app. Security should come from Supabase RLS policies, not from hiding the anon key.

Before beta:

- Confirm `.env` points to the intended Supabase project.
- Confirm no service role key is ever added to the mobile app.
- Confirm feedback table has insert-only public behavior.
- EAS project env vars are configured for `development`, `preview`, and `production`.

## Recommended Next Config Changes

Next config changes before a wider TestFlight beta:

1. Refine final `assets/icon.png` if needed.
2. Refine final splash image if needed.
3. Keep incrementing `ios.buildNumber` for each new TestFlight upload.

## Recommendation

Keep this config for internal TestFlight and the first iOS beta path.

Move to external TestFlight only after:

- High-severity UX issues are fixed.
- An external tester list exists.
- The current internal build still passes owner smoke testing.
