import {
  Store,
  Layers,
  Target,
  MessageSquareText,
  GitBranch,
  LineChart,
  PieChart,
  ShieldCheck,
  Database,
  Sparkles,
  ScanSearch,
  Boxes,
  TrendingUp,
  Star,
  DollarSign,
  Smile,
  type LucideIcon,
} from 'lucide-react';
import type { FeatureItem, PipelineStep, StatItem, TechItem } from '@/types/common';
import type {
  ClusterDistributionDatum,
  RatingByClusterDatum,
  CostByClusterDatum,
  SentimentDatum,
  KPIMetric,
  BusinessSegment,
} from '@/types/analytics';
import type { PredictionField, PredictionFormValues } from '@/types/prediction';

/* ---------------------------------------------------------------------- */
/*  Home page data                                                        */
/* ---------------------------------------------------------------------- */

export const HOME_STATS: StatItem[] = [
  { icon: Store, label: 'Restaurants Analyzed', value: '12,450' },
  { icon: Layers, label: 'Business Clusters', value: '6' },
  { icon: Target, label: 'Model Accuracy', value: '94.2', suffix: '%' },
  { icon: MessageSquareText, label: 'Reviews Processed', value: '380K' },
];

export const HOME_FEATURES: FeatureItem[] = [
  {
    icon: GitBranch,
    title: 'Unsupervised Clustering',
    description:
      'K-Means segmentation groups restaurants into distinct business archetypes using rating, cost, and sentiment signals — no manual labeling required.',
  },
  {
    icon: LineChart,
    title: 'Real-Time Prediction',
    description:
      'Submit live restaurant metrics through a FastAPI-backed inference endpoint and receive an instant cluster classification and business segment.',
  },
  {
    icon: PieChart,
    title: 'Interactive Analytics',
    description:
      'Explore cluster distributions, sentiment breakdowns, and pricing trends through a dashboard built on Recharts with drill-down detail.',
  },
  {
    icon: ScanSearch,
    title: 'Sentiment Intelligence',
    description:
      'NLP-derived positive, negative, and neutral sentiment ratios feed directly into the clustering pipeline for richer segmentation.',
  },
  {
    icon: ShieldCheck,
    title: 'Reproducible Pipeline',
    description:
      'A versioned preprocessing and feature-engineering pipeline ensures consistent, auditable results between training and inference.',
  },
  {
    icon: Boxes,
    title: 'Cuisine & Collection Encoding',
    description:
      'Categorical restaurant attributes are systematically encoded, allowing the model to capture segment-specific behavioral patterns.',
  },
];

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    step: 1,
    icon: Database,
    title: 'Data Collection',
    description:
      'Raw restaurant records — ratings, cost, review text, and photo counts — are ingested and validated.',
  },
  {
    step: 2,
    icon: ScanSearch,
    title: 'Feature Engineering',
    description:
      'Sentiment scores are extracted from reviews and categorical fields like cuisine and collection are encoded numerically.',
  },
  {
    step: 3,
    icon: GitBranch,
    title: 'Clustering (K-Means)',
    description:
      'Restaurants are grouped into business segments based on similarity across the engineered feature space.',
  },
  {
    step: 4,
    icon: Target,
    title: 'Model Evaluation',
    description:
      'Cluster quality is validated using silhouette scores and business-relevance checks before deployment.',
  },
  {
    step: 5,
    icon: Sparkles,
    title: 'Inference API',
    description:
      'The trained model is served via FastAPI, powering real-time predictions from this platform.',
  },
];

export const TECH_STACK: TechItem[] = [
  { name: 'React 19', category: 'Frontend', icon: Boxes },
  { name: 'TypeScript', category: 'Frontend', icon: ShieldCheck },
  { name: 'Tailwind CSS v4', category: 'Frontend', icon: Sparkles },
  { name: 'Framer Motion', category: 'Frontend', icon: LineChart },
  { name: 'Python', category: 'ML / Backend', icon: Database },
  { name: 'Scikit-learn', category: 'ML / Backend', icon: GitBranch },
  { name: 'Pandas', category: 'ML / Backend', icon: Layers },
  { name: 'FastAPI', category: 'ML / Backend', icon: ScanSearch },
];

