import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import fetchMock from 'jest-fetch-mock';
import { useRepoDetails } from '@/hooks/useRepoDetails'; // adjust path

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('useRepoDetails', () => {
  it('returns languages and forkers when both are available', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify({ JavaScript: 100, HTML: 50 })) // languages
      .mockResponseOnce(JSON.stringify([{ id: 1, login: 'yahia' }])); // forkers

    const { result } = renderHook(
      () => useRepoDetails('owner1', 'repo1', 1, 'JavaScript'),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/languages?owner=owner1&repo=repo1'
    );
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/forkers?owner=owner1&repo=repo1'
    );

    expect(result.current.languages).toEqual(['JavaScript', 'HTML']);
    expect(result.current.forkers).toEqual([{ id: 1, login: 'yahia' }]);
  });

  it('skips languages fetch if language is null', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ id: 1, login: 'john' }]));

    const { result } = renderHook(
      () => useRepoDetails('owner2', 'repo2', 1, null as any),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/forkers?owner=owner2&repo=repo2'
    );
    expect(result.current.languages).toEqual([]);
  });

  it('skips forks fetch if forks is 0', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ TypeScript: 1, CSS: 1 }));

    const { result } = renderHook(
      () => useRepoDetails('owner3', 'repo3', 0, 'TypeScript'),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/languages?owner=owner3&repo=repo3'
    );
    expect(result.current.forkers).toEqual([]);
  });
});
