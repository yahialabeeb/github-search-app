import { useInfiniteQuery } from '@tanstack/react-query';

interface FetchGithubProps {
  pageParam?: number;
  queryKey: string[];
}

const fetchGithub = async ({ pageParam = 1, queryKey }: FetchGithubProps) => {
  const [, query, type] = queryKey;

  const response = await fetch(
    `/api/${type}?q=${query}&per_page=${20}&page=${pageParam}`
  );
  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  return data;
};

export function useGithubSearch(query: string, type: 'users' | 'repositories') {
  return useInfiniteQuery({
    queryKey: ['githubSearch', query, type],
    queryFn: fetchGithub,
    initialPageParam: undefined,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.items.length < 20) return undefined;
      return allPages.length + 1;
    },
    enabled: query.length > 1,
    retry: 2,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
