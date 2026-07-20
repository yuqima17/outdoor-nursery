export const feedbackOptions = [
  { label: "Easy parking", type: "easy_parking" },
  { label: "Parking was hard", type: "parking_was_hard" },
  { label: "Stroller worked", type: "stroller_worked" },
  { label: "Restroom was easy", type: "restroom_was_easy" },
  { label: "Baby care was easy", type: "baby_care_was_easy" },
  { label: "Changing table available", type: "changing_table_available" },
  { label: "Family restroom available", type: "family_restroom_available" },
  { label: "Good nursing spot", type: "good_nursing_spot" },
  { label: "Baby care missing", type: "baby_care_missing" },
  { label: "Clean enough", type: "clean_enough" },
  { label: "Crowd was okay", type: "crowd_was_okay" },
  { label: "Too crowded", type: "too_crowded" },
  { label: "Long wait", type: "long_wait" },
  { label: "Kid loved it", type: "kid_loved_it" },
  { label: "Good value", type: "good_value" },
  { label: "Needs maintenance", type: "needs_maintenance" },
  { label: "Info changed", type: "info_changed" }
] as const;

export type FeedbackOption = (typeof feedbackOptions)[number];

export function normalizeFeedbackType(value: string) {
  return (
    feedbackOptions.find((option) => option.type === value || option.label === value)?.type ??
    value
  );
}
