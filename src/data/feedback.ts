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
