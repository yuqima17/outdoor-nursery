-- Outdoor Nursery admin feedback review helpers
-- Run these manually in Supabase SQL Editor when reviewing incoming feedback.
-- These are read-only queries unless you uncomment the status update examples.

-- 1. Latest raw feedback
select
  feedback.id,
  feedback.created_at,
  feedback.status,
  places.name as place_name,
  feedback.place_id,
  feedback.feedback_type,
  feedback.source,
  feedback.metadata ->> 'feedback_label' as feedback_label,
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
  count(distinct feedback.device_id) as device_count,
  max(feedback.created_at) as latest_report_at
from feedback
join places on places.id = feedback.place_id
where feedback.status = 'new'
group by places.name, feedback.place_id, feedback.feedback_type
order by device_count desc, report_count desc, latest_report_at desc;

-- 3. Higher-priority review candidates
select
  places.name as place_name,
  feedback.place_id,
  feedback.feedback_type,
  count(*) as report_count,
  count(distinct feedback.device_id) as device_count,
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
  device_count desc,
  report_count desc,
  latest_report_at desc;

-- 4. Feedback for one place
-- Replace the place id before running.
select
  id,
  created_at,
  status,
  feedback_type,
  source,
  metadata ->> 'feedback_label' as feedback_label,
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

-- 6. Feedback summary for the last 7 days
select
  date_trunc('day', feedback.created_at)::date as feedback_day,
  count(*) as feedback_count,
  count(distinct feedback.place_id) as place_count,
  count(distinct feedback.device_id) as device_count,
  count(*) filter (where feedback.status = 'new') as new_count,
  count(*) filter (where feedback.status = 'reviewed') as reviewed_count,
  count(*) filter (where feedback.status = 'applied') as applied_count,
  count(*) filter (where feedback.status = 'dismissed') as dismissed_count
from feedback
where feedback.created_at >= now() - interval '7 days'
group by feedback_day
order by feedback_day desc;

-- 7. Place-level issue summary for the last 30 days
select
  places.name as place_name,
  feedback.place_id,
  count(*) as total_feedback_count,
  count(distinct feedback.device_id) as device_count,
  count(*) filter (
    where feedback.feedback_type in (
      'info_changed',
      'needs_maintenance',
      'baby_care_missing',
      'parking_was_hard'
    )
  ) as high_signal_count,
  count(*) filter (
    where feedback.feedback_type in (
      'long_wait',
      'too_crowded',
      'changing_table_available',
      'family_restroom_available',
      'good_nursing_spot'
    )
  ) as medium_signal_count,
  max(feedback.created_at) as latest_report_at
from feedback
join places on places.id = feedback.place_id
where feedback.created_at >= now() - interval '30 days'
group by places.name, feedback.place_id
order by high_signal_count desc, device_count desc, total_feedback_count desc, latest_report_at desc;

-- 8. New high-priority raw feedback
select
  feedback.id,
  feedback.created_at,
  places.name as place_name,
  feedback.place_id,
  feedback.feedback_type,
  feedback.metadata ->> 'feedback_label' as feedback_label,
  feedback.device_id,
  feedback.metadata
from feedback
join places on places.id = feedback.place_id
where feedback.status = 'new'
  and feedback.feedback_type in (
    'info_changed',
    'needs_maintenance',
    'baby_care_missing',
    'parking_was_hard'
  )
order by feedback.created_at desc;

-- 9. Review queue backlog
select
  review_queue.id,
  review_queue.created_at,
  review_queue.priority,
  review_queue.status,
  places.name as place_name,
  review_queue.place_id,
  review_queue.field_path,
  review_queue.reason,
  cardinality(review_queue.source_ids) as source_count,
  review_queue.source_ids,
  review_queue.reviewed_at,
  review_queue.notes
from review_queue
join places on places.id = review_queue.place_id
where review_queue.status in ('new', 'in_review', 'needs_more_info')
order by
  case review_queue.priority
    when 'high' then 1
    when 'medium' then 2
    else 3
  end,
  review_queue.created_at desc;

-- 10. Review queue status summary
select
  review_queue.status,
  review_queue.priority,
  count(*) as item_count,
  min(review_queue.created_at) as oldest_item_at,
  max(review_queue.created_at) as newest_item_at
from review_queue
group by review_queue.status, review_queue.priority
order by
  review_queue.status,
  case review_queue.priority
    when 'high' then 1
    when 'medium' then 2
    else 3
  end;

-- 11. Feedback linked to open review items
select
  review_queue.id as review_item_id,
  review_queue.status as review_status,
  review_queue.priority,
  review_queue.field_path,
  places.name as place_name,
  feedback.id as feedback_id,
  feedback.created_at as feedback_created_at,
  feedback.status as feedback_status,
  feedback.feedback_type,
  feedback.metadata ->> 'feedback_label' as feedback_label
from review_queue
join places on places.id = review_queue.place_id
join feedback on feedback.id::text = any(review_queue.source_ids)
where review_queue.status in ('new', 'in_review', 'needs_more_info')
order by
  case review_queue.priority
    when 'high' then 1
    when 'medium' then 2
    else 3
  end,
  review_queue.created_at desc,
  feedback.created_at desc;

-- 12. Published place facts expiring soon or already expired
select
  places.name as place_name,
  place_facts.place_id,
  place_facts.field_path,
  place_facts.trust_level,
  place_facts.verified_at,
  place_facts.expires_at,
  place_facts.source_type,
  place_facts.source_id,
  place_facts.notes
from place_facts
join places on places.id = place_facts.place_id
where places.published_status = 'published'
  and place_facts.expires_at is not null
  and place_facts.expires_at <= current_date + 14
order by place_facts.expires_at asc, places.name asc, place_facts.field_path asc;
