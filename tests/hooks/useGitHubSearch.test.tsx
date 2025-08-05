import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGithubSearch } from '@/hooks/useGitHubSearch';
import fetchMock from 'jest-fetch-mock';

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useGithubSearch', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches GitHub users successfully', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        items: [{ id: 1, login: 'yahia' }],
      })
    );

    const { result } = renderHook(() => useGithubSearch('yahia', 'users'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/users?q=yahia&per_page=20&page=1'
    );

    expect(result.current.data?.pages[0].items[0].login).toBe('yahia');
  });

  it('handles fetch error', async () => {
    fetchMock.mockRejectOnce(new Error());

    const { result } = renderHook(() => useGithubSearch('fail', 'users'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(false);
    });
  });
});
