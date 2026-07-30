# EAS Build Plan

This plan prepares Outdoor Nursery for EAS builds without running a build yet.

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
- First iOS build number is `1`.
- No EAS build has been run yet.

Still missing before a real iOS build:

- Expo account / EAS login.
- App Store Connect app record, before TestFlight submission.
- Public privacy policy URL, before TestFlight submission.

## Current `eas.json`

```json
{
  "build": {
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": {}
    }
  }
}
```

## Profiles

### `preview`

Purpose:

- Internal install-style build testing.
- Useful before TestFlight if we want a real app build but do not want App Store submission yet.

Command later:

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

For EAS builds, these must be available to the build job. Later options:

1. Add them as EAS environment variables/secrets.
2. Use a local `.env` only for local Expo Go testing.

Do not add any Supabase service role key to the app or EAS public environment.

## Before Running First EAS Build

Do these first:

1. Create or confirm Expo account.
2. Install/login with EAS CLI.
3. Confirm `ios.bundleIdentifier` is `com.yuqima.outdoornursery`.
4. Confirm `ios.supportsTablet` is `false` for the first iPhone-only beta.
5. Confirm `ios.buildNumber` is ready for the first build.
6. Confirm icon and splash are acceptable for beta.
7. Confirm `.env` values are set in EAS environment.
8. Run local checks:

```bash
npm run typecheck
npm exec expo export -- --platform ios --output-dir /tmp/nursery-app-export-test
```

## Recommended First Build

For the first real build, use iOS only.

Recommended sequence:

```bash
npx eas-cli login
npx eas-cli build:configure
npx eas-cli build --platform ios --profile preview
```

If EAS CLI is installed globally, the shorter form also works:

```bash
eas login
eas build:configure
eas build --platform ios --profile preview
```

If preview is successful and the app opens correctly, then prepare TestFlight:

```bash
eas build --platform ios --profile production
eas submit --platform ios --profile production
```

## Do Not Do Yet

- Do not run Android builds yet.
- Do not add login/accounts just for TestFlight.
- Do not add live location permissions.
- Do not submit to the public App Store.
- Do not use a Supabase service role key in the mobile app.

## Decisions Needed From User

- Whether the current draft icon/splash are good enough for TestFlight.
- Whether to create a new Expo account or use an existing one.
- Where to host the public privacy policy URL.
