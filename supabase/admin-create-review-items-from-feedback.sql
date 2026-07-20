-- Outdoor Nursery review queue helper
-- Use this manually in Supabase SQL Editor.
--
-- Step 1 previews feedback groups that are strong enough to review.
-- Step 2 inserts review_queue rows for those groups.
-- Public place facts are not changed by this file.

-- Step 1: preview review candidates
with feedback_groups as (
  select
    feedback.place_id,
    feedback.feedback_type,
    count(*) as report_count,
    array_agg(feedback.id::text order by feedback.created_at desc) as feedback_ids,
    max(feedback.created_at) as latest_report_at
  from feedback
  where feedback.status = 'new'
  group by feedback.place_id, feedback.feedback_type
),
review_candidates as (
  select
    feedback_groups.place_id,
    feedback_groups.feedback_type,
    feedback_groups.report_count,
    feedback_groups.feedback_ids,
    feedback_groups.latest_report_at,
    case
      when feedback_groups.feedback_type in ('parking_was_hard', 'easy_parking') then 'amenities.parking'
      when feedback_groups.feedback_type = 'stroller_worked' then 'amenities.stroller_friendly'
      when feedback_groups.feedback_type = 'restroom_was_easy' then 'amenities.restroom'
      when feedback_groups.feedback_type in (
        'baby_care_was_easy',
        'baby_care_missing',
        'changing_table_available',
        'family_restroom_available',
        'good_nursing_spot'
      ) then 'amenities.baby_care'
      when feedback_groups.feedback_type in ('too_crowded', 'crowd_was_okay', 'long_wait') then 'parent_notes'
      when feedback_groups.feedback_type in ('kid_loved_it', 'good_value') then 'parent_notes'
      when feedback_groups.feedback_type in ('needs_maintenance', 'info_changed') then 'data_quality'
      else 'parent_notes'
    end as field_path,
    case
      when feedback_groups.feedback_type in (
        'info_changed',
        'needs_maintenance',
        'baby_care_missing',
        'parking_was_hard'
      ) then 'high'::review_priority
      when feedback_groups.feedback_type in (
        'long_wait',
        'too_crowded',
        'changing_table_available',
        'family_restroom_available',
        'good_nursing_spot'
      ) then 'medium'::review_priority
      else 'low'::review_priority
    end as priority
  from feedback_groups
  where
    feedback_groups.report_count >= 2
    or feedback_groups.feedback_type in (
      'info_changed',
      'needs_maintenance',
      'baby_care_missing',
      'parking_was_hard'
    )
)
select
  places.name as place_name,
  review_candidates.place_id,
  review_candidates.field_path,
  review_candidates.feedback_type,
  review_candidates.report_count,
  review_candidates.priority,
  review_candidates.latest_report_at,
  review_candidates.feedback_ids
from review_candidates
join places on places.id = review_candidates.place_id
order by
  case review_candidates.priority
    when 'high' then 1
    when 'medium' then 2
    else 3
  end,
  review_candidates.report_count desc,
  review_candidates.latest_report_at desc;

-- Step 2: insert candidates into review_queue
-- Uncomment and run after previewing Step 1.
--
-- with feedback_groups as (
--   select
--     feedback.place_id,
--     feedback.feedback_type,
--     count(*) as report_count,
--     array_agg(feedback.id::text order by feedback.created_at desc) as feedback_ids,
--     max(feedback.created_at) as latest_report_at
--   from feedback
--   where feedback.status = 'new'
--   group by feedback.place_id, feedback.feedback_type
-- ),
-- review_candidates as (
--   select
--     feedback_groups.place_id,
--     feedback_groups.feedback_type,
--     feedback_groups.report_count,
--     feedback_groups.feedback_ids,
--     case
--       when feedback_groups.feedback_type in ('parking_was_hard', 'easy_parking') then 'amenities.parking'
--       when feedback_groups.feedback_type = 'stroller_worked' then 'amenities.stroller_friendly'
--       when feedback_groups.feedback_type = 'restroom_was_easy' then 'amenities.restroom'
--       when feedback_groups.feedback_type in (
--         'baby_care_was_easy',
--         'baby_care_missing',
--         'changing_table_available',
--         'family_restroom_available',
--         'good_nursing_spot'
--       ) then 'amenities.baby_care'
--       when feedback_groups.feedback_type in ('too_crowded', 'crowd_was_okay', 'long_wait') then 'parent_notes'
--       when feedback_groups.feedback_type in ('kid_loved_it', 'good_value') then 'parent_notes'
--       when feedback_groups.feedback_type in ('needs_maintenance', 'info_changed') then 'data_quality'
--       else 'parent_notes'
--     end as field_path,
--     case
--       when feedback_groups.feedback_type in (
--         'info_changed',
--         'needs_maintenance',
--         'baby_care_missing',
--         'parking_was_hard'
--       ) then 'high'::review_priority
--       when feedback_groups.feedback_type in (
--         'long_wait',
--         'too_crowded',
--         'changing_table_available',
--         'family_restroom_available',
--         'good_nursing_spot'
--       ) then 'medium'::review_priority
--       else 'low'::review_priority
--     end as priority
--   from feedback_groups
--   where
--     feedback_groups.report_count >= 2
--     or feedback_groups.feedback_type in (
--       'info_changed',
--       'needs_maintenance',
--       'baby_care_missing',
--       'parking_was_hard'
--     )
-- )
-- insert into review_queue (
--   place_id,
--   field_path,
--   current_value_json,
--   proposed_value_json,
--   reason,
--   source_type,
--   source_ids,
--   priority
-- )
-- select
--   review_candidates.place_id,
--   review_candidates.field_path,
--   place_facts.value_json,
--   null,
--   'Quick feedback: ' || review_candidates.feedback_type || ' (' || review_candidates.report_count || ' report(s))',
--   'quick_feedback',
--   review_candidates.feedback_ids,
--   review_candidates.priority
-- from review_candidates
-- left join place_facts
--   on place_facts.place_id = review_candidates.place_id
--  and place_facts.field_path = review_candidates.field_path
-- where not exists (
--   select 1
--   from review_queue
--   where review_queue.place_id = review_candidates.place_id
--     and review_queue.field_path = review_candidates.field_path
--     and review_queue.source_type = 'quick_feedback'
--     and review_queue.status in ('new', 'in_review')
--     and review_queue.source_ids && review_candidates.feedback_ids
-- );