export const iconRegistry: Record<string, LucideIcon> = {};

/* ---------------------------------------------------------------------- */
/*  Analytics page data                                                    */
/* ---------------------------------------------------------------------- */

export const CLUSTER_COLORS = [
  '#e23744',
  '#f0717c',
  '#ab1822',
  '#f7a5ac',
  '#79181f',
  '#cc1f2d',
];

export const CLUSTER_DISTRIBUTION: ClusterDistributionDatum[] = [
  { name: 'Premium Fine Dining', value: 1420, color: CLUSTER_COLORS[0] },
  { name: 'Casual Dining', value: 3680, color: CLUSTER_COLORS[1] },
  { name: 'Quick Service', value: 2950, color: CLUSTER_COLORS[2] },
  { name: 'Cafés & Bakeries', value: 1890, color: CLUSTER_COLORS[3] },
  { name: 'Budget Eateries', value: 1640, color: CLUSTER_COLORS[4] },
  { name: 'Cloud Kitchens', value: 870, color: CLUSTER_COLORS[5] },
];

export const RATING_BY_CLUSTER: RatingByClusterDatum[] = [
  { cluster: 'Premium', avgRating: 4.6 },
  { cluster: 'Casual', avgRating: 4.1 },
  { cluster: 'Quick Service', avgRating: 3.7 },
  { cluster: 'Cafés', avgRating: 4.3 },
  { cluster: 'Budget', avgRating: 3.4 },
  { cluster: 'Cloud Kitchen', avgRating: 3.9 },
];

export const COST_BY_CLUSTER: CostByClusterDatum[] = [
  { cluster: 'Premium', avgCost: 2400 },
  { cluster: 'Casual', avgCost: 950 },
  { cluster: 'Quick Service', avgCost: 380 },
  { cluster: 'Cafés', avgCost: 620 },
  { cluster: 'Budget', avgCost: 220 },
  { cluster: 'Cloud Kitchen', avgCost: 450 },
];

export const SENTIMENT_BY_CLUSTER: SentimentDatum[] = [
  { name: 'Premium', positive: 78, negative: 8, neutral: 14 },
  { name: 'Casual', positive: 65, negative: 15, neutral: 20 },
  { name: 'Quick Service', positive: 52, negative: 24, neutral: 24 },
  { name: 'Cafés', positive: 71, negative: 11, neutral: 18 },
  { name: 'Budget', positive: 44, negative: 32, neutral: 24 },
  { name: 'Cloud Kitchen', positive: 58, negative: 21, neutral: 21 },
];

export const KPI_METRICS: KPIMetric[] = [
  {
    label: 'Total Restaurants',
    value: '12,450',
    trend: { direction: 'up', value: '4.2%' },
  },
  {
    label: 'Average Rating',
    value: '4.02',
    suffix: '/5',
    trend: { direction: 'up', value: '0.3%' },
  },
  {
    label: 'Average Cost for Two',
    value: '₹840',
    trend: { direction: 'down', value: '1.8%' },
  },
  {
    label: 'Positive Sentiment',
    value: '64.7',
    suffix: '%',
    trend: { direction: 'up', value: '2.1%' },
  },
];

export const KPI_ICONS: LucideIcon[] = [TrendingUp, Star, DollarSign, Smile];

