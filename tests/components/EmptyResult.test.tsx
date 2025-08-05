import { render, screen } from '@testing-library/react';
import EmptyResult from '@/components/EmptyResult';

describe('EmptyResult', () => {
  it('renders message for users', () => {
    render(<EmptyResult type='users' />);
    expect(screen.getByText(/no users match your search/i)).toBeInTheDocument();
    expect(screen.getByTestId('SearchOffIcon')).toBeInTheDocument(); // fallback if icon renders with testId
  });

  it('renders message for repositories', () => {
    render(<EmptyResult type='repositories' />);
    expect(
      screen.getByText(/no repositories match your search/i)
    ).toBeInTheDocument();
  });
});
