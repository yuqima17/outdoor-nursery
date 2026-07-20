-- Outdoor Nursery admin feedback review helpers
-- Run these manually in Supabase SQL Editor when reviewing incoming feedback.
-- These are read-only queries unless you uncomment the status update examples.

-- 1. Latest raw feedback
select
  feedback.created_at,
  feedback.status,
  places.name as place_name,
  feedback.place_id,
  feedback.feedback_type,
  feedback.device_id,
  feedback.metadata
from feedback
join places on places.id = feedback.place_id
order by feedback.created_at desc
limit 50;

-- 2. New feedback grouped by place and type
select
  places.name as place_name,
  feedback.place_id,
  feedback.feedback_type,
  count(*) as report_count,
  max(feedback.created_at) as latest_report_at
from feedback
join places on places.id = feedback.place_id
where feedback.status = 'new'
group by places.name, feedback.place_id, feedback.feedback_type
order by report_count desc, latest_report_at desc;

-- 3. Higher-priority review candidates
select
  places.name as place_name,
  feedback.place_id,
  feedback.feedback_type,
  count(*) as report_count,
  max(feedback.created_at) as latest_report_at,
  case
    when feedback.feedback_type in (
      'info_changed',
      'needs_maintenance',
      'baby_care_missing',
      'parking_was_hard'
    ) then 'high'
    when feedback.feedback_type in (
      'long_wait',
      'too_crowded',
      'changing_table_available',
      'family_restroom_available',
      'good_nursing_spot'
    ) then 'medium'
    else 'low'
  end as suggested_priority
from feedback
join places on places.id = feedback.place_id
where feedback.status = 'new'
group by places.name, feedback.place_id, feedback.feedback_type
order by
  case
    when feedback.feedback_type in (
      'info_changed',
      'needs_maintenance',
      'baby_care_missing',
      'parking_was_hard'
    ) then 1
    when feedback.feedback_type in (
      'long_wait',
      'too_crowded',
      'changing_table_available',
      'family_restroom_available',
      'good_nursing_spot'
    ) then 2
    else 3
  end,
  report_count desc,
  latest_report_at desc;

-- 4. Feedback for one place
-- Replace the place id before running.
select
  created_at,
  status,
  feedback_type,
  device_id,
  metadata
from feedback
where place_id = 'stanford-shopping-center-palo-alto'
order by created_at desc;

-- 5. Mark reviewed after manual review
-- Replace the id values before running.
-- update feedback
-- set status = 'reviewed', reviewed_at = now()
-- where id in (
--   'replace-with-feedback-id'
-- );
