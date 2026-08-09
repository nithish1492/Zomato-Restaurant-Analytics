import { apiClient } from "./api";

export interface AnalyticsResponse {
  total_restaurants: number;
  average_rating: number;
  average_cost: number;
  positive_sentiment: number;

  clusters: {
    name: string;
    count: number;
  }[];

  ratings: {
    cluster: string;
    avgRating: number;
  }[];

  costs: {
    cluster: string;
    avgCost: number;
  }[];

  sentiments: {
    name: string;
    positive: number;
    neutral: number;
    negative: number;
  }[];
}

export async function getAnalytics(): Promise<AnalyticsResponse> {
  const { data } = await apiClient.get("/analytics");
  return data;
}