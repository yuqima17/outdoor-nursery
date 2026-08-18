-- Outdoor Nursery backend MVP schema
-- Run this in the Supabase SQL Editor after creating the project.

create extension if not exists pgcrypto;

do $$
begin
  create type place_category as enum ('park', 'playground', 'outdoor_mall');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type published_status as enum ('draft', 'published', 'archived');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type trust_level as enum (
    'official_verified',
    'third_party_verified',
    'trusted_parent_report',
    'crowd_confirmed',
    'needs_verification',
    'unknown'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type feedback_status as enum ('new', 'reviewed', 'applied', 'dismissed');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type review_priority as enum ('low', 'medium', 'high');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type review_status as enum (
    'new',
    'in_review',
    'approved',
    'dismissed',
    'needs_more_info'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists places (
  id text primary key,
  name text not null,
  category place_category not null,
  summary text not null,
  country_code text not null default 'US',
  metro_area text,
  region text,
  neighborhood text,
  city text not null,
  state text not null,
  area text not null,
  address text not null,
  latitude double precision not null,
  longitude double precision not null,
  tags text[] not null default '{}',
  place_json jsonb not null,
  source_quality text not null default 'needs_recheck',
  last_checked_at date,
  needs_recheck boolean not null default true,
  place_status text not null default 'active',
  published_status published_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists place_sources (
  id uuid primary key default gen_random_uuid(),
  place_id text not null references places(id) on delete cascade,
  source_type text not null,
  url text,
  external_id text,
  last_checked_at date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint place_sources_has_url_or_external_id check (
    url is not null or external_id is not null
  )
);

create table if not exists place_facts (
  id uuid primary key default gen_random_uuid(),
  place_id text not null references places(id) on delete cascade,
  field_path text not null,
  value_json jsonb not null,
  trust_level trust_level not null default 'needs_verification',
  source_type text,
  source_id text,
  verified_at date,
  expires_at date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (place_id, field_path)
);

create table if not exists feedback (
  id uuid primary key default gen_random_uuid(),
  place_id text not null references places(id) on delete cascade,
  device_id text,
  user_id uuid,
  feedback_type text not null,
  note text,
  source text not null default 'user_submission',
  status feedback_status not null default 'new',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists review_queue (
  id uuid primary key default gen_random_uuid(),
  place_id text not null references places(id) on delete cascade,
  field_path text not null,
  current_value_json jsonb,
  proposed_value_json jsonb,
  reason text,
  source_type text,
  source_ids text[] not null default '{}',
  priority review_priority not null default 'medium',
  status review_status not null default 'new',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid,
  notes text
);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists places_set_updated_at on places;
create trigger places_set_updated_at
before update on places
for each row execute function set_updated_at();

drop trigger if exists place_sources_set_updated_at on place_sources;
create trigger place_sources_set_updated_at
before update on place_sources
for each row execute function set_updated_at();

drop trigger if exists place_facts_set_updated_at on place_facts;
create trigger place_facts_set_updated_at
before update on place_facts
for each row execute function set_updated_at();

create index if not exists places_category_idx on places(category);
create index if not exists places_published_status_idx on places(published_status);
create index if not exists places_country_code_idx on places(country_code);
create index if not exists places_metro_area_idx on places(metro_area);
create index if not exists places_region_idx on places(region);
create index if not exists places_city_idx on places(city);
create index if not exists places_place_status_idx on places(place_status);
create index if not exists places_needs_recheck_idx on places(needs_recheck);
create index if not exists places_tags_idx on places using gin(tags);
create index if not exists place_sources_place_id_idx on place_sources(place_id);
create index if not exists place_facts_place_id_idx on place_facts(place_id);
create index if not exists place_facts_field_path_idx on place_facts(field_path);
create index if not exists feedback_place_id_idx on feedback(place_id);
create index if not exists feedback_status_idx on feedback(status);
create index if not exists review_queue_place_id_idx on review_queue(place_id);
create index if not exists review_queue_status_idx on review_queue(status);
create index if not exists review_queue_priority_idx on review_queue(priority);

alter table places enable row level security;
alter table place_sources enable row level security;
alter table place_facts enable row level security;
alter table feedback enable row level security;
alter table review_queue enable row level security;

drop policy if exists "Public can read published places" on places;
create policy "Public can read published places"
on places for select
using (published_status = 'published');

drop policy if exists "Public can read sources for published places" on place_sources;
create policy "Public can read sources for published places"
on place_sources for select
using (
  exists (
    select 1
    from places
    where places.id = place_sources.place_id
      and places.published_status = 'published'
  )
);

drop policy if exists "Public can read facts for published places" on place_facts;
create policy "Public can read facts for published places"
on place_facts for select
using (
  exists (
    select 1
    from places
    where places.id = place_facts.place_id
      and places.published_status = 'published'
  )
);

drop policy if exists "Public can submit feedback" on feedback;
create policy "Public can submit feedback"
on feedback for insert
with check (
  exists (
    select 1
    from places
    where places.id = feedback.place_id
      and places.published_status = 'published'
  )
);

-- Review queue is intentionally not public.
-- Admin policies should be added later when auth/admin roles are introduced.
