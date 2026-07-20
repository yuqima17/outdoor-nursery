const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const samplePath = path.join(rootDir, "data", "sample-places.json");
const outputPath = path.join(rootDir, "supabase", "seed.sql");

const sample = JSON.parse(fs.readFileSync(samplePath, "utf8"));
const places = sample.places;

const factPaths = [
  "age_fit",
  "age_guidance",
  "cost",
  "reservation",
  "visit_duration",
  "amenities.stroller_friendly",
  "amenities.restroom",
  "amenities.baby_care",
  "amenities.parking",
  "amenities.parking_fee",
  "amenities.shade",
  "amenities.food_nearby",
  "amenities.seating",
  "amenities.indoor_backup",
  "weather_fit",
  "parent_notes",
  "data_quality",
];

function sqlString(value) {
  if (value === null || value === undefined) {
    return "null";
  }

  return `'${String(value).replace(/'/g, "''")}'`;
}

function sqlJson(value) {
  return `${sqlString(JSON.stringify(value))}::jsonb`;
}

function sqlDate(value) {
  return value ? `${sqlString(value)}::date` : "null";
}

function sqlTextArray(values) {
  if (!values || values.length === 0) {
    return "array[]::text[]";
  }

  return `array[${values.map(sqlString).join(", ")}]::text[]`;
}

function getPathValue(source, fieldPath) {
  return fieldPath.split(".").reduce((value, key) => {
    if (value === null || value === undefined) {
      return undefined;
    }

    return value[key];
  }, source);
}

function trustForFact(place, fieldPath, value) {
  if (value === undefined || value === null || value === "unknown") {
    return "unknown";
  }

  if (
    fieldPath === "amenities.baby_care" &&
    (value.status === "not_reported" || value.status === "unknown")
  ) {
    return "unknown";
  }

  if (
    fieldPath === "age_fit" ||
    fieldPath === "age_guidance" ||
    fieldPath === "visit_duration" ||
    fieldPath === "weather_fit" ||
    fieldPath === "parent_notes" ||
    fieldPath === "amenities.stroller_friendly" ||
    fieldPath === "amenities.shade" ||
    fieldPath === "amenities.food_nearby" ||
    fieldPath === "amenities.seating" ||
    fieldPath === "amenities.indoor_backup"
  ) {
    return "needs_verification";
  }

  if (
    fieldPath === "cost" ||
    fieldPath === "reservation" ||
    fieldPath === "amenities.parking" ||
    fieldPath === "amenities.parking_fee"
  ) {
    return "needs_verification";
  }

  if (
    fieldPath === "amenities.restroom" &&
    place.data_quality.base_details === "official_source"
  ) {
    return "official_verified";
  }

  if (fieldPath === "data_quality") {
    return "needs_verification";
  }

  return "needs_verification";
}

function noteForFact(fieldPath, trustLevel) {
  if (fieldPath === "amenities.baby_care") {
    return "Baby care facilities are not reported yet; parents can confirm changing tables, family restrooms, nursing-friendly spots, and quiet areas.";
  }

  if (fieldPath === "parent_notes") {
    return "Prototype caregiver guidance; needs parent verification before beta.";
  }

  if (trustLevel === "official_verified") {
    return "Seeded from an official source listed for this place.";
  }

  if (trustLevel === "unknown") {
    return "Not reported in seed data.";
  }

  return "Seeded for MVP; recheck before beta.";
}

function sourceRowsForPlace(place) {
  const rows = [];
  const lastChecked = place.source?.last_verified_at;

  for (const url of place.source?.urls || []) {
    rows.push({
      place_id: place.id,
      source_type: place.source?.primary || "seed_source",
      url,
      external_id: null,
      last_checked_at: lastChecked,
      notes: "Seed source URL.",
    });
  }

  if (place.external_ids?.google_place_id) {
    rows.push({
      place_id: place.id,
      source_type: "google_places",
      url: null,
      external_id: place.external_ids.google_place_id,
      last_checked_at: lastChecked,
      notes: "Seed external ID.",
    });
  }

  if (place.external_ids?.osm_id) {
    rows.push({
      place_id: place.id,
      source_type: "openstreetmap",
      url: null,
      external_id: place.external_ids.osm_id,
      last_checked_at: lastChecked,
      notes: "Seed external ID.",
    });
  }

  return rows;
}

