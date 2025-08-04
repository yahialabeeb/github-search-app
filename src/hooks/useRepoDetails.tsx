import { useQuery } from '@tanstack/react-query';

const getLanguages = async (
  owner: string,
  repo: string,
  language: string | null
) => {
  if (!language) return [];
  const res = await fetch(`/api/languages?owner=${owner}&repo=${repo}`);
  const a = await res.json();
  return Object.keys(a);
};

const getForks = async (owner: string, repo: string, forks: number) => {
  if (!forks) return [];
  const res = await fetch(`/api/forkers?owner=${owner}&repo=${repo}`);
  return res.json();
};

export function useRepoDetails(
  owner: string,
  repo: string,
  forks: number,
  language: string
) {
  const { data: languages = [], isLoading: isLoadingLang } = useQuery({
    queryKey: ['repoLanguages', owner, repo],
    queryFn: () => getLanguages(owner, repo, language),
  });
  const { data: forkers = [], isLoading: isLoadingForks } = useQuery({
    queryKey: ['repoForks', owner, repo],
    queryFn: () => getForks(owner, repo, forks),
  });

  return {
    languages,
    forkers,
    isLoading: isLoadingLang || isLoadingForks,
  };
}
