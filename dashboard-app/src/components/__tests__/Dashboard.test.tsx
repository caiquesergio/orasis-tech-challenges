import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../Dashboard';

jest.mock('../../hooks/useDashboard');

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...rest }: any) => {
      const filteredProps: any = {};
      if (className) filteredProps.className = className;
      if (rest.role) filteredProps.role = rest.role;
      if (rest['aria-label']) filteredProps['aria-label'] = rest['aria-label'];
      return <div {...filteredProps}>{children}</div>;
    },
    header: ({ children, className }: any) => {
      const filteredProps: any = {};
      if (className) filteredProps.className = className;
      return <header {...filteredProps}>{children}</header>;
    },
    button: ({ children, className, onClick, disabled, ...rest }: any) => {
      const filteredProps: any = {};
      if (className) filteredProps.className = className;
      if (onClick) filteredProps.onClick = onClick;
      if (disabled !== undefined) filteredProps.disabled = disabled;
      if (rest['aria-label']) filteredProps['aria-label'] = rest['aria-label'];
      return <button {...filteredProps}>{children}</button>;
    },
    section: ({ children, className }: any) => {
      const filteredProps: any = {};
      if (className) filteredProps.className = className;
      return <section {...filteredProps}>{children}</section>;
    },
    footer: ({ children, className }: any) => {
      const filteredProps: any = {};
      if (className) filteredProps.className = className;
      return <footer {...filteredProps}>{children}</footer>;
    },
  },
}));

jest.mock('../MetricCard', () => {
  return function MockMetricCard({ title, value }: any) {
    return <div data-testid="metric-card">{title}: {value}</div>;
  };
});

jest.mock('../LoadingSpinner', () => {
  return function MockLoadingSpinner({ text }: any) {
    return <div data-testid="loading-spinner">{text}</div>;
  };
});

jest.mock('../ErrorMessage', () => {
  return function MockErrorMessage({ message, onRetry }: any) {
    return (
      <div data-testid="error-message">
        {message}
        {onRetry && <button onClick={onRetry}>Retry</button>}
      </div>
    );
  };
});

import { useDashboard } from '../../hooks/useDashboard';
const mockUseDashboard = useDashboard as jest.MockedFunction<typeof useDashboard>;

describe('Dashboard', () => {
  const mockData = {
    user: { id: 1, name: 'John Doe', role: 'admin', authenticated: true },
    metrics: {
      total_users: 1200,
      active_users: 875,
      inactive_users: 325,
      admin_users: 35,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading spinner when loading and no data', () => {
    mockUseDashboard.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });

    render(<Dashboard />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Carregando métricas do dashboard...')).toBeInTheDocument();
  });

  it('should show error message when error and no data', () => {
    const mockRefetch = jest.fn();
    mockUseDashboard.mockReturnValue({
      data: null,
      loading: false,
      error: 'Network error',
      refetch: mockRefetch,
    });

    render(<Dashboard />);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
    
    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('should show error message when no data available', () => {
    const mockRefetch = jest.fn();
    mockUseDashboard.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<Dashboard />);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Nenhum dado disponível')).toBeInTheDocument();
  });

  it('should render dashboard with data successfully', () => {
    const mockRefetch = jest.fn();
    mockUseDashboard.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<Dashboard />);

    expect(screen.getByText('Dashboard de Métricas')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();

    expect(screen.getByText('Total de Usuários: 1200')).toBeInTheDocument();
    expect(screen.getByText('Usuários Ativos: 875')).toBeInTheDocument();
    expect(screen.getByText('Usuários Inativos: 325')).toBeInTheDocument();
    expect(screen.getByText('Administradores: 35')).toBeInTheDocument();

    expect(screen.getByText('Insights da Plataforma')).toBeInTheDocument();
    expect(screen.getByText('72.9%')).toBeInTheDocument(); // Taxa de atividade
    expect(screen.getByText('2.9%')).toBeInTheDocument(); // % de admins
  });

  it('should call refetch when update button is clicked', () => {
    const mockRefetch = jest.fn();
    mockUseDashboard.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<Dashboard />);

    const updateButton = screen.getByText('Atualizar');
    fireEvent.click(updateButton);
    
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('should disable update button when loading', () => {
    const mockRefetch = jest.fn();
    mockUseDashboard.mockReturnValue({
      data: mockData,
      loading: true,
      error: null,
      refetch: mockRefetch,
    });

    render(<Dashboard />);

    const updateButton = screen.getByRole('button', { name: /atualizar dados/i });
    expect(updateButton).toBeDisabled();
  });

  it('should handle missing optional metrics gracefully', () => {
    const dataWithMissingMetrics = {
      ...mockData,
      metrics: {
        total_users: 1000,
        active_users: 800,
        admin_users: null,
      },
    };

    mockUseDashboard.mockReturnValue({
      data: dataWithMissingMetrics,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<Dashboard />);

    expect(screen.getByText('Usuários Inativos: 0')).toBeInTheDocument();
    expect(screen.getByText('Administradores: 0')).toBeInTheDocument();
  });
});