-- Outdoor Nursery manual place data update templates
-- Use these in Supabase SQL Editor after a review_queue item has been manually reviewed.
--
-- Safety:
-- - Most write examples are commented out by default.
-- - Replace placeholders before running.
-- - Prefer running one transaction per place/field update.
-- - Public app data comes from places.place_json.
-- - Field trust/source metadata comes from place_facts.

-- 1. Preview the current public place JSON and field fact
-- Replace both placeholders before running.
select
  places.id,
  places.name,
  places.place_json #> '{replace,json,path}' as current_place_json_value,
  place_facts.field_path,
  place_facts.value_json as current_fact_value,
  place_facts.trust_level,
  place_facts.source_type,
  place_facts.source_id,
  place_facts.verified_at,
  place_facts.expires_at,
  place_facts.notes
from places
left join place_facts
  on place_facts.place_id = places.id
 and place_facts.field_path = 'replace.with.field_path'
where places.id = 'replace-with-place-id';

-- 2. Update one JSON field and upsert the matching place_facts row
-- Example field path mapping:
-- - JSON path '{amenities,parking}' maps to fact path 'amenities.parking'
-- - JSON path '{amenities,parking_fee}' maps to fact path 'amenities.parking_fee'
-- - JSON path '{reservation}' maps to fact path 'reservation'
-- - JSON path '{parent_notes}' maps to fact path 'parent_notes'
--
-- begin;
--
-- update places
-- set place_json = jsonb_set(
--   place_json,
--   '{replace,json,path}',
--   'replace-with-json-value'::jsonb,
--   true
-- )
-- where id = 'replace-with-place-id';
--
-- insert into place_facts (
--   place_id,
--   field_path,
--   value_json,
--   trust_level,
--   source_type,
--   source_id,
--   verified_at,
--   expires_at,
--   notes
-- ) values (
--   'replace-with-place-id',
--   'replace.with.field_path',
--   'replace-with-json-value'::jsonb,
--   'needs_verification'::trust_level,
--   'admin_review',
--   'replace-with-review-item-id',
--   current_date,
--   null,
--   'Updated after admin review. Evidence: replace-with-short-evidence.'
-- )
-- on conflict (place_id, field_path)
-- do update set
--   value_json = excluded.value_json,
--   trust_level = excluded.trust_level,
--   source_type = excluded.source_type,
--   source_id = excluded.source_id,
--   verified_at = excluded.verified_at,
--   expires_at = excluded.expires_at,
--   notes = excluded.notes;
--
-- commit;

-- 3. Example: parking became harder than listed
-- Use only after review. Adjust wording before running.
--
-- begin;
--
-- update places
-- set place_json = jsonb_set(
--   place_json,
--   '{amenities,parking}',
--   '"limited"'::jsonb,
--   true
-- )
-- where id = 'replace-with-place-id';
--
-- insert into place_facts (
--   place_id,
--   field_path,
--   value_json,
--   trust_level,
--   source_type,
--   source_id,
--   verified_at,
--   expires_at,
--   notes
-- ) values (
--   'replace-with-place-id',
--   'amenities.parking',
--   '"limited"'::jsonb,
--   'trusted_parent_report'::trust_level,
--   'admin_review',
--   'replace-with-review-item-id',
--   current_date,
--   null,
--   'Parent feedback indicated parking can be difficult; updated after admin review.'
-- )
-- on conflict (place_id, field_path)
-- do update set
--   value_json = excluded.value_json,
--   trust_level = excluded.trust_level,
--   source_type = excluded.source_type,
--   source_id = excluded.source_id,
--   verified_at = excluded.verified_at,
--   expires_at = excluded.expires_at,
--   notes = excluded.notes;
--
-- commit;

-- 4. Example: update parking fee guidance
-- Use when an official or reviewed source confirms the fee guidance.
--
-- begin;
--
-- update places
-- set place_json = jsonb_set(
--   place_json,
--   '{amenities,parking_fee}',
--   '{"price_level":"$","label":"$ parking","note":"Paid parking may apply. Check posted rates or the official site before going."}'::jsonb,
--   true
-- )
-- where id = 'replace-with-place-id';
--
-- insert into place_facts (
--   place_id,
--   field_path,
--   value_json,
--   trust_level,
--   source_type,
--   source_id,
--   verified_at,
--   expires_at,
--   notes
-- ) values (
--   'replace-with-place-id',
--   'amenities.parking_fee',
--   '{"price_level":"$","label":"$ parking","note":"Paid parking may apply. Check posted rates or the official site before going."}'::jsonb,
--   'official_verified'::trust_level,
--   'official_site',
--   'replace-with-source-url-or-review-item-id',
--   current_date,
--   current_date + 180,
--   'Parking fee guidance updated from official source review.'
-- )
-- on conflict (place_id, field_path)
-- do update set
--   value_json = excluded.value_json,
--   trust_level = excluded.trust_level,
--   source_type = excluded.source_type,
--   source_id = excluded.source_id,
--   verified_at = excluded.verified_at,
--   expires_at = excluded.expires_at,
--   notes = excluded.notes;
--
-- commit;