export const BUSINESS_SEGMENTS: BusinessSegment[] = [
  {
    clusterId: 0,
    name: 'Premium Fine Dining',
    description:
      'High-cost establishments with elevated ratings and strong positive sentiment. Low review volume relative to visibility.',
    restaurantCount: 1420,
    avgRating: 4.6,
    avgCost: 2400,
    dominantSentiment: 'Positive',
    color: CLUSTER_COLORS[0],
  },
  {
    clusterId: 1,
    name: 'Casual Dining',
    description:
      'The largest segment — moderate cost and consistently good ratings with high review counts and photo engagement.',
    restaurantCount: 3680,
    avgRating: 4.1,
    avgCost: 950,
    dominantSentiment: 'Positive',
    color: CLUSTER_COLORS[1],
  },
  {
    clusterId: 2,
    name: 'Quick Service',
    description:
      'High transaction volume, low average cost. Sentiment is more mixed, driven by speed and consistency expectations.',
    restaurantCount: 2950,
    avgRating: 3.7,
    avgCost: 380,
    dominantSentiment: 'Mixed',
    color: CLUSTER_COLORS[2],
  },
  {
    clusterId: 3,
    name: 'Cafés & Bakeries',
    description:
      'Strong photo engagement and positive sentiment, with mid-range pricing and a loyal, frequent-visit customer base.',
    restaurantCount: 1890,
    avgRating: 4.3,
    avgCost: 620,
    dominantSentiment: 'Positive',
    color: CLUSTER_COLORS[3],
  },
  {
    clusterId: 4,
    name: 'Budget Eateries',
    description:
      'Lowest average cost segment with the highest negative sentiment share, largely tied to consistency and hygiene feedback.',
    restaurantCount: 1640,
    avgRating: 3.4,
    avgCost: 220,
    dominantSentiment: 'Mixed',
    color: CLUSTER_COLORS[4],
  },
  {
    clusterId: 5,
    name: 'Cloud Kitchens',
    description:
      'Delivery-only operations with a smaller but fast-growing footprint. Sentiment centers on packaging and delivery time.',
    restaurantCount: 870,
    avgRating: 3.9,
    avgCost: 450,
    dominantSentiment: 'Mixed',
    color: CLUSTER_COLORS[5],
  },
];

/* ---------------------------------------------------------------------- */
/*  Prediction page data                                                   */
/* ---------------------------------------------------------------------- */

export const PREDICTION_FIELDS: PredictionField[] = [
  {
    name: 'average_rating',
    label: 'Average Rating',
    description: 'Mean customer rating for the restaurant, from 0 to 5.',
    min: 0,
    max: 5,
    step: 0.1,
  },
  {
    name: 'average_cost',
    label: 'Average Cost for Two',
    description: 'Typical cost for two people, in your local currency.',
    min: 0,
    max: 5000,
    step: 10,
    unit: '₹',
  },
  {
    name: 'review_count',
    label: 'Review Count',
    description: 'Total number of customer reviews received.',
    min: 0,
    max: 10000,
    step: 10,
  },
  {
    name: 'average_pictures',
    label: 'Average Pictures per Review',
    description: 'Mean number of photos customers attach per review.',
    min: 0,
    max: 20,
    step: 0.5,
  },
  {
    name: 'positive_percent',
    label: 'Positive Sentiment',
    description: 'Share of reviews classified as positive sentiment.',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'negative_percent',
    label: 'Negative Sentiment',
    description: 'Share of reviews classified as negative sentiment.',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'neutral_percent',
    label: 'Neutral Sentiment',
    description: 'Share of reviews classified as neutral sentiment.',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'cuisine_encoded',
    label: 'Cuisine (Encoded)',
    description: 'Numeric encoding of the restaurant\u2019s primary cuisine category.',
    min: 0,
    max: 50,
    step: 1,
  },
  {
    name: 'collection_encoded',
    label: 'Collection (Encoded)',
    description: 'Numeric encoding of the curated Zomato collection the restaurant belongs to.',
    min: 0,
    max: 30,
    step: 1,
  },
];

export const DEFAULT_PREDICTION_VALUES: PredictionFormValues = {
  average_rating: 4.0,
  average_cost: 800,
  review_count: 250,
  average_pictures: 3,
  positive_percent: 60,
  negative_percent: 20,
  neutral_percent: 20,
  cuisine_encoded: 5,
  collection_encoded: 3,
};
