-- Outdoor Nursery paired quick feedback votes
-- Run this once in Supabase SQL Editor after the base schema.

create table if not exists feedback_votes (
  id uuid primary key default gen_random_uuid(),
  place_id text not null references places(id) on delete cascade,
  device_id text not null,
  vote_topic text not null,
  feedback_type text not null,
  feedback_label text not null,
  app_version text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (place_id, device_id, vote_topic)
);

drop trigger if exists feedback_votes_set_updated_at on feedback_votes;
create trigger feedback_votes_set_updated_at
before update on feedback_votes
for each row execute function set_updated_at();

create index if not exists feedback_votes_place_id_idx on feedback_votes(place_id);
create index if not exists feedback_votes_topic_idx on feedback_votes(vote_topic);
create index if not exists feedback_votes_feedback_type_idx on feedback_votes(feedback_type);

alter table feedback_votes enable row level security;

-- Raw votes are private. Public clients use RPC functions below.
revoke all on feedback_votes from anon, authenticated;

create or replace function submit_feedback_vote(
  p_place_id text,
  p_device_id text,
  p_vote_topic text,
  p_feedback_type text,
  p_feedback_label text,
  p_app_version text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1
    from places
    where places.id = p_place_id
      and places.published_status = 'published'
  ) then
    raise exception 'Place is not available for feedback.';
  end if;

  insert into feedback_votes (
    place_id,
    device_id,
    vote_topic,
    feedback_type,
    feedback_label,
    app_version,
    metadata
  )
  values (
    p_place_id,
    p_device_id,
    p_vote_topic,
    p_feedback_type,
    p_feedback_label,
    p_app_version,
    coalesce(p_metadata, '{}'::jsonb)
  )
  on conflict (place_id, device_id, vote_topic)
  do update set
    feedback_type = excluded.feedback_type,
    feedback_label = excluded.feedback_label,
    app_version = excluded.app_version,
    metadata = excluded.metadata,
    updated_at = now();

  -- Keep an append-only history for admin review, while feedback_votes stores current vote state.
  insert into feedback (
    place_id,
    device_id,
    feedback_type,
    source,
    metadata
  )
  values (
    p_place_id,
    p_device_id,
    p_feedback_type,
    'quick_feedback',
    coalesce(p_metadata, '{}'::jsonb) || jsonb_build_object(
      'app_version',
      p_app_version,
      'feedback_label',
      p_feedback_label,
      'interaction',
      'paired_feedback_vote',
      'vote_topic',
      p_vote_topic
    )
  );
end;
$$;

create or replace function get_feedback_vote_counts(p_place_id text)
returns table (
  vote_topic text,
  feedback_type text,
  vote_count bigint
)
language sql
security definer
set search_path = public
as $$
  select
    feedback_votes.vote_topic,
    feedback_votes.feedback_type,
    count(*) as vote_count
  from feedback_votes
  join places on places.id = feedback_votes.place_id
  where feedback_votes.place_id = p_place_id
    and places.published_status = 'published'
  group by feedback_votes.vote_topic, feedback_votes.feedback_type
  order by feedback_votes.vote_topic, feedback_votes.feedback_type;
$$;

create or replace function clear_feedback_vote(
  p_place_id text,
  p_device_id text,
  p_vote_topic text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1
    from places
    where places.id = p_place_id
      and places.published_status = 'published'
  ) then
    raise exception 'Place is not available for feedback.';
  end if;

  delete from feedback_votes
  where place_id = p_place_id
    and device_id = p_device_id
    and vote_topic = p_vote_topic;
end;
$$;

grant execute on function submit_feedback_vote(
  text,
  text,
  text,
  text,
  text,
  text,
  jsonb
) to anon, authenticated;

grant execute on function get_feedback_vote_counts(text) to anon, authenticated;

grant execute on function clear_feedback_vote(text, text, text) to anon, authenticated;
