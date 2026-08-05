# Development Status

This file tracks the current implementation state after the first code pass.

## Current App Stack

- Expo SDK 54
- React Native
- TypeScript
- React Navigation
- Local JSON seed data
- AsyncStorage for saved places
- AsyncStorage for prototype feedback selections
- npm package workflow
- Explicit `babel-preset-expo` dev dependency for Metro/Babel resolution
- EAS/TestFlight iOS distribution path

## Implemented

- Expo app configuration.
- TypeScript configuration.
- Bottom tabs:
  - `Go`
  - `Saved`
  - `Profile`
- Stack detail route:
  - `PlaceDetail`
- Local data loading from [data/sample-places.json](../data/sample-places.json).
- TypeScript place model.
- Home/Go screen:
  - Bay Area header
  - Search
  - Category chips
  - Filter chips
  - Family-oriented hero cues
  - Place cards
- Place cards:
  - Category/area
  - Tags
  - Compact age fit
  - Admission label
  - Parking fee summary
  - Stroller guidance
  - Restroom
  - Baby care summary
  - Weather note
  - Directions
  - Details
  - Save button
- Place detail screen:
  - Hero area
  - Basic info
  - Detail-specific age guidance
  - Before You Go
  - Admission, parking fee, and reservation notes
  - Parent Notes
  - Source freshness
  - Quick feedback buttons with local selected state
  - Directions
  - Save
- Saved screen:
  - Empty state
  - Saved place list
- Profile placeholder screen.

## Validation

Completed:

```text
npm install
npm run typecheck
npm exec expo config -- --type public
npm exec expo export -- --platform ios --output-dir /tmp/nursery-app-export-test
```

Results:

```text
tsc --noEmit passed
Expo config loads with SDK 54.0.0
npm install succeeds and package-lock.json is present
iOS Metro bundle/export passed
```

TestFlight validation:

```text
Version: 0.1.0
iOS build number: 6
Distribution: Internal TestFlight
Result: passed owner smoke test on August 5, 2026
External testing: skipped until testers are available
```

Second-pass polish completed:

```text
Home has more baby/children-oriented cues
Place card Best for now uses the same `age_guidance.display` as detail
Stroller copy now reads as guidance rather than a requirement
Quick feedback buttons now save selected state locally per place
Admission, parking fee, and reservation data now display with user-facing labels
Detail age guidance now displays specific age ranges and explanatory notes
```

## Expo Go Compatibility

The app is pinned to Expo SDK 54 because the App Store Expo Go on the test iPhone did not support SDK 56 or SDK 57.

Do not change Expo dependencies back to `latest`. Use pinned SDK-compatible versions in `package.json`, or use `expo install --fix` when intentionally upgrading SDKs. For SDK 55+ on iPhone, plan to use a development build instead of relying on App Store Expo Go.

Data check:

```text
places=30
parks=12
playgrounds=10
outdoor_malls=8
age_guidance=30
source_urls=30
base_details_official_source=30
caregiver_notes_needs_parent_verification=30
baby_care_not_reported=30
changing_table_subfact_unknown=30
```

Data readiness:

```text
Prototype-ready: yes
Production-ready: no
Main blockers: parent verification, baby care facility reports, restroom spot checks, exact parking/admission verification
```

## Needs Manual QA

Run the app and check:

- Home baby/children cues feel warm but not childish.
- Place cards are scannable and Best for no longer truncates awkwardly.
- Admission, parking fee, and reservation labels are clear enough for a parent skimming cards.
- Baby care reads as not reported, not as unavailable.
- Detail age guidance helps a parent decide whether the outing fits babies, toddlers, preschoolers, or older kids.
- All-ages places such as outdoor malls do not look limited to ages 0-6.
- Detail page is not too long or overwhelming.
- Save/unsave feels obvious.
- Directions open the expected maps URL.
- Filter chips feel useful.
- Detail feedback buttons visibly select/unselect.
- Quick feedback choices feel useful for a U.S. parent/caregiver.
- Unknown values are not visually over-confident.
- Caregiver notes feel useful even though they still need verification.

## Blocked / Not Done

- No account system.
- No real user-submitted caregiver note flow yet.
- No embedded map.
- External TestFlight is skipped until testers are available.

## How To Run

Use a modern Node version. Node 22 is recommended; see [.nvmrc](../.nvmrc).

From a normal macOS Terminal, do not use the Codex bundled Node path. Run:

```bash
npm install
npm run start:clear
```

Then choose Expo Go, iOS simulator, Android emulator, or web from the Expo CLI.

If local Node is too old:

```bash
nvm install
nvm use
```

If Expo Go still shows a compatibility error:

1. Stop the dev server.
2. Run `npm install`.
3. Restart with `npm run start:clear`.
4. In Expo Go, go home and reopen the project from the new QR code.
5. If needed, clear the Metro cache with `npm exec expo start -- --clear`.

If Expo Go shows `Cannot find module 'babel-preset-expo'`:

1. Stop the dev server.
2. Run `npm install`.
3. Confirm `babel-preset-expo` exists with `npm ls babel-preset-expo --depth=0`.
4. Restart with `npm run start:clear`.
5. In Expo Go, press `Reload JS` or reopen the project from the QR code.

If Expo tries to write to `~/.expo` in a restricted environment, run with a writable temporary home:

```bash
EXPO_NO_TELEMETRY=1 HOME=/private/tmp/nursery-expo-home PATH=/Users/yuqima/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/yuqima/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH npm exec expo start -- --localhost
```

That workaround is for restricted Codex execution only, not for a normal user Terminal.
