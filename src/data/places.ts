import samplePlaces from "../../data/sample-places.json";
import type { Category, Place } from "../types/place";
import { supabase } from "./supabaseClient";

export type PlacesDataSource = "local" | "supabase";

export interface PlacesLoadResult {
  places: Place[];
  source: PlacesDataSource;
  errorMessage?: string;
}

export const localPlaces = samplePlaces.places as Place[];

export const categoryLabels: Record<Category, string> = {
  park: "Parks",
  playground: "Playgrounds",
  outdoor_mall: "Outdoor Malls"
};

export const categoryDescriptions: Record<Category, string> = {
  park: "Easy walks, lawns, picnic stops, and fresh air.",
  playground: "Play-first outings with toddler-friendly equipment.",
  outdoor_mall: "Food, restrooms, stroller walks, and weather backup."
};

export async function loadPlaces(): Promise<PlacesLoadResult> {
  if (!supabase) {
    return {
      places: localPlaces,
      source: "local"
    };
  }

  const { data, error } = await supabase
    .from("places")
    .select("place_json")
    .eq("published_status", "published")
    .order("name");

  if (error) {
    return {
      errorMessage: error.message,
      places: localPlaces,
      source: "local"
    };
  }

  const remotePlaces = (data ?? [])
    .map((row) => row.place_json as Place | null)
    .filter((place): place is Place => Boolean(place?.id));

  if (remotePlaces.length === 0) {
    return {
      errorMessage: "Supabase returned no published places.",
      places: localPlaces,
      source: "local"
    };
  }

  return {
    places: remotePlaces,
    source: "supabase"
  };
}

export function getPlaceById(placeId: string, placeList: Place[] = localPlaces) {
  return placeList.find((place) => place.id === placeId);
}

export function getPlacesByCategory(category: Category, placeList: Place[] = localPlaces) {
  return placeList.filter((place) => place.category === category);
}
