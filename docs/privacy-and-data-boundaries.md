# Privacy And Data Boundaries

This document defines the current MVP data boundary for Outdoor Nursery.

It is not a final privacy policy. It is a product and engineering guardrail so the prototype does not collect more data than it needs.

For the parent-facing draft policy, see [Privacy Policy Draft](privacy-policy-draft.md).

## Current MVP Data Collection

The app currently stores:

- Saved place ids on the device.
- Selected quick feedback buttons on the device.
- An anonymous device id in device storage.
- Quick feedback rows in Supabase when configured.

The app currently does not collect:

- Parent name.
- Child name.
- Email address.
- Phone number.
- Precise live location history.
- Photos.
- Contacts.
- Payment information.

## Anonymous Device ID

Purpose:

- Reduce duplicate feedback from the same test device.
- Understand whether multiple devices are reporting the same issue.

Current format:

```text
anon_<timestamp>_<random>
```

Rules:

- Do not display device ids publicly.
- Do not treat device ids as user accounts.
- Do not use device ids for advertising.
- Do not combine device ids with personal identity unless the user explicitly creates an account later.

## Feedback Data

Quick feedback rows include:

- `place_id`
- `device_id`
- `feedback_type`
- `source`
- `status`
- `metadata`
- `created_at`

The feedback is used for:

- Finding stale place data.
- Prioritizing manual review.
- Improving caregiver notes after review.

The feedback is not used for:

- Public reviews.
- Public user profiles.
- Automatic public fact updates.
- Ads or targeting.

## Location

Current app behavior:

- The app has coordinates for places.
- The app can open external directions links.
- The app does not collect the user's live GPS location.

Future location features should require a separate decision before implementation.

Examples that need user/product review first:

- Nearby places based on live location.
- Distance sorting using current location.
- Background location.
- Visit detection.

## Child And Family Data

Do not collect child-specific personal data in MVP.

Avoid fields like:

- Child name.
- Birthday.
- Medical needs.
- School/daycare.
- Photos of children.

If future personalization is needed, prefer broad preference settings first.

Examples:

- Preferred outing duration.
- Stroller preference.
- Avoid paid parking.
- Needs restroom nearby.

## Before Beta

Before public beta:

- Draft a plain-language privacy policy.
- Decide whether anonymous feedback is enough.
- Decide whether accounts are needed.
- Decide retention rules for feedback.
- Decide whether users can delete feedback.
- Confirm Supabase RLS policies still block public feedback reads.

## Current Safety Rule

Parent-submitted feedback should remain private operational data until reviewed.

It can influence public place facts only after manual review.
