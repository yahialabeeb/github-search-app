import { useState, useCallback, useRef, useEffect } from 'react';
import SearchBar from './SearchBar';
import { useGithubSearch } from '../hooks/useGitHubSearch';
import ResultListing from './ResultListing';
import { debounce } from '@mui/material/utils';
import LoadingMessage from './LoadingMessage';
import ErrorMessage from './ErrorMessage';
import EmptyResult from './EmptyResult';
import SearchMessage from './SearchMessage';
import { Box } from '@mui/material';

export default function Home() {
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
    <Box sx={{ width: '98vw' }}>
      <SearchBar
        onSearch={handleSearch}
        setType={setType}
        type={type}
      />

      {status === 'pending' &&
        (!!query ? <LoadingMessage /> : <SearchMessage />)}
      {status === 'error' && <ErrorMessage />}
      {status === 'success' &&
        (data?.pages[0]?.items?.length ? (
          <Box
            alignItems='center'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            marginX={'auto'}
            width={'60%'}
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
    </Box>
  );
}
