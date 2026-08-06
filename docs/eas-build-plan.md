# EAS Build Plan

This plan tracks Outdoor Nursery EAS builds and the current debug path.

References:

- Expo EAS Build docs: https://docs.expo.dev/build/introduction/
- Expo `eas.json` docs: https://docs.expo.dev/build/eas-json/
- Expo iOS submission docs: https://docs.expo.dev/submit/ios/

## Current Status

Current status:

- Expo SDK 54 app works in Expo Go.
- Draft icon and splash are configured.
- Supabase backend is configured through public env vars.
- `eas.json` exists.
- Apple Developer Program membership is active.
- First beta target is iOS only.
- iOS bundle identifier is `com.yuqima.outdoornursery`.
- Current iOS build number is `7`.
- Local app is linked to Expo project `338f84dc-eb17-40c2-99d1-61205a5257a1` under owner `yuqiexpos-team`.
- EAS project environment variables are configured for `development`, `preview`, and `production`.
- First EAS iOS preview build installed but opened to a blank screen.
- EAS env vars were re-written from the local `.env`, and build `2` adds runtime error fallback UI plus safer Supabase config handling.
- Build `3` adds `expo-dev-client` and a development build profile so runtime errors can be inspected without a USB cable.
- Build `4` adds the SDK 54-compatible `expo-font` native module after the development build reported `Cannot find native module 'ExpoFontLoader'`.
- Build `5` confirmed the normal preview/internal path after the `expo-font` fix.
- Production build `0.1.0 (6)` was uploaded to App Store Connect and passed internal TestFlight smoke testing on the user's iPhone.
- Production build `0.1.0 (7)` finished successfully on EAS and EAS submission `dcf7cf44-5209-4e04-925a-4b17a27d8373` finished on August 6, 2026. The build is waiting for App Store Connect/TestFlight processing or availability.

Current release path note:

- Internal TestFlight is usable for owner QA.
- External TestFlight is intentionally skipped until external testers are available.

## Current `eas.json`

```json
{
  "cli": {
    "appVersionSource": "local"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": {
        "ascAppId": "6797605509"
      }
    }
  }
}
```

## Profiles

### `development`

Purpose:

- Debug build for a registered iPhone.
- Opens through Expo Dev Client and connects to Metro for clearer runtime errors.
- Use when an internal preview build opens to a blank screen.

Command:

```bash
npx eas-cli@latest build --platform ios --profile development
```

### `preview`

Purpose:

- Internal install-style build testing.
- Useful before TestFlight if we want a real app build but do not want App Store submission yet.

Command:

```bash
eas build --platform ios --profile preview
```

### `production`

Purpose:

- TestFlight/App Store candidate build.
- Uses build number auto-increment.

Command later:

```bash
eas build --platform ios --profile production
```

Submit later:

```bash
eas submit --platform ios --profile production
```

## Environment Variables

The app uses public Expo env vars:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

For EAS builds, these are configured in the linked Expo/EAS project for:

- `development`
- `preview`
- `production`

The local `.env` remains for Expo Go and local development.

Do not add any Supabase service role key to the app or EAS public environment.

## Before Running First EAS Build

Do these first:

1. Confirm EAS CLI login works.
2. Confirm Expo project link in `app.json`.
3. Confirm `ios.bundleIdentifier` is `com.yuqima.outdoornursery`.
4. Confirm `ios.supportsTablet` is `false` for the first iPhone-only beta.
5. Confirm `ios.buildNumber` is ready for the first build.
6. Confirm icon and splash are acceptable for beta.
7. Confirm EAS environment variables are visible in the Expo dashboard if needed.
8. Run local checks:

```bash
npm run typecheck
npm exec expo export -- --platform ios --output-dir /tmp/nursery-app-export-test
```

## Recommended Next Build

For local owner QA that does not need TestFlight, use an iOS preview build.

Recommended sequence:

```bash
npx eas-cli@latest build --platform ios --profile preview
```

After installing the preview build, open it directly from the Home screen. It should not require Metro.

If EAS CLI is installed globally, the shorter form also works:

```bash
eas login
eas build:configure
eas build --platform ios --profile preview
```

For the next TestFlight candidate, use a production build with auto-submit:

```bash
npx eas-cli@latest build --platform ios --profile production --auto-submit
```

Latest production candidate:

```text
Version: 0.1.0
Build: 7
Build ID: 03821bed-b085-4bc4-808e-9a87a70cc65b
Submission ID: dcf7cf44-5209-4e04-925a-4b17a27d8373
Status: build finished; EAS submission finished; waiting for App Store Connect/TestFlight processing or availability
```

## Do Not Do Yet

- Do not run Android builds yet.
- Do not add login/accounts just for TestFlight.
- Do not add live location permissions.
- Do not submit to the public App Store.
- Do not use a Supabase service role key in the mobile app.

## Decisions Needed From User

- Whether the current draft icon/splash are good enough for TestFlight.
- Who the first external TestFlight testers are.
