export interface ClusterDistributionDatum {
  name: string;
  value: number;
  color: string;
}

export interface RatingByClusterDatum {
  cluster: string;
  avgRating: number;
}

export interface CostByClusterDatum {
  cluster: string;
  avgCost: number;
}

export interface SentimentDatum {
  name: string;
  positive: number;
  negative: number;
  neutral: number;
}

export interface KPIMetric {
  label: string;
  value: string;
  suffix?: string;
  trend?: {
    direction: 'up' | 'down';
    value: string;
  };
}

export interface BusinessSegment {
  clusterId: number;
  name: string;
  description: string;
  restaurantCount: number;
  avgRating: number;
  avgCost: number;
  dominantSentiment: 'Positive' | 'Mixed' | 'Negative';
  color: string;
}