function placeFacts(place) {
  return factPaths
    .map((fieldPath) => {
      const value = getPathValue(place, fieldPath);

      if (value === undefined) {
        return null;
      }

      const trustLevel = trustForFact(place, fieldPath, value);
      const verifiedAt =
        trustLevel === "official_verified" ? place.source?.last_verified_at : null;

      return {
        place_id: place.id,
        field_path: fieldPath,
        value_json: value,
        trust_level: trustLevel,
        source_type: place.source?.primary || "seed_data",
        source_id: null,
        verified_at: verifiedAt,
        expires_at: null,
        notes: noteForFact(fieldPath, trustLevel),
      };
    })
    .filter(Boolean);
}

function buildSeedSql() {
  const ids = places.map((place) => place.id);
  const idList = ids.map(sqlString).join(", ");
  const sourceRows = places.flatMap(sourceRowsForPlace);
  const factRows = places.flatMap(placeFacts);

  const lines = [
    "-- Outdoor Nursery MVP seed data",
    "-- Generated by scripts/generate-supabase-seed.js from data/sample-places.json.",
    "-- Safe to rerun: places and facts are upserted; source rows for these places are refreshed.",
    "",
    "begin;",
    "",
    `delete from place_sources where place_id in (${idList});`,
    "",
    "insert into places (",
    "  id,",
    "  name,",
    "  category,",
    "  summary,",
    "  city,",
    "  state,",
    "  area,",
    "  address,",
    "  latitude,",
    "  longitude,",
    "  tags,",
    "  place_json,",
    "  published_status",
    ") values",
  ];

  lines.push(
    places
      .map((place) =>
        [
          "(",
          [
            sqlString(place.id),
            sqlString(place.name),
            `${sqlString(place.category)}::place_category`,
            sqlString(place.summary),
            sqlString(place.city),
            sqlString(place.state),
            sqlString(place.area),
            sqlString(place.address),
            place.latitude,
            place.longitude,
            sqlTextArray(place.tags),
            sqlJson(place),
            "'published'::published_status",
          ].join(", "),
          ")",
        ].join("")
      )
      .join(",\n")
  );

  lines.push(
    "on conflict (id) do update set",
    "  name = excluded.name,",
    "  category = excluded.category,",
    "  summary = excluded.summary,",
    "  city = excluded.city,",
    "  state = excluded.state,",
    "  area = excluded.area,",
    "  address = excluded.address,",
    "  latitude = excluded.latitude,",
    "  longitude = excluded.longitude,",
    "  tags = excluded.tags,",
    "  place_json = excluded.place_json,",
    "  published_status = excluded.published_status;",
    ""
  );

  if (sourceRows.length > 0) {
    lines.push(
      "insert into place_sources (",
      "  place_id,",
      "  source_type,",
      "  url,",
      "  external_id,",
      "  last_checked_at,",
      "  notes",
      ") values"
    );

    lines.push(
      sourceRows
        .map((source) =>
          [
            "(",
            [
              sqlString(source.place_id),
              sqlString(source.source_type),
              sqlString(source.url),
              sqlString(source.external_id),
              sqlDate(source.last_checked_at),
              sqlString(source.notes),
            ].join(", "),
            ")",
          ].join("")
        )
        .join(",\n")
    );

    lines.push(";", "");
  }

  if (factRows.length > 0) {
    lines.push(
      "insert into place_facts (",
      "  place_id,",
      "  field_path,",
      "  value_json,",
      "  trust_level,",
      "  source_type,",
      "  source_id,",
      "  verified_at,",
      "  expires_at,",
      "  notes",
      ") values"
    );

    lines.push(
      factRows
        .map((fact) =>
          [
            "(",
            [
              sqlString(fact.place_id),
              sqlString(fact.field_path),
              sqlJson(fact.value_json),
              `${sqlString(fact.trust_level)}::trust_level`,
              sqlString(fact.source_type),
              sqlString(fact.source_id),
              sqlDate(fact.verified_at),
              sqlDate(fact.expires_at),
              sqlString(fact.notes),
            ].join(", "),
            ")",
          ].join("")
        )
        .join(",\n")
    );

    lines.push(
      "on conflict (place_id, field_path) do update set",
      "  value_json = excluded.value_json,",
      "  trust_level = excluded.trust_level,",
      "  source_type = excluded.source_type,",
      "  source_id = excluded.source_id,",
      "  verified_at = excluded.verified_at,",
      "  expires_at = excluded.expires_at,",
      "  notes = excluded.notes;",
      ""
    );
  }

  lines.push(
    "commit;",
    "",
    `-- Seeded ${places.length} places, ${sourceRows.length} source rows, and ${factRows.length} fact rows.`
  );

  return lines.join("\n");
}

fs.writeFileSync(outputPath, `${buildSeedSql()}\n`);

console.log(
  `Generated ${path.relative(rootDir, outputPath)} for ${places.length} places.`
);
