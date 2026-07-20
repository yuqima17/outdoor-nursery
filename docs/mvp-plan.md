# MVP Plan

## Product Position

Outdoor Nursery is not trying to replace Google Maps, Yelp, or city park websites.

The MVP should prove a narrower idea:

> Parents and caregivers need a place guide that explains whether an outing will actually work with a baby or toddler.

The product value comes from caregiver-specific context: stroller access, restrooms, shade, parking, food nearby, safety notes, and realistic outing tips.

## First Market

Start with one U.S. metro area. Bay Area is the recommended working default because it has a mix of parks, playgrounds, trails, outdoor malls, waterfronts, and weather variation.

The first market can be changed later, but the MVP should not start with nationwide coverage.

## First Place Categories

- Parks
- Playgrounds
- Outdoor malls

These categories are broad enough to cover different family needs but narrow enough to curate manually.

## First Dataset Size

Start with 30 to 50 places.

Suggested split:

- 10 to 20 parks
- 10 to 20 playgrounds
- 5 to 10 outdoor malls

The first dataset should be quality-first. A smaller list with useful notes is better than a large list with generic information.

## MVP Pages

### Home

Purpose: help users quickly decide where to go.

Must include:

- Current city or area selector
- Search entry
- Category shortcuts
- Recommended places
- Simple filters such as nearest, free, stroller-friendly, restroom, and shaded

### Category List

Purpose: compare places in one category.

Must include:

- Place cards
- Key tags
- Age fit
- Cost
- Parking summary
- Restroom summary
- Weather fit
- Buttons for directions and details

### Place Detail

Purpose: answer the "will this outing be smooth?" question.

Must include:

- Basic information
- Before-you-go checklist
- Stroller, restroom, parking, shade, food, and safety notes
- Best time to visit
- What to bring
- Avoid notes
- Last verified date
- Directions button
- Save button
- Quick feedback buttons

### Saved Places

Purpose: let caregivers keep a short list of places they want to try.

MVP implementation can be local-only.

### Profile

Purpose: keep navigation familiar.

MVP can be a placeholder with no account system.

## MVP Non-Goals

- Nationwide coverage
- Real-time full database ingestion
- User accounts
- Social feed
- Long-form reviews
- Complex recommendation engine
- Admin dashboard
- Full map browsing
- Payments or booking

## Build Order

1. Define the data schema.
2. Create a hand-curated seed dataset.
3. Build the Expo + React Native mobile app prototype using local data.
4. Test whether place cards and place details feel useful.
5. Add lightweight feedback collection.
6. Design backend and ingestion once the data model stabilizes.

## Success Criteria

The MVP is working if a parent can open the app and answer these questions in under one minute:

- Where can I go nearby?
- Is it suitable for my child's age?
- Can I bring a stroller?
- Are restrooms available?
- Is parking manageable?
- Is the weather comfortable for this place?
- What should I know before leaving?
