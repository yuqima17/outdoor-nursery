-- Outdoor Nursery feedback type normalization
-- Run once in Supabase SQL Editor if early test rows stored display labels
-- such as "Easy parking" instead of stable codes such as "easy_parking".

update feedback
set
  metadata = coalesce(metadata, '{}'::jsonb) || jsonb_build_object(
    'feedback_label',
    feedback_type,
    'normalized_from_label',
    true
  ),
  feedback_type = case feedback_type
    when 'Easy parking' then 'easy_parking'
    when 'Parking was hard' then 'parking_was_hard'
    when 'Stroller worked' then 'stroller_worked'
    when 'Restroom was easy' then 'restroom_was_easy'
    when 'Baby care was easy' then 'baby_care_was_easy'
    when 'Changing table available' then 'changing_table_available'
    when 'Family restroom available' then 'family_restroom_available'
    when 'Good nursing spot' then 'good_nursing_spot'
    when 'Baby care missing' then 'baby_care_missing'
    when 'Clean enough' then 'clean_enough'
    when 'Crowd was okay' then 'crowd_was_okay'
    when 'Too crowded' then 'too_crowded'
    when 'Long wait' then 'long_wait'
    when 'Kid loved it' then 'kid_loved_it'
    when 'Good value' then 'good_value'
    when 'Needs maintenance' then 'needs_maintenance'
    when 'Info changed' then 'info_changed'
    else feedback_type
  end
where feedback_type in (
  'Easy parking',
  'Parking was hard',
  'Stroller worked',
  'Restroom was easy',
  'Baby care was easy',
  'Changing table available',
  'Family restroom available',
  'Good nursing spot',
  'Baby care missing',
  'Clean enough',
  'Crowd was okay',
  'Too crowded',
  'Long wait',
  'Kid loved it',
  'Good value',
  'Needs maintenance',
  'Info changed'
);
