import { useQuery } from '@tanstack/react-query';

const getLanguages = async (
  owner: string,
  repo: string,
  language: string | null
) => {
  // no need to hit Languages url since no Languages
  if (!language) return [];
  const res = await fetch(`/api/languages?owner=${owner}&repo=${repo}`);
  return Object.keys(await res.json());
};

const getForks = async (owner: string, repo: string, forks: number) => {
  // no need to hit forks url since no forks
  if (!forks) return [];
  const res = await fetch(`/api/forkers?owner=${owner}&repo=${repo}`);
  return await res.json();
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
  const {
    data: forkers = [],
    isLoading: isLoadingForks,
    error,
  } = useQuery({
    queryKey: ['repoForks', owner, repo],
    queryFn: () => getForks(owner, repo, forks),
  });

  return {
    languages,
    forkers,
    isLoading: isLoadingLang || isLoadingForks,
    error,
  };
}
