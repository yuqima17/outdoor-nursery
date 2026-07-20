# Backend Setup Guide

This guide is for creating the first Supabase project.

Do this only when ready to start backend setup. The current app still works from local JSON.

## What You Need

- A Supabase account.
- The project name.
- A database password saved somewhere safe.

Use the Free plan.

## Create The Project

1. Go to [supabase.com](https://supabase.com).
2. Sign in or create an account.
3. Click `New project`.
4. Choose an organization.
5. Project name:

```text
outdoor-nursery-dev
```

6. Generate or enter a strong database password.
7. Choose a region close to the first users.

Recommended region:

```text
US West
```

8. Create the project.

## What To Ignore For Now

Do not set up yet:

- Auth providers.
- Storage buckets.
- Edge Functions.
- Realtime.
- OAuth login.
- Production custom domains.

Those can wait.

## Where To Find Project Values

After the project is created:

1. Open the Supabase project.
2. Go to `Project Settings`.
3. Go to `API`.
4. Find:

```text
Project URL
anon public key
```

Do not share the service role key in the app.

## Local Env File Later

When the app is ready to connect to Supabase, create a local env file.

Do not commit real keys.

Create `.env` from [.env.example](../.env.example):

```bash
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The `anon` key is okay for mobile app reads when Row Level Security policies are configured correctly.

After adding or changing `.env`, restart Expo with:

```bash
npm run start:clear
```

## First SQL Step

After creating the project:

1. Open `SQL Editor`.
2. Copy the contents of [supabase/schema.sql](../supabase/schema.sql).
3. Run the SQL.
4. Confirm the tables appear in `Table Editor`.

Do not import data yet. Schema first, seed import second.

## Seed Import Step

After the schema has run successfully:

1. Open `SQL Editor`.
2. Copy the contents of [supabase/seed.sql](../supabase/seed.sql).
3. Run the SQL.
4. Open `Table Editor`.
5. Confirm:
   - `places` has 30 rows.
   - `place_sources` has source rows.
   - `place_facts` has field-level trust rows.

The seed file is safe to rerun for the same 30 places. It upserts places and facts, and refreshes source rows for those places.

If [data/sample-places.json](../data/sample-places.json) changes, regenerate the seed file first:

```bash
node scripts/generate-supabase-seed.js
```

## App Connection Step

After the seed import works:

1. Add the Project URL and anon public key to `.env`.
2. Restart Expo with `npm run start:clear`.
3. Open the app in Expo Go.
4. Confirm Home still shows 30 Bay Area places.

The app keeps local JSON fallback, so a missing or incorrect env file should not break the phone preview.

## Safety Notes

- Keep the database password private.
- Never put the service role key in Expo or frontend code.
- Start with Free plan.
- Upgrade later only when beta stability or usage requires it.
