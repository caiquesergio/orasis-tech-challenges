import { DashboardData, DashboardResponse } from '@/types/dashboard';

export async function fetchDashboardMetrics(): Promise<DashboardResponse> {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockData: DashboardData = {
      user: {
        id: 42,
        name: "Thaynara Dutra",
        role: "admin",
        authenticated: true
      },
      metrics: {
        total_users: 1200,
        active_users: 875,
        inactive_users: 290,
        admin_users: 35
      }
    };

    const variance = Math.floor(Math.random() * 10) - 5;
    mockData.metrics.active_users += variance;
    mockData.metrics.inactive_users = mockData.metrics.total_users - mockData.metrics.active_users;

    return {
      success: true,
      data: mockData
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch dashboard metrics'
    };
  }
}

export function calculateInactiveUsers(total: number, active: number): number {
  return Math.max(0, total - active);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function sanitizeMetrics(metrics: any): DashboardData['metrics'] {
  return {
    total_users: typeof metrics.total_users === 'string' 
      ? parseInt(metrics.total_users, 10) 
      : metrics.total_users || 0,
    active_users: metrics.active_users || 0,
    inactive_users: metrics.inactive_users || 
      calculateInactiveUsers(metrics.total_users || 0, metrics.active_users || 0),
    admin_users: metrics.admin_users || 0,
  };
}