import { createClient, type SupabaseClient } from "@supabase/supabase-js";

declare const process: {
  env: Record<string, string | undefined>;
} | undefined;

const supabaseUrl =
  typeof process !== "undefined" ? process.env.EXPO_PUBLIC_SUPABASE_URL : undefined;
const supabaseAnonKey =
  typeof process !== "undefined" ? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY : undefined;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes("your-project") &&
    !supabaseAnonKey.includes("your-anon-key") &&
    isValidHttpUrl(supabaseUrl) &&
    isPlausibleAnonKey(supabaseAnonKey)
);

export const supabase = createSupabaseClient();

function createSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) {
    return null;
  }

  try {
    return createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false
      }
    });
  } catch (error) {
    console.warn("Supabase client disabled because configuration is invalid.", error);
    return null;
  }
}

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function isPlausibleAnonKey(value: string) {
  return value.startsWith("sb_publishable_") || value.split(".").length === 3;
}