-- 5. Example: update broader baby care details
-- Do not claim unavailable facilities unless absence is verified.
--
-- begin;
--
-- update places
-- set place_json = jsonb_set(
--   place_json,
--   '{amenities,baby_care}',
--   '{
--     "status":"available",
--     "label":"Baby care reported",
--     "changing_table":"yes",
--     "family_restroom":"yes",
--     "nursing_space":"not_reported",
--     "quiet_area":"limited",
--     "note":"Parent report indicates changing table and family restroom are available; nursing space not reported."
--   }'::jsonb,
--   true
-- )
-- where id = 'replace-with-place-id';
--
-- insert into place_facts (
--   place_id,
--   field_path,
--   value_json,
--   trust_level,
--   source_type,
--   source_id,
--   verified_at,
--   expires_at,
--   notes
-- ) values (
--   'replace-with-place-id',
--   'amenities.baby_care',
--   '{
--     "status":"available",
--     "label":"Baby care reported",
--     "changing_table":"yes",
--     "family_restroom":"yes",
--     "nursing_space":"not_reported",
--     "quiet_area":"limited",
--     "note":"Parent report indicates changing table and family restroom are available; nursing space not reported."
--   }'::jsonb,
--   'trusted_parent_report'::trust_level,
--   'admin_review',
--   'replace-with-review-item-id',
--   current_date,
--   null,
--   'Baby care details updated from trusted parent report or repeated feedback.'
-- )
-- on conflict (place_id, field_path)
-- do update set
--   value_json = excluded.value_json,
--   trust_level = excluded.trust_level,
--   source_type = excluded.source_type,
--   source_id = excluded.source_id,
--   verified_at = excluded.verified_at,
--   expires_at = excluded.expires_at,
--   notes = excluded.notes;
--
-- commit;

-- 6. Example: append a parent note instead of changing a hard fact
-- This is useful for crowd, wait, value, and kid enjoyment signals.
--
-- begin;
--
-- update places
-- set place_json = jsonb_set(
--   place_json,
--   '{parent_notes,before_you_go}',
--   coalesce(place_json #> '{parent_notes,before_you_go}', '[]'::jsonb)
--     || '["Parent feedback suggests weekends can feel crowded; consider going earlier in the day."]'::jsonb,
--   true
-- )
-- where id = 'replace-with-place-id';
--
-- insert into place_facts (
--   place_id,
--   field_path,
--   value_json,
--   trust_level,
--   source_type,
--   source_id,
--   verified_at,
--   expires_at,
--   notes
-- )
-- select
--   places.id,
--   'parent_notes',
--   places.place_json -> 'parent_notes',
--   'trusted_parent_report'::trust_level,
--   'admin_review',
--   'replace-with-review-item-id',
--   current_date,
--   null,
--   'Parent notes updated after admin review.'
-- from places
-- where places.id = 'replace-with-place-id'
-- on conflict (place_id, field_path)
-- do update set
--   value_json = excluded.value_json,
--   trust_level = excluded.trust_level,
--   source_type = excluded.source_type,
--   source_id = excluded.source_id,
--   verified_at = excluded.verified_at,
--   expires_at = excluded.expires_at,
--   notes = excluded.notes;
--
-- commit;

-- 7. Add or refresh an official source row
-- insert into place_sources (
--   place_id,
--   source_type,
--   url,
--   external_id,
--   last_checked_at,
--   notes
-- ) values (
--   'replace-with-place-id',
--   'official_site',
--   'https://replace-with-source-url',
--   null,
--   current_date,
--   'Admin source check for replace-with-field.'
-- );

-- 8. Mark review item approved and linked feedback applied
-- Run only after public data has been updated.
--
-- begin;
--
-- update review_queue
-- set
--   status = 'approved',
--   reviewed_at = now(),
--   notes = coalesce(notes || E'\n', '') || 'Approved and applied: replace-with-summary'
-- where id = 'replace-with-review-item-id';
--
-- update feedback
-- set
--   status = 'applied',
--   reviewed_at = now()
-- where id::text in (
--   select unnest(source_ids)
--   from review_queue
--   where id = 'replace-with-review-item-id'
-- );
--
-- commit;

-- 9. Verify the updated values
-- Replace placeholders before running.
select
  places.id,
  places.name,
  places.place_json #> '{replace,json,path}' as updated_place_json_value,
  place_facts.value_json as updated_fact_value,
  place_facts.trust_level,
  place_facts.source_type,
  place_facts.source_id,
  place_facts.verified_at,
  place_facts.expires_at,
  place_facts.notes
from places
left join place_facts
  on place_facts.place_id = places.id
 and place_facts.field_path = 'replace.with.field_path'
where places.id = 'replace-with-place-id';
