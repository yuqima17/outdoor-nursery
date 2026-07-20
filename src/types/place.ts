export type Category = "park" | "playground" | "outdoor_mall";
export type AgeFit = "baby" | "toddler" | "preschool";

export type CostType = "free" | "paid" | "mixed" | "unknown";
export type PriceLevel = "free" | "$" | "$$" | "varies" | "unknown";
export type ReservationValue = "not_required" | "recommended" | "required" | "unknown";
export type AmenityValue = "yes" | "no" | "partial" | "seasonal" | "unknown";
export type ParkingValue = "easy" | "limited" | "paid" | "street" | "unknown";
export type ShadeValue = "good" | "partial" | "limited" | "unknown";
export type FoodValue = "yes" | "no" | "limited" | "unknown";
export type IndoorBackupValue = "yes" | "no" | "nearby" | "unknown";
export type BabyCareStatus = "available" | "limited" | "not_reported" | "not_available";
export type BabyCareFeatureValue = "yes" | "no" | "not_reported";
export type QuietAreaValue = "yes" | "limited" | "no" | "not_reported";

export interface Place {
  id: string;
  name: string;
  category: Category;
  summary: string;
  city: string;
  state: string;
  area: string;
  address: string;
  latitude: number;
  longitude: number;
  external_ids: {
    google_place_id: string | null;
    osm_id: string | null;
  };
  age_fit: AgeFit[];
  age_guidance: {
    display: string;
    note: string;
  };
  cost: {
    type: CostType;
    price_level: PriceLevel;
    label: string;
    note: string;
  };
  reservation: {
    required: ReservationValue;
    note: string;
  };
  visit_duration: {
    min_minutes: number;
    max_minutes: number;
    note: string;
  };
  amenities: {
    stroller_friendly: AmenityValue;
    restroom: AmenityValue;
    changing_table: "yes" | "no" | "unknown";
    baby_care: {
      status: BabyCareStatus;
      label: string;
      changing_table: BabyCareFeatureValue;
      family_restroom: BabyCareFeatureValue;
      nursing_space: BabyCareFeatureValue;
      quiet_area: QuietAreaValue;
      note: string;
    };
    parking: ParkingValue;
    parking_fee: {
      price_level: PriceLevel;
      label: string;
      note: string;
    };
    shade: ShadeValue;
    food_nearby: FoodValue;
    seating: "yes" | "no" | "limited" | "unknown";
    indoor_backup: IndoorBackupValue;
  };
  weather_fit: {
    best_conditions: string[];
    avoid_conditions: string[];
    note: string;
  };
  parent_notes: {
    best_time: string;
    before_you_go: string[];
    what_to_bring: string[];
    safety_notes: string[];
    avoid_notes: string[];
  };
  tags: string[];
  source: {
    primary: string;
    urls: string[];
    last_verified_at: string;
  };
  data_quality: {
    base_details: string;
    caregiver_notes: string;
  };
}
