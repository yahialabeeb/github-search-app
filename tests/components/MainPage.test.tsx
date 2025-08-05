import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainPage from '@/components/MainPage';
import { useGithubSearch } from '@/hooks/useGitHubSearch';
import '@testing-library/jest-dom';
import React from 'react';

// Mock useGithubSearch hook
jest.mock('../../src/hooks/useGitHubSearch', () => ({
  useGithubSearch: jest.fn(),
}));

// Helper mock for IntersectionObserver
beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
});

describe('MainPage', () => {
  const mockFetchNextPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading skeleton when status is pending and query is non-empty', () => {
    (useGithubSearch as jest.Mock).mockReturnValue({
      status: 'pending',
      data: undefined,
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage,
    });

    render(<MainPage />);
    const input = screen.getByPlaceholderText(/search in github/i);

    fireEvent.change(input, { target: { value: 'react' } });

    expect(screen.getByText(/search on github/i)).toBeInTheDocument();
    // Debounced search, wait for render
    waitFor(() =>
      expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
    );
  });

  it('renders results when status is success', async () => {
    (useGithubSearch as jest.Mock).mockReturnValue({
      status: 'success',
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage,
      data: {
        pages: [
          {
            items: [
              {
                id: 1,
                login: 'yahia',
                avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
                html_url: 'https://github.com/yahia',
              },
            ],
          },
        ],
      },
    });

    render(<MainPage />);

    await waitFor(() => {
      expect(screen.getByText('yahia')).toBeInTheDocument();
    });
  });
});
