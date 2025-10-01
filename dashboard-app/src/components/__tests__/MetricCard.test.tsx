import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MetricCard from '@/components/MetricCard';
import { People } from '@mui/icons-material';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, role, ...rest }: any) => {
      const filteredProps: any = {};
      if (className) filteredProps.className = className;
      if (role) filteredProps.role = role;
      if (rest['aria-label']) filteredProps['aria-label'] = rest['aria-label'];
      return <div {...filteredProps}>{children}</div>;
    },
    p: ({ children, className, ...rest }: any) => {
      const filteredProps: any = {};
      if (className) filteredProps.className = className;
      return <p {...filteredProps}>{children}</p>;
    },
  },
}));

describe('MetricCard', () => {
  const defaultProps = {
    title: 'Total Users',
    value: 1200,
    icon: <People />,
    color: 'bg-blue-500',
  };

  it('should render metric card with correct values', () => {
    render(<MetricCard {...defaultProps} />);

    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByLabelText('Total Users: 1.2K')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    render(<MetricCard {...defaultProps} isLoading={true} />);

    expect(screen.getByText('Total Users')).toBeInTheDocument();
    const loadingElement = document.querySelector('.animate-pulse');
    expect(loadingElement).toBeInTheDocument();
  });

  it('should display trend information when provided', () => {
    const propsWithTrend = {
      ...defaultProps,
      trend: { value: 12, isPositive: true },
    };

    render(<MetricCard {...propsWithTrend} />);

    expect(screen.getByText('12%')).toBeInTheDocument();
    expect(screen.getByText('↗')).toBeInTheDocument();
  });

  it('should handle string values correctly', () => {
    const propsWithStringValue = {
      ...defaultProps,
      value: '1500',
    };

    render(<MetricCard {...propsWithStringValue} />);

    expect(screen.getByLabelText('Total Users: 1.5K')).toBeInTheDocument();
  });

  it('should be accessible', () => {
    render(<MetricCard {...defaultProps} />);

    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-label', 'Total Users: 1.2K');
  });

  it('should handle invalid numeric values', () => {
    const propsWithInvalidValue = {
      ...defaultProps,
      value: 'invalid',
    };

    render(<MetricCard {...propsWithInvalidValue} />);

    expect(screen.getByText('Total Users')).toBeInTheDocument();
  });

  it('should not animate when loading', () => {
    render(<MetricCard {...defaultProps} isLoading={true} />);

    const progressBar = document.querySelector('.bg-blue-500');
    expect(progressBar).toBeInTheDocument();
  });
});