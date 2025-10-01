import { renderHook, waitFor } from '@testing-library/react';
import { useDashboard } from '../useDashboard';
import * as api from '../../utils/api';

jest.mock('../../utils/api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('useDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data successfully', async () => {
    const mockData = {
      user: { id: 1, name: 'Test User', role: 'admin', authenticated: true },
      metrics: { total_users: 100, active_users: 80, admin_users: 5 }
    };

    mockedApi.fetchDashboardMetrics.mockResolvedValueOnce({
      success: true,
      data: mockData
    });

    const { result } = renderHook(() => useDashboard(1000));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it('should handle API errors', async () => {
    mockedApi.fetchDashboardMetrics.mockResolvedValueOnce({
      success: false,
      error: 'API Error'
    });

    const { result } = renderHook(() => useDashboard(1000));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('API Error');
  });

  it('should handle network errors', async () => {
    mockedApi.fetchDashboardMetrics.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useDashboard(1000));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Failed to fetch dashboard data');
  });
});