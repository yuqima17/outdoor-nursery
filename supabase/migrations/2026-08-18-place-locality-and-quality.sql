-- Add locality and data-quality columns for city/region expansion.
-- Safe to run more than once.

alter table places
  add column if not exists country_code text not null default 'US',
  add column if not exists metro_area text,
  add column if not exists region text,
  add column if not exists neighborhood text,
  add column if not exists source_quality text not null default 'needs_recheck',
  add column if not exists last_checked_at date,
  add column if not exists needs_recheck boolean not null default true,
  add column if not exists place_status text not null default 'active';

update places
set
  country_code = coalesce(place_json->>'country_code', country_code, 'US'),
  metro_area = coalesce(place_json->>'metro_area', metro_area, 'San Francisco Bay Area'),
  region = coalesce(place_json->>'region', region, area),
  neighborhood = coalesce(place_json->>'neighborhood', neighborhood),
  source_quality = coalesce(
    place_json #>> '{data_quality,source_quality}',
    source_quality,
    'needs_recheck'
  ),
  last_checked_at = coalesce(
    nullif(place_json #>> '{data_quality,last_checked_at}', '')::date,
    nullif(place_json #>> '{source,last_verified_at}', '')::date,
    last_checked_at
  ),
  needs_recheck = coalesce(
    (place_json #>> '{data_quality,needs_recheck}')::boolean,
    needs_recheck,
    true
  ),
  place_status = coalesce(
    place_json #>> '{data_quality,place_status}',
    place_status,
    'active'
  );

create index if not exists places_country_code_idx on places(country_code);
create index if not exists places_metro_area_idx on places(metro_area);
create index if not exists places_region_idx on places(region);
create index if not exists places_city_idx on places(city);
create index if not exists places_place_status_idx on places(place_status);
create index if not exists places_needs_recheck_idx on places(needs_recheck);
