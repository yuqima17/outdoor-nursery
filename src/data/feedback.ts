import AsyncStorage from "@react-native-async-storage/async-storage";

import { supabase } from "./supabaseClient";

const DEVICE_ID_STORAGE_KEY = "outdoor-nursery:anonymous-device-id";
const SUBMITTED_FEEDBACK_STORAGE_KEY = "outdoor-nursery:submitted-quick-feedback";
const APP_VERSION = "0.1.0";

export interface QuickFeedbackInput {
  placeId: string;
  feedbackType: string;
  feedbackLabel: string;
}

export interface FeedbackVoteInput extends QuickFeedbackInput {
  voteTopic: string;
}

export interface ClearFeedbackVoteInput {
  placeId: string;
  voteTopic: string;
}

export interface FeedbackVoteCount {
  feedbackType: string;
  voteCount: number;
  voteTopic: string;
}

type FeedbackVoteCountRow = {
  feedback_type: string;
  vote_count: number;
  vote_topic: string;
};

export async function submitQuickFeedback({
  feedbackLabel,
  feedbackType,
  placeId
}: QuickFeedbackInput): Promise<{ submitted: boolean; errorMessage?: string }> {
  if (!supabase) {
    return { submitted: false, errorMessage: "Supabase is not configured." };
  }

  const deviceId = await getAnonymousDeviceId();
  const submissionKey = getSubmissionKey(placeId, feedbackType);
  const submittedKeys = await getSubmittedFeedbackKeys();

  if (submittedKeys.includes(submissionKey)) {
    return { submitted: false };
  }

  const { error } = await supabase.from("feedback").insert({
    device_id: deviceId,
    feedback_type: feedbackType,
    metadata: {
      app_version: APP_VERSION,
      feedback_label: feedbackLabel,
      interaction: "quick_feedback_select",
      platform: "expo",
      submitted_from: "place_detail"
    },
    place_id: placeId,
    source: "quick_feedback"
  });

  if (error) {
    return { submitted: false, errorMessage: error.message };
  }

  await AsyncStorage.setItem(
    SUBMITTED_FEEDBACK_STORAGE_KEY,
    JSON.stringify([...submittedKeys, submissionKey])
  );

  return { submitted: true };
}

export async function submitFeedbackVote({
  feedbackLabel,
  feedbackType,
  placeId,
  voteTopic
}: FeedbackVoteInput): Promise<{ submitted: boolean; errorMessage?: string }> {
  if (!supabase) {
    return { submitted: false, errorMessage: "Supabase is not configured." };
  }

  const deviceId = await getAnonymousDeviceId();

  const { error } = await supabase.rpc("submit_feedback_vote", {
    p_app_version: APP_VERSION,
    p_device_id: deviceId,
    p_feedback_label: feedbackLabel,
    p_feedback_type: feedbackType,
    p_metadata: {
      interaction: "paired_feedback_vote",
      platform: "expo",
      submitted_from: "place_detail"
    },
    p_place_id: placeId,
    p_vote_topic: voteTopic
  });

  if (!error) {
    return { submitted: true };
  }

  const fallbackResult = await submitQuickFeedback({ feedbackLabel, feedbackType, placeId });

  return {
    submitted: fallbackResult.submitted,
    errorMessage: fallbackResult.errorMessage ?? error.message
  };
}

export async function clearFeedbackVote({
  placeId,
  voteTopic
}: ClearFeedbackVoteInput): Promise<{ cleared: boolean; errorMessage?: string }> {
  if (!supabase) {
    return { cleared: false, errorMessage: "Supabase is not configured." };
  }

  const deviceId = await getAnonymousDeviceId();

  const { error } = await supabase.rpc("clear_feedback_vote", {
    p_device_id: deviceId,
    p_place_id: placeId,
    p_vote_topic: voteTopic
  });

  if (error) {
    return { cleared: false, errorMessage: error.message };
  }

  return { cleared: true };
}

export async function fetchFeedbackVoteCounts(placeId: string): Promise<FeedbackVoteCount[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.rpc("get_feedback_vote_counts", {
    p_place_id: placeId
  });

  if (error || !data) {
    return [];
  }

  return (data as FeedbackVoteCountRow[]).map((row) => ({
    feedbackType: row.feedback_type,
    voteCount: Number(row.vote_count) || 0,
    voteTopic: row.vote_topic
  }));
}

async function getAnonymousDeviceId() {
  const existingDeviceId = await AsyncStorage.getItem(DEVICE_ID_STORAGE_KEY);

  if (existingDeviceId) {
    return existingDeviceId;
  }

  const deviceId = `anon_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 10)}`;

  await AsyncStorage.setItem(DEVICE_ID_STORAGE_KEY, deviceId);

  return deviceId;
}

async function getSubmittedFeedbackKeys() {
  const storedValue = await AsyncStorage.getItem(SUBMITTED_FEEDBACK_STORAGE_KEY);

  if (!storedValue) {
    return [];
  }

  try {
    return JSON.parse(storedValue) as string[];
  } catch {
    return [];
  }
}

function getSubmissionKey(placeId: string, feedbackType: string) {
  return `${placeId}:${feedbackType}`;
}
