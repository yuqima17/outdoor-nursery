# Backend Decisions

This document records the current backend direction for Outdoor Nursery.

## Decision

Use Supabase first.

Start on the Supabase Free plan. Upgrade to Pro only when the app is ready for a real beta or usage approaches free limits.

## Why Supabase

Outdoor Nursery is data-heavy and trust-heavy:

- Places have structured fields.
- Feedback should become review items.
- Individual fields need source and trust metadata.
- Admin review should feel like working with tables.

Supabase uses Postgres, which fits this model well.

## Why Not Firebase First

Firebase is a strong product, but Firestore is document-oriented. That can make this product harder later because:

- Field-level trust can become scattered.
- Review queues may need more careful document modeling.
- Relational queries across places, facts, sources, feedback, and reviews are less direct.

Firebase remains possible later, but Supabase/Postgres is the cleaner first fit.

## Cost Decision

Use Supabase Free for prototype backend work.

Free should be enough for:

- Thousands of place records.
- Early feedback submissions.
- Review queue testing.
- Friend-and-family testing.

Upgrade to Supabase Pro when:

- Running a real beta or production-like TestFlight.
- Database approaches 300 MB.
- Storage approaches 700 MB.
- Monthly egress approaches 3 to 4 GB.
- The app needs better stability, backups, or no project pausing.

## Migration Safety Rules

To keep future migration possible:

- Keep backend calls behind a data service layer in the app.
- Avoid Supabase-specific business logic in UI components.
- Avoid realtime, edge functions, and complex auth until needed.
- Keep schema portable and SQL-based.
- Store source and trust metadata with the data.
- Export seed data and migrations in the repo.

## What We Will Use First

Use:

- Postgres tables.
- Supabase REST/SDK read access for published places.
- Supabase insert access for feedback.
- SQL migrations stored in the repo.

Delay:

- Auth.
- Realtime.
- Edge Functions.
- Storage for images.
- Row-level user profiles.
- Admin UI.

## Current Backend Phase

Current phase:

```text
Backend planning and schema prep
```

Not yet started:

```text
Supabase project created
Schema executed
Seed data imported
App connected to Supabase
Feedback submitted to Supabase
```

