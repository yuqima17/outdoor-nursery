# Data Schema

This document defines the first version of the place data model for the U.S. MVP.

The schema should support local seed data first. It can later become the shape of database records and API responses.

## Seed Dataset File

The first local dataset lives at [data/sample-places.json](../data/sample-places.json).

The file uses this wrapper:

```json
{
  "metadata": {
    "name": "string",
    "version": "string",
    "market": {
      "country": "string",
      "region": "string",
      "state": "string"
    },
    "created_at": "YYYY-MM-DD",
    "description": "string"
  },
  "places": []
}
```

## Place Record

```json
{
  "id": "string",
  "name": "string",
  "category": "park | playground | outdoor_mall",
  "summary": "string",
  "city": "string",
  "state": "string",
  "area": "string",
  "address": "string",
  "latitude": "number",
  "longitude": "number",
  "external_ids": {
    "google_place_id": "string | null",
    "osm_id": "string | null"
  },
  "age_fit": ["baby", "toddler", "preschool"],
  "age_guidance": {
    "display": "string",
    "note": "string"
  },
  "cost": {
    "type": "free | paid | mixed | unknown",
    "price_level": "free | $ | $$ | varies | unknown",
    "label": "string",
    "note": "string"
  },
  "reservation": {
    "required": "not_required | recommended | required | unknown",
    "note": "string"
  },
  "visit_duration": {
    "min_minutes": "number",
    "max_minutes": "number",
    "note": "string"
  },
  "amenities": {
    "stroller_friendly": "yes | no | partial | unknown",
    "restroom": "yes | no | seasonal | unknown",
    "changing_table": "yes | no | unknown",
    "baby_care": {
      "status": "available | limited | not_reported | not_available",
      "label": "string",
      "changing_table": "yes | no | not_reported",
      "family_restroom": "yes | no | not_reported",
      "nursing_space": "yes | no | not_reported",
      "quiet_area": "yes | limited | no | not_reported",
      "note": "string"
    },
    "parking": "easy | limited | paid | street | unknown",
    "parking_fee": {
      "price_level": "free | $ | $$ | varies | unknown",
      "label": "string",
      "note": "string"
    },
    "shade": "good | partial | limited | unknown",
    "food_nearby": "yes | no | limited | unknown",
    "seating": "yes | no | limited | unknown",
    "indoor_backup": "yes | no | nearby | unknown"
  },
  "weather_fit": {
    "best_conditions": ["mild", "sunny", "cloudy", "after_rain", "hot_day", "cold_day"],
    "avoid_conditions": ["heavy_rain", "extreme_heat", "high_wind", "muddy_after_rain"],
    "note": "string"
  },
  "parent_notes": {
    "best_time": "string",
    "before_you_go": ["string"],
    "what_to_bring": ["string"],
    "safety_notes": ["string"],
    "avoid_notes": ["string"]
  },
  "tags": ["string"],
  "source": {
    "primary": "manual | google_places | openstreetmap | official_site | city_open_data",
    "urls": ["string"],
    "last_verified_at": "YYYY-MM-DD"
  },
  "data_quality": {
    "base_details": "official_source | third_party_source | manual | unknown",
    "caregiver_notes": "verified_visit | trusted_parent_report | needs_parent_verification"
  }
}
```

## Required MVP Fields

Every MVP place should have:

- `id`
- `name`
- `category`
- `summary`
- `city`
- `state`
- `area`
- `address`
- `latitude`
- `longitude`
- `age_fit`
- `age_guidance`
- `cost`
- `cost.label`
- `cost.price_level`
- `reservation`
- `visit_duration`
- `amenities.stroller_friendly`
- `amenities.restroom`
- `amenities.baby_care`
- `amenities.parking`
- `amenities.parking_fee`
- `amenities.shade`
- `weather_fit.note`
- `parent_notes.best_time`
- `parent_notes.before_you_go`
- `parent_notes.safety_notes`
- `tags`
- `source.last_verified_at`
- `data_quality`

## Age Fit Values

- `baby`: roughly 0 to 18 months
- `toddler`: roughly 18 months to 3 years
- `preschool`: roughly 3 to 5 years

Age fit should describe practical suitability, not strict admission rules.

## Age Guidance

Use `age_fit` for filtering and quick-fit context. Use `age_guidance` for both card and detail `Best for` display.

Recommended behavior:

- Place cards show `age_guidance.display`, matching the detail page.
- Detail pages show `age_guidance.display`, such as `0-8 / all ages`, `2-8 years`, `5-12 years`, or `6 mo+ / all ages`.
- Detail pages also show `age_guidance.note` to explain the practical fit.

The display range is a parent-facing planning guide, not a strict safety or admission rule. It should account for how different ages use the same place:

- Babies may fit through stroller, carrier, blanket, or picnic mode.
- Toddlers need short distances, bathrooms, shade, and simple play.
- Preschool and younger elementary kids may need more active playground equipment or longer walks.
- All-ages places should not look restricted to young children. Use wording like `0-8 / all ages` for broad parks and `6 mo+ / all ages` for outdoor malls when the venue works for adults and older kids too, but is especially practical for families with younger children.

