import { render, screen } from '@testing-library/react';
import LoadingMessage from '@/components/LoadingMessage';

describe('LoadingMessage', () => {
  it('renders default loading message', () => {
    render(<LoadingMessage />);
    expect(screen.getByText(/please wait/i)).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders custom loading message', () => {
    render(<LoadingMessage message='Loading data...' />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });
});
