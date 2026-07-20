# Outdoor Nursery

Outdoor Nursery is a U.S.-focused app concept for helping parents and caregivers find baby- and toddler-friendly places to go outside. The focus is practical discovery: parks, playgrounds, stroller-friendly trails, gardens, waterfronts, outdoor malls, and other family-friendly public spaces.

The app should answer a simple question:

> "Where can I take a baby or toddler outside today, and what should I expect when I get there?"

## Main Purpose

- Help families discover nearby outdoor spaces that are safe, accessible, and pleasant for babies and toddlers.
- Surface the details that matter to caregivers, such as stroller access, bathrooms, shade, parking, food options, nursing-friendly areas, quiet spots, and weather exposure.
- Make outings easier to plan by showing age-friendly routes, amenities, crowd expectations, and practical notes from other caregivers.
- Support a range of destinations, including nature trails, parks, playgrounds, outdoor malls, plazas, botanical gardens, beaches, farms, and family-friendly walking areas.

## Core Idea

Most map apps can tell people where a park or trail is. Outdoor Nursery should explain whether that place works for a family with a stroller, diaper bag, snacks, naps, and a small child who may need shade, restrooms, and short walking distances.

## MVP Direction

The first version should stay intentionally small:

- One U.S. metro area.
- Three core categories: parks, playgrounds, and outdoor malls.
- A hand-curated starter dataset of 30 to 50 places.
- A mobile app prototype powered by local seed data.
- No complex backend until the place data model and user experience feel useful.

## Product Docs

- [Product Purpose](docs/product-purpose.md)
- [Audience And Use Cases](docs/audience-and-use-cases.md)
- [MVP Todo](docs/mvp-todo.md)
- [MVP Plan](docs/mvp-plan.md)
- [Frontend Requirements](docs/frontend-requirements.md)
- [Wireframes](docs/wireframes.md)
- [Data Schema](docs/data-schema.md)
- [Data Sourcing](docs/data-sourcing.md)
- [Data Quality Audit](docs/data-quality-audit.md)
- [Top 10 Quality Check](docs/top-10-quality-check.md)
- [Official Recheck Plan](docs/official-recheck-plan.md)
- [Data Trust Model](docs/data-trust-model.md)
- [Seed Data Guide](docs/seed-data-guide.md)
- [Feedback Model](docs/feedback-model.md)
- [Admin Review Flow](docs/admin-review-flow.md)
- [Backend MVP Scope](docs/backend-mvp-scope.md)
- [Backend Decisions](docs/backend-decisions.md)
- [Backend Setup Guide](docs/backend-setup-guide.md)
- [Backend Implementation Plan](docs/backend-implementation-plan.md)
- [Map Strategy](docs/map-strategy.md)
- [System Design](docs/system-design.md)
- [Quality Check](docs/quality-check.md)
- [Place Information](docs/place-information.md)
- [Feature Ideas](docs/feature-ideas.md)

## Seed Data

- [Bay Area Sample Places](data/sample-places.json): 30 starter places for the first mobile app prototype.
- [Supabase Seed SQL](supabase/seed.sql): imports the 30 starter places, source rows, and field-level trust facts.
- [Seed Generator](scripts/generate-supabase-seed.js): regenerates `supabase/seed.sql` from the local JSON data.

## Development

This prototype is now an Expo + React Native + TypeScript app.

The project is pinned to Expo SDK 54 for iPhone Expo Go compatibility. Do not change Expo dependencies to `latest` unless intentionally upgrading the SDK and moving to a development build.

The local workflow uses npm. Do not use pnpm/corepack for this project right now; the user's local pnpm shim was broken and caused startup errors.

Use a modern Node version. Node 22 is recommended; see [.nvmrc](.nvmrc).

From a normal macOS Terminal, do not use the Codex bundled Node path. Run:

```bash
npm install
npm run start:clear
```

Useful checks:

```bash
npm run typecheck
npm exec expo config -- --type public
npm exec expo export -- --platform ios --output-dir /tmp/nursery-app-export-test
```

To read places from Supabase, create a local `.env` from [.env.example](.env.example):

```bash
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Then restart Expo:

```bash
npm run start:clear
```

The app falls back to bundled JSON if Supabase is not configured or unavailable.

If Expo Go shows `Cannot find module 'babel-preset-expo'`, stop the dev server, run `npm install`, then restart with `npm run start:clear`.

If your local Node is too old, install/use Node 22 first:

```bash
nvm install
nvm use
```
