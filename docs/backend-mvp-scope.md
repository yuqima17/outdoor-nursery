# Backend MVP Scope

This document defines the smallest backend that would make Outdoor Nursery usable beyond a local prototype.

The goal is not to build a complex platform. The goal is to serve trustworthy place data and collect feedback safely.

## Recommended Backend Direction

Start with Supabase.

Why:

- Faster to ship a beta.
- Built-in database/auth options.
- Good enough for places, saves, feedback, and admin review.
- Less infrastructure maintenance while the product is still changing.

Avoid a custom backend stack until the product has real usage patterns.

See also:

- [Backend Decisions](backend-decisions.md)
- [Backend Setup Guide](backend-setup-guide.md)
- [Backend Implementation Plan](backend-implementation-plan.md)
- [Supabase Schema SQL](../supabase/schema.sql)
- [Admin Feedback Review](admin-feedback-review.md)

## MVP Backend Responsibilities

Must have:

- Serve published places to the mobile app.
- Store user feedback.
- Store admin review items.
- Track field-level source/trust metadata.
- Support manual content updates.

Can wait:

- Complex recommendation engine.
- Social reviews.
- Full map search backend.
- Nationwide ingestion.
- Payments.
- Advanced analytics.
- Public user profiles.

## Core Tables

### `places`

Published place records.

Important fields:

- `id`
- `name`
- `category`
- `summary`
- `address`
- `city`
- `state`
- `area`
- `latitude`
- `longitude`
- `published_status`
- `created_at`
- `updated_at`

### `place_facts`

Field-level facts and trust metadata.

Example fields:

- `id`
- `place_id`
- `field_path`
- `value_json`
- `trust_level`
- `source_type`
- `source_id`
- `verified_at`
- `expires_at`
- `updated_at`

This lets `amenities.restroom` and `age_guidance` have different trust levels.

### `place_sources`

Source URLs and external IDs.

Example fields:

- `id`
- `place_id`
- `source_type`
- `url`
- `external_id`
- `last_checked_at`

### `feedback`

Raw user feedback.

Example fields:

- `id`
- `place_id`
- `user_id`
- `feedback_type`
- `note`
- `created_at`
- `status`

### `review_queue`

Admin review items.

Example fields:

- `id`
- `place_id`
- `field_path`
- `current_value_json`
- `proposed_value_json`
- `source_feedback_ids`
- `priority`
- `status`
- `reviewed_by`
- `reviewed_at`

## Optional Tables For Beta

### `users`

Only needed if feedback, saved places, or preferences need identity.

MVP can start with anonymous device feedback.

### `saved_places`

Only needed when saves should sync across devices.

Local saves are enough for the prototype.

### `admin_users`

Needed when more than one person reviews content.

## API Surface

Minimum endpoints or data access patterns:

- `GET /places`
- `GET /places/:id`
- `POST /feedback`
- `GET /admin/review-items`
- `POST /admin/review-items/:id/approve`
- `POST /admin/review-items/:id/dismiss`

If using Supabase/Firebase, these may be implemented through SDK queries and serverless functions instead of a traditional REST API.

## Beta Readiness Checklist

Before beta:

- Place records are served from backend, not bundled JSON.
- Top 10 places have manually reviewed caregiver notes.
- Feedback submission works from the app.
- Admin review queue exists.
- Production data has source and trust metadata.
- Sensitive user notes are not shown publicly before review.
- Privacy policy explains feedback collection.

## Not Yet Decided

These decisions need user/product input:

- Supabase vs Firebase.
- Whether users need accounts for beta.
- Whether anonymous feedback is allowed.
- Whether admin review can be internal-only at first.
- Whether the app should launch iOS-only first or iOS + Android.
