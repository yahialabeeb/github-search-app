import { render, screen } from '@testing-library/react';
import ErrorMessage from '@/components/ErrorMessage';

describe('ErrorMessage', () => {
  it('renders error icon and message', () => {
    render(<ErrorMessage />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByTestId('ErrorOutlineIcon')).toBeInTheDocument();
  });
});