## Cost, Parking, And Reservation

Use user-facing labels instead of showing internal values like `mixed`.

Recommended display:

- `cost.label`: short card/detail label, such as `Free admission`, `$ admission`, `$ add-ons`, or `Check cost`.
- `cost.price_level`: rough cost level, not a verified exact price.
- `cost.note`: plain-language detail for the place detail page.
- `amenities.parking`: availability, such as `easy`, `limited`, `paid`, or `street`.
- `amenities.parking_fee.label`: short fee label, such as `Usually free`, `$ parking`, `Free/$`, or `Street signs`.
- `amenities.parking_fee.note`: practical parking fee guidance.
- `reservation.required`: whether normal family visits need advance booking.
- `reservation.note`: explain caveats, such as groups, events, restaurants, or special programs.

For the prototype, avoid exact dollar amounts unless they are verified from a current official source. Use `$` / `$$` / `varies` labels first, then add exact rates later through official-source verification.

## Baby Care Facilities

Use `amenities.baby_care` for low-age caregiving support instead of making the product only about changing tables.

Baby care can include:

- Changing table
- Family restroom
- Nursing-friendly spot
- Quiet area for feeding, calming down, or stroller naps
- Sink access or restroom setup that makes diaper changes easier

Recommended UI behavior:

- Show `Baby care: Not reported` when no parent has confirmed details yet.
- Do not show `No changing table` unless a reliable source or parent report confirms absence.
- Keep `changing_table` as a specific sub-fact, but make the user-facing concept broader.

The current seed data uses `Not reported` for all places because these details need parent verification.

## Category Values

- `park`
- `playground`
- `outdoor_mall`

Future categories can include:

- `trail`
- `garden`
- `waterfront`
- `farm`
- `museum`
- `indoor_play`
- `zoo`
- `library`

## Caregiver-Friendly Tags

Useful tags include:

- `free`
- `stroller-friendly`
- `restrooms`
- `changing-table`
- `good-shade`
- `easy-parking`
- `food-nearby`
- `short-walk`
- `fenced-playground`
- `water-play`
- `quiet-morning`
- `busy-weekends`
- `indoor-backup`
- `muddy-after-rain`

## Example Place

This is a schema example, not verified production data.

```json
{
  "id": "example-park-001",
  "name": "Example Meadow Park",
  "category": "park",
  "summary": "A calm neighborhood park with an easy walking loop, partial shade, and a small toddler-friendly play area.",
  "city": "Example City",
  "state": "CA",
  "area": "Downtown",
  "address": "100 Example Ave, Example City, CA",
  "latitude": 37.0001,
  "longitude": -122.0001,
  "external_ids": {
    "google_place_id": null,
    "osm_id": null
  },
  "age_fit": ["baby", "toddler"],
  "age_guidance": {
    "display": "0-5 years",
    "note": "Good for babies in stroller or blanket mode and toddlers who can handle short walks and simple play."
  },
  "cost": {
    "type": "free",
    "price_level": "free",
    "label": "Free admission",
    "note": "No entrance fee."
  },
  "reservation": {
    "required": "not_required",
    "note": "No advance reservation expected for normal family visits; check official pages for closures or events."
  },
  "visit_duration": {
    "min_minutes": 45,
    "max_minutes": 90,
    "note": "Good for a short morning or post-nap outing."
  },
  "amenities": {
    "stroller_friendly": "yes",
    "restroom": "yes",
    "changing_table": "unknown",
    "baby_care": {
      "status": "not_reported",
      "label": "Not reported",
      "changing_table": "not_reported",
      "family_restroom": "not_reported",
      "nursing_space": "not_reported",
      "quiet_area": "not_reported",
      "note": "Baby care facilities have not been reported yet."
    },
    "parking": "limited",
    "parking_fee": {
      "price_level": "free",
      "label": "Usually free",
      "note": "Parking is usually free but limited. Arrive early and check posted signs."
    },
    "shade": "partial",
    "food_nearby": "limited",
    "seating": "yes",
    "indoor_backup": "no"
  },
  "weather_fit": {
    "best_conditions": ["mild", "cloudy"],
    "avoid_conditions": ["heavy_rain", "extreme_heat"],
    "note": "Best on mild days; shade is not consistent across the whole park."
  },
  "parent_notes": {
    "best_time": "Morning before the playground gets busy.",
    "before_you_go": ["Bring snacks and water.", "Check restroom availability if visiting late."],
    "what_to_bring": ["Stroller", "Sun hat", "Small picnic blanket"],
    "safety_notes": ["Watch toddlers near the bike path."],
    "avoid_notes": ["Parking can be tight on weekends."]
  },
  "tags": ["free", "stroller-friendly", "short-walk", "partial-shade"],
  "source": {
    "primary": "manual",
    "urls": [],
    "last_verified_at": "2026-07-18"
  }
}
```
