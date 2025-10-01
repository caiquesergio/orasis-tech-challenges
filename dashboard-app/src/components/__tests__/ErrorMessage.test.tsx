import { render, screen, fireEvent } from '@testing-library/react';
import ErrorMessage from '@/components/ErrorMessage';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...rest }: any) => {
      const filteredProps: any = {};
      if (className) filteredProps.className = className;
      return <div {...filteredProps}>{children}</div>;
    },
    button: ({ children, className, onClick, ...rest }: any) => {
      const filteredProps: any = {};
      if (className) filteredProps.className = className;
      if (onClick) filteredProps.onClick = onClick;
      if (rest['aria-label']) filteredProps['aria-label'] = rest['aria-label'];
      return <button {...filteredProps}>{children}</button>;
    },
  },
}));

describe('ErrorMessage', () => {
  it('should render error message', () => {
    render(<ErrorMessage message="Something went wrong" />);
    
    expect(screen.getByText('Ops! Algo deu errado')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should render retry button when onRetry is provided', () => {
    const mockRetry = jest.fn();
    render(<ErrorMessage message="Error occurred" onRetry={mockRetry} />);
    
    const retryButton = screen.getByLabelText('Tentar novamente');
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it('should not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Error occurred" />);
    
    expect(screen.queryByLabelText('Tentar novamente')).not.toBeInTheDocument();
  });
});