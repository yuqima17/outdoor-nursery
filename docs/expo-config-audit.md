# Expo Config Audit

This audit reviews the current Expo release configuration. It is intentionally an audit, not a release change.

## Current Files

- `app.json`
- `package.json`
- `.env.example`
- `.nvmrc`

There is currently no:

- `assets/` directory
- `eas.json`
- app icon
- splash image
- iOS bundle identifier
- Android package name

## Current `app.json`

| Field | Current value | Status | Notes |
| --- | --- | --- | --- |
| `expo.name` | `Outdoor Nursery` | okay for MVP | User-facing display name can stay unless product name changes. |
| `expo.slug` | `outdoor-nursery` | okay | Fine for Expo project naming. |
| `expo.version` | `0.1.0` | okay | Good MVP version. Need build numbers later. |
| `expo.orientation` | `portrait` | okay | Matches current phone-first product. |
| `expo.userInterfaceStyle` | `light` | okay | App currently designed for light mode only. |
| `assetBundlePatterns` | `["**/*"]` | okay for MVP | Can tighten later if needed. |
| `ios.supportsTablet` | `true` | needs decision | If the first beta is iPhone-only, set this to `false` later. |
| `android.adaptiveIcon.backgroundColor` | `#EAF8F2` | incomplete | Needs foreground icon before Android build. |
| `web.bundler` | `metro` | okay | Web is not the release target. |

## Missing Before EAS/TestFlight

Add before a real iOS beta build:

- `ios.bundleIdentifier`, for example `com.yuqima.outdoornursery`.
- `ios.buildNumber`, for example `1`.
- App icon, usually `./assets/icon.png`.
- Splash screen image and background color.
- EAS config file: `eas.json`.
- Expo project owner if using an Expo account/team.

Add before Android beta:

- `android.package`, for example `com.yuqima.outdoornursery`.
- `android.versionCode`.
- Android adaptive icon foreground image.

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

## Recommended Next Config Changes

Do not make these until ready for EAS/TestFlight:

1. Create `assets/icon.png`.
2. Create splash image.
3. Add `ios.bundleIdentifier`.
4. Decide `ios.supportsTablet`.
5. Add `eas.json`.
6. Add build number fields.

## Recommendation

Keep the current config for Expo Go testing.

Move to EAS/TestFlight only after:

- 3-5 friend tests are done.
- High-severity UX issues are fixed.
- Privacy wording is ready.
- App icon/splash direction is chosen.
