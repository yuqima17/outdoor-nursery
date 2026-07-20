# Data Sourcing

The data strategy should separate general place data from caregiver-specific judgment.

## Two Data Layers

### Base Place Data

Base data answers:

- What is this place called?
- Where is it?
- What type of place is it?
- Is it open to the public?
- How do users navigate there?

Possible sources:

- Google Places API
- OpenStreetMap
- Foursquare Places
- National Park Service API
- City and county open data portals
- Official park, mall, or venue websites

### Caregiver-Friendly Data

Caregiver data answers:

- Is it easy with a stroller?
- Are restrooms close and usable?
- Are there baby care facilities, such as a changing table, family restroom, nursing-friendly spot, or quiet area?
- Is shade good enough for a baby?
- Is parking stressful?
- Is the walking route toddler-safe?
- What time is best?
- What should parents bring?
- What should parents avoid?

Possible sources:

- Manual research
- Parent visits
- User feedback
- Official amenity pages
- OpenStreetMap tags for toilets, changing tables, wheelchair access, paths, and playground equipment
- Weather services for day-of suitability

This second layer is the product's main value.

## Recommended MVP Approach

Do not start with automated nationwide scraping.

Start with:

- One U.S. metro area
- 30 to 50 hand-curated places
- Manual verification notes
- Source URLs saved for each record
- A simple `last_verified_at` date

The frontend prototype should use this local dataset first. API integrations can come later.

## Source Priority

For MVP records, use this priority:

1. Manual caregiver notes from real visits or trusted local knowledge.
2. Official place website or city/county park page.
3. Google Places for place identity, address, directions, hours, and broad amenities.
4. OpenStreetMap for open map features, paths, toilets, playgrounds, accessibility, and changing table tags.
5. Weather.gov or another weather API for current and forecast-based outing fit.

## Legal And Product Notes

- Store source attribution and verification dates.
- Do not copy long review text from third-party sites.
- Do not treat third-party ratings as the core product score.
- Be careful with Google Places and Yelp data retention rules.
- Store stable external identifiers when allowed, such as Google `place_id` or OSM IDs.
- Keep caregiver notes as first-party content created by the app team or submitted by users.

## Seed Data Workflow

For each place:

1. Add basic identity: name, category, area, address, coordinates.
2. Add source IDs: Google Place ID and/or OSM ID when available.
3. Add MVP amenity values.
4. Add caregiver notes in plain English.
5. Add tags used for filtering.
6. Add `last_verified_at`.
7. Mark unknowns honestly instead of guessing.

## First Validation Question

For every place detail page, ask:

> Would this help a tired parent decide whether to leave the house?

If the answer is no, the place record needs better caregiver notes, not more generic metadata.
