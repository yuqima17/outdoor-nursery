import type { AgeFit, Category, Place } from "../types/place";

const ageLabels: Record<AgeFit, string> = {
  baby: "Baby",
  toddler: "Toddler",
  preschool: "Preschool"
};

const categoryLabels: Record<Category, string> = {
  park: "Park",
  playground: "Playground",
  outdoor_mall: "Outdoor Mall"
};

export function formatAgeFit(ageFit: AgeFit[]) {
  return ageFit.map((age) => ageLabels[age]).join(", ");
}

export function formatCategory(category: Category) {
  return categoryLabels[category];
}

export function formatDuration(place: Place) {
  const min = Math.round(place.visit_duration.min_minutes / 30) / 2;
  const max = Math.round(place.visit_duration.max_minutes / 30) / 2;

  return `${min}-${max} hr`;
}

export function formatAdmission(place: Place) {
  return place.cost.label || formatValue(place.cost.type);
}

export function formatParking(place: Place) {
  return `${formatValue(place.amenities.parking)} · ${place.amenities.parking_fee.label}`;
}

export function formatReservation(place: Place) {
  if (place.reservation.required === "not_required") {
    return "No reservation";
  }

  if (place.reservation.required === "recommended") {
    return "Check ahead";
  }

  if (place.reservation.required === "required") {
    return "Reservation needed";
  }

  return "Check before going";
}

export function formatBabyCare(place: Place) {
  return place.amenities.baby_care.label;
}

export function formatValue(value: string) {
  return value
    .split("_")
    .join(" ")
    .split("-")
    .join(" ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function formatStrollerGuidance(value: Place["amenities"]["stroller_friendly"]) {
  if (value === "yes") {
    return "Stroller works here";
  }

  if (value === "partial") {
    return "Stroller works in some areas";
  }

  if (value === "no") {
    return "Walking or carrier is easier";
  }

  return "Check stroller access";
}

export function getDirectionsUrl(place: Place) {
  return `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;
}
