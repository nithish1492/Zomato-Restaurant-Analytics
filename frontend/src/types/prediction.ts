export interface PredictionResponse {
  cluster: number;
  segment: string;
}

export interface PredictionFormValues {
  average_rating: number;
  average_cost: number;
  review_count: number;
  average_pictures: number;
  positive_percent: number;
  negative_percent: number;
  neutral_percent: number;
  cuisine_encoded: number;
  collection_encoded: number;
}

export interface PredictionField {
  name: keyof PredictionFormValues;
  label: string;
  description: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
}

export type PredictionStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";