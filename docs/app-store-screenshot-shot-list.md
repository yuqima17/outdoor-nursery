# App Store Screenshot Shot List

Last updated: August 13, 2026

Use this when capturing real App Store screenshots. The screenshot checklist explains rules; this file gives the exact shots to collect.

Capture from the latest TestFlight candidate build, not Expo Go and not the development client.

## Required Shot Set

### 1. Home

Goal:

- Show the brand, hero area, search, filters, and first place card.
- Make the app's purpose obvious in the first screenshot.

Screen state:

- Start from a fresh Home screen.
- Make sure no developer status text is visible.
- Keep the location/filter state neutral.
- The first card should have a clean category logo thumbnail.

Optional caption:

```text
Find low-stress outings nearby
```

Reject if:

- The screenshot shows Expo Go, Safari, QR code, developer menu, red error, or internal `Dev` text.
- The hero image is cropped strangely.
- Text is hidden behind the bottom tab bar.

### 2. Place List

Goal:

- Show the card format and quick comparison fields.
- Show the new simple category thumbnails.

Screen state:

- Use Home after scrolling slightly into `Good For Today`.
- Include at least one full place card.
- Prefer a card with easy-to-understand values such as free admission, stroller notes, restroom, and parking.

Optional caption:

```text
Compare parent-important details fast
```

Reject if:

- Old and new thumbnails overlap.
- Age, parking, or stroller text truncates badly.
- The card looks crowded or cuts off the main action buttons.

### 3. Detail Top

Goal:

- Show the place detail summary, Directions/Save, Basic Info, and Family fit notes.

Screen state:

- Open a clean, representative place detail page.
- Pick a place where `Best for`, `Admission`, `Parking`, and `Reserve` are easy to understand.
- The category logo should appear in the detail hero.

Optional caption:

```text
Know the fit before you go
```

Reject if:

- Detail page has no category logo.
- Public copy includes confusing wording such as `for this app`.
- The first visible info cards are misleading or too uncertain.

### 4. Before You Go

Goal:

- Show practical trip-planning data: admission, parking fee, reservation, stroller, restroom, food, baby-care, or parent notes.

Screen state:

- Scroll to the `Before You Go` section.
- Choose a place where the notes feel useful and not overly vague.
- If baby-care is unknown, `Not reported` is acceptable.

Optional caption:

```text
See parking, restroom, and stroller notes
```

Reject if:

- The screenshot promises exact hours, exact fees, or confirmed facilities when the data is not confirmed.
- The visible note is mostly placeholder text.
- Important labels are cut off.

### 5. Quick Feedback

Goal:

- Show paired voting and anonymous feedback.

Screen state:

- Scroll to quick feedback.
- Select one option in one or two vote pairs so the visual state is clear.
- Do not show unnecessary vote count clutter above the controls.

Optional caption:

```text
Vote on what matched your visit
```

Reject if:

- A selected vote cannot be visually distinguished.
- Tapping again cannot cancel the selection in the app build being captured.
- The text makes it look like a public review or personal review system.

## Optional Shot

### 6. Saved

Goal:

- Show users can save places for later.

Screen state:

- Save two or three places first.
- Open the Saved tab.
- Avoid empty state for the public screenshot.

Optional caption:

```text
Save ideas for later
```

Reject if:

- Saved tab is empty.
- Saved cards show outdated thumbnails or internal labels.

## Capture Order

Recommended order on phone:

1. Open TestFlight app.
2. Capture Home.
3. Scroll Home and capture Place List.
4. Open a place and capture Detail Top.
5. Scroll detail and capture Before You Go.
6. Scroll detail and capture Quick Feedback.
7. Save a few places and capture Saved if needed.

## File Naming

After capture, use names like:

```text
01-home.png
02-place-list.png
03-detail-top.png
04-before-you-go.png
05-quick-feedback.png
06-saved.png
```

## User Review Needed

- Choose the final place used for the detail screenshots.
- Confirm whether raw screenshots are good enough or whether Codex should add simple caption frames.
- Upload the final files in App Store Connect.
