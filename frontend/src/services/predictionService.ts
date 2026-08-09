import { apiClient } from "./api";
import type {
  PredictionFormValues,
  PredictionResponse,
} from "@/types/prediction";

export async function predictRestaurantCluster(
  payload: PredictionFormValues
): Promise<PredictionResponse> {
  const { data } = await apiClient.post("/predict", payload);
  return data;
}