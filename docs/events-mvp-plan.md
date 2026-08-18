# Events MVP Plan

Events are a strong future feature, but they should start as curated data with admin review, not fully automated web scraping.

## Product Goal

Help parents answer:

```text
Is there something baby- or toddler-friendly happening soon?
```

Examples:

- Outdoor story time
- Park play day
- Family-friendly farmers market
- Mall kid event
- Library event with outdoor nearby backup
- Seasonal festival that is stroller-friendly enough

## MVP Scope

Start with upcoming events for the first launch market only.

Recommended constraints:

- United States only.
- Same first metro area as places.
- Next 7 to 21 days.
- Free or low-cost events first.
- Official source links only.
- Manual/admin review before publishing.

## Event Record

Suggested first fields:

```json
{
  "id": "string",
  "title": "string",
  "category": "story_time | market | festival | nature | play | seasonal | other",
  "summary": "string",
  "place_id": "string | null",
  "venue_name": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "metro_area": "string",
  "region": "string",
  "starts_at": "ISO datetime",
  "ends_at": "ISO datetime | null",
  "age_fit": ["baby", "toddler", "preschool"],
  "cost_label": "Free | $ | $$ | Check cost",
  "reservation_required": "not_required | recommended | required | unknown",
  "stroller_note": "string",
  "weather_note": "string",
  "source_url": "string",
  "last_checked_at": "YYYY-MM-DD",
  "expires_at": "ISO datetime",
  "status": "draft | published | expired | rejected"
}
```

## Suggested Database Tables

Later migration:

- `events`
- `event_sources`
- `event_import_runs`
- `event_review_queue`

Keep events separate from places. An event can optionally link to a place with `place_id`, but many events will be at temporary venues or official civic locations.

## Ingestion Pipeline

Recommended first pipeline:

```text
Official event pages / calendars / RSS / ICS
  -> daily import job
  -> staging rows
  -> duplicate check
  -> admin review
  -> published events
  -> app
```

Do not start with a job that publishes directly into the app.

## Scheduled Job Options

Good first options:

- GitHub Actions daily job that runs a Node script and writes staging rows to Supabase.
- Supabase Edge Function with a scheduled trigger.

For this app, GitHub Actions is simpler first because the repository already exists and the pipeline can be reviewed in pull requests.

## Source Priority

Use sources in this order:

1. Official city, county, park, library, or venue event pages.
2. Official calendars with RSS or ICS.
3. Known family venues with official event pages.
4. Carefully reviewed third-party event listings.

Avoid copying long event descriptions. Store a short original summary and link to the official source.

## Safety Rules

- Events expire automatically after `expires_at`.
- Imported events start as `draft`.
- Duplicate events should be merged before publishing.
- If age fit, price, or reservation status is unclear, show `Check official event page`.
- Do not scrape private social media content.
- Do not show events for children if the source does not clearly indicate family suitability.

## When To Build

Build events after:

- Place data expansion workflow is stable.
- City/region filtering exists or is planned.
- Admin review flow is understandable.
- App Store review is no longer blocking basic release work.
