import { useState, useCallback, useRef, useEffect } from 'react';
import SearchBar from './SearchBar';
import { useGithubSearch } from '../hooks/useGitHubSearch';
import ResultListing from './ResultListing';
import { debounce } from '@mui/material/utils';
import LoadingMessage from './LoadingMessage';
import ErrorMessage from './ErrorMessage';
import EmptyResult from './EmptyResult';
import SearchMessage from './SearchMessage';
import { Box, Container } from '@mui/material';
import LoadingSkeleton from './LoadinSkeleton';

export default function MainPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'users' | 'repositories'>('users');

  const { data, status, fetchNextPage, hasNextPage } = useGithubSearch(
    query,
    type
  );

  const debouncedSearch = useCallback(debounce(setQuery, 500), [
    setQuery,
    debounce,
  ]);
  const handleSearch = (val: string) => debouncedSearch(val);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <Container>
      <SearchBar
        onSearch={handleSearch}
        setType={setType}
        type={type}
      />

      {status === 'pending' &&
        (!!query ? <LoadingSkeleton /> : <SearchMessage />)}
      {status === 'error' && <ErrorMessage />}
      {status === 'success' &&
        (data?.pages[0]?.items?.length ? (
          <Box
            alignItems='center'
            display='flex'
            flexDirection='column'
            justifyContent='center'
          >
            <ResultListing
              data={data!}
              type={type}
            />
            {hasNextPage && (
              <div ref={observerRef}>
                <LoadingMessage message='Loading More ...' />
              </div>
            )}
          </Box>
        ) : (
          <EmptyResult type={type} />
        ))}
    </Container>
  );
}
