import { render, screen } from '@testing-library/react';
import { formatNumber, calculateInactiveUsers, sanitizeMetrics, fetchDashboardMetrics } from '@/utils/api';

describe('API Utils', () => {
  describe('formatNumber', () => {
    it('should format numbers correctly', () => {
      expect(formatNumber(1000)).toBe('1.0K');
      expect(formatNumber(1500)).toBe('1.5K');
      expect(formatNumber(1000000)).toBe('1.0M');
      expect(formatNumber(1200000)).toBe('1.2M');
      expect(formatNumber(999)).toBe('999');
      expect(formatNumber(0)).toBe('0');
    });
  });

  describe('calculateInactiveUsers', () => {
    it('should calculate inactive users correctly', () => {
      expect(calculateInactiveUsers(1000, 750)).toBe(250);
      expect(calculateInactiveUsers(100, 100)).toBe(0);
      expect(calculateInactiveUsers(500, 600)).toBe(0);
    });
  });

  describe('sanitizeMetrics', () => {
    it('should sanitize metrics correctly', () => {
      const input = {
        total_users: '1200',
        active_users: 875,
        admin_users: null,
      };

      const result = sanitizeMetrics(input);

      expect(result.total_users).toBe(1200);
      expect(result.active_users).toBe(875);
      expect(result.inactive_users).toBe(325);
      expect(result.admin_users).toBe(0);
    });

    it('should handle missing data', () => {
      const input = {};
      const result = sanitizeMetrics(input);

      expect(result.total_users).toBe(0);
      expect(result.active_users).toBe(0);
      expect(result.inactive_users).toBe(0);
      expect(result.admin_users).toBe(0);
    });
  });

  describe('fetchDashboardMetrics', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should fetch dashboard metrics successfully', async () => {
      const result = await fetchDashboardMetrics();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.user.name).toBe('Thaynara Dutra');
      expect(result.data?.user.role).toBe('admin');
      expect(result.data?.metrics.total_users).toBe(1200);
    });

    it('should apply random variance to active users', async () => {
      const result1 = await fetchDashboardMetrics();
      const result2 = await fetchDashboardMetrics();

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
      
      const activeUsers1 = result1.data?.metrics.active_users || 0;
      const activeUsers2 = result2.data?.metrics.active_users || 0;
      
      expect(activeUsers1).toBeGreaterThanOrEqual(870);
      expect(activeUsers1).toBeLessThanOrEqual(880);
      expect(activeUsers2).toBeGreaterThanOrEqual(870);
      expect(activeUsers2).toBeLessThanOrEqual(880);
    });

    it('should calculate inactive users correctly', async () => {
      const result = await fetchDashboardMetrics();

      expect(result.success).toBe(true);
      if (result.data) {
        const { total_users, active_users, inactive_users } = result.data.metrics;
        expect(active_users + (inactive_users || 0)).toBe(total_users);
      }
    });
  });
});