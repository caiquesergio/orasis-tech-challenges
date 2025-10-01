import { render, screen } from '@testing-library/react';
import LoadingSpinner from '@/components/LoadingSpinner';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...rest }: any) => {
      const filteredProps: any = {};
      if (className) filteredProps.className = className;
      if (rest.role) filteredProps.role = rest.role;
      if (rest['aria-label']) filteredProps['aria-label'] = rest['aria-label'];
      return <div {...filteredProps}>{children}</div>;
    },
    p: ({ children, className }: any) => {
      const filteredProps: any = {};
      if (className) filteredProps.className = className;
      return <p {...filteredProps}>{children}</p>;
    },
  },
}));

describe('LoadingSpinner', () => {
  it('should render loading spinner with default size', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('should render loading spinner with custom text', () => {
    render(<LoadingSpinner text="Loading data..." />);
    
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />);
    expect(document.querySelector('.w-4')).toBeInTheDocument();

    rerender(<LoadingSpinner size="lg" />);
    expect(document.querySelector('.w-12')).toBeInTheDocument();
  });
});