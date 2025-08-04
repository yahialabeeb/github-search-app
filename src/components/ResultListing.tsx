import UserCard from '../components/UserCard';
import RepoCard from '../components/RepoCard';
import type { User } from '../types/User';
import type { Repo } from '../types/Repo';
import type { Page } from '../types/Page';
import { Box } from '@mui/material';

export default function ResultListing({ data, type }: Props) {
  return (
    <Box
      gap={5}
      mt={4}
      width={'100%'}
    >
      {data?.pages?.map((page, i) => (
        <div key={i}>
          {page.items.map((item) =>
            type === 'users' ? (
              <UserCard
                key={item.id}
                user={item as User}
              />
            ) : (
              <RepoCard
                key={item.id}
                repo={item as Repo}
              />
            )
          )}
        </div>
      ))}
    </Box>
  );
}
interface Props {
  data?: { pages: Page<User | Repo>[] };
  type: string;
}
