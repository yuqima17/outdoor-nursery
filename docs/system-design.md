# System Design

This is a lightweight system design for after the local-data frontend prototype.

The MVP should not start here. This document exists to keep the future architecture visible without overbuilding too early.

## Phase 1: Local Mobile Prototype

```text
Phone / simulator
  -> Expo + React Native app
  -> local JSON seed data
  -> local saved places
  -> external Google Maps directions link
```

No backend is required.

## Phase 2: Hosted Read-Only App

```text
Frontend
  -> Static JSON or simple API
  -> Place detail pages
  -> External maps
```

Use this when the seed data is good enough to share with test users.

## Phase 3: Backend With Feedback

```text
Frontend
  -> API
      -> Places
      -> Feedback
      -> Saved places
  -> Database
  -> Admin review workflow
```

Suggested backend responsibilities:

- Serve places.
- Store feedback.
- Store user saves if accounts exist.
- Track source and verification metadata.
- Support admin review before changing public place facts.

See also:

- [Backend MVP Scope](backend-mvp-scope.md)
- [Admin Review Flow](admin-review-flow.md)
- [Data Trust Model](data-trust-model.md)

## Phase 4: Data Ingestion

```text
Official sources / APIs
  -> ingestion jobs
  -> staging records
  -> admin review
  -> published place data
```

Potential sources:

- Google Places
- OpenStreetMap
- City and county open data
- Official venue websites
- Weather.gov

## Database Entities

Core:

- `places`
- `place_sources`
- `place_tags`
- `feedback`

Later:

- `users`
- `saved_places`
- `admin_reviews`
- `source_import_jobs`
- `weather_snapshots`

## Important Product Rule

Automated sources should not directly overwrite caregiver-facing recommendations.

Use automation to find and flag changes. Use review before changing content that affects parent decisions.

## Framework Recommendation

Use Expo + React Native + TypeScript for the first real app prototype.

Reasons:

- The user wants a phone app, not only a web demo.
- The React mental model still applies.
- Local JSON data can be bundled easily.
- Navigation, saved places, and maps links can be prototyped without a backend.
- Expo Go can make phone testing faster.

Do not start with native Swift/Kotlin unless the app later needs deep platform-specific features.

## Blocked Decisions

These should wait until after the frontend prototype:

- Final backend framework.
- Database provider.
- Auth provider.
- Map provider.
- Whether to support native-only mobile, web companion, or both long term.
