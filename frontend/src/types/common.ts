import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StatItem {
  icon: LucideIcon;
  label: string;
  value: string;
  suffix?: string;
}

export interface PipelineStep {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface TechItem {
  name: string;
  category: string;
  icon: LucideIcon;
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';
