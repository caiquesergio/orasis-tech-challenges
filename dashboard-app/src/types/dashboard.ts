import { ReactNode } from 'react';

export interface User {
  id: number;
  name: string;
  role: 'admin' | 'viewer' | string;
  authenticated: boolean;
}

export interface Metrics {
  total_users: number;
  active_users: number;
  inactive_users?: number;
  admin_users: number | null;
  ghost_users?: number;
  users_by_region?: Array<{
    region: string;
    count: number;
  }>;
}

export interface DashboardData {
  user: User;
  metrics: Metrics;
}

export interface MetricCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
}

export interface DashboardResponse {
  success: boolean;
  data?: DashboardData;
  error?: string;
}