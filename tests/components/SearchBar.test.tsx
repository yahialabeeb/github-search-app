import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/components/SearchBar'; // Adjust path if needed
import '@testing-library/jest-dom';

describe('SearchBar', () => {
  it('renders correctly with input and toggle buttons', () => {
    const onSearch = jest.fn();
    const setType = jest.fn();

    render(
      <SearchBar
        onSearch={onSearch}
        setType={setType}
        type='users'
      />
    );

    expect(screen.getByText('Search on Github')).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('Search in GitHub Repos and Users')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Users/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Repositories/i })
    ).toBeInTheDocument();
  });

  it('calls onSearch when typing in input', () => {
    const onSearch = jest.fn();
    const setType = jest.fn();

    render(
      <SearchBar
        onSearch={onSearch}
        setType={setType}
        type='users'
      />
    );

    const input = screen.getByPlaceholderText(
      'Search in GitHub Repos and Users'
    );

    fireEvent.change(input, { target: { value: 'react' } });

    expect(onSearch).toHaveBeenCalledWith('react');
  });

  it('calls setType when toggling search type', () => {
    const onSearch = jest.fn();
    const setType = jest.fn();

    render(
      <SearchBar
        onSearch={onSearch}
        setType={setType}
        type='users'
      />
    );

    const repoToggle = screen.getByRole('button', { name: 'Repositories' });

    fireEvent.click(repoToggle);

    expect(setType).toHaveBeenCalledWith('repositories');
  });
});
