# Local Save MVP

The first Save version is device-local and does not require login.

## Current Behavior

- A parent can save or unsave a place from the Home place card.
- A parent can save or unsave a place from the Place Detail page.
- Saved places appear in the Saved tab.
- Saved place IDs are stored with `AsyncStorage` on the current phone.
- Saved state persists after app reloads.

## Current Limits

- Saves do not sync across phones.
- Saves are not connected to Supabase yet.
- If the app is deleted, local saves may be removed by the device.
- There is no account, profile, or cloud backup for saved places in the MVP.

## Future Backend Upgrade

When accounts are added, create a `saved_places` table with:

- `id`
- `user_id`
- `place_id`
- `created_at`

Keep local saves as a fallback for anonymous users, then migrate or merge them after login.
