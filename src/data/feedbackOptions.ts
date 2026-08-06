export const feedbackOptions = [
  { label: "Easy parking", type: "easy_parking" },
  { label: "Parking was hard", type: "parking_was_hard" },
  { label: "Stroller worked", type: "stroller_worked" },
  { label: "Stroller was hard", type: "stroller_was_hard" },
  { label: "Restroom was easy", type: "restroom_was_easy" },
  { label: "Restroom was hard", type: "restroom_was_hard" },
  { label: "Baby care helped", type: "baby_care_was_easy" },
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
  { label: "Felt pricey", type: "felt_pricey" },
  { label: "Needs cleaning", type: "needs_cleaning" },
  { label: "Needs maintenance", type: "needs_maintenance" },
  { label: "Info changed", type: "info_changed" }
] as const;

export type FeedbackOption = (typeof feedbackOptions)[number];
export type FeedbackPair = {
  topic: string;
  positive: FeedbackOption;
  negative: FeedbackOption;
};

export const feedbackPairs: FeedbackPair[] = [
  {
    topic: "Parking",
    positive: feedbackOptions[0],
    negative: feedbackOptions[1]
  },
  {
    topic: "Stroller",
    positive: feedbackOptions[2],
    negative: feedbackOptions[3]
  },
  {
    topic: "Restroom",
    positive: feedbackOptions[4],
    negative: feedbackOptions[5]
  },
  {
    topic: "Baby care",
    positive: feedbackOptions[6],
    negative: feedbackOptions[10]
  },
  {
    topic: "Crowd",
    positive: feedbackOptions[12],
    negative: feedbackOptions[13]
  },
  {
    topic: "Cleanliness",
    positive: feedbackOptions[11],
    negative: feedbackOptions[18]
  },
  {
    topic: "Value",
    positive: feedbackOptions[16],
    negative: feedbackOptions[17]
  }
];

export const extraFeedbackOptions = [
  feedbackOptions[7],
  feedbackOptions[8],
  feedbackOptions[9],
  feedbackOptions[14],
  feedbackOptions[19],
  feedbackOptions[20]
];

export function normalizeFeedbackType(value: string) {
  return (
    feedbackOptions.find((option) => option.type === value || option.label === value)?.type ??
    value
  );
}
