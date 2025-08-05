import UserCard from '../components/UserCard';
import RepoCard from '../components/RepoCard';
import type { User } from '../types/User';
import type { Repo } from '../types/Repo';
import type { Page } from '../types/Page';
import { Box, Grid } from '@mui/material';

export default function ResultListing({ data, type }: Props) {
  const Component = type === 'users' ? UserCard : RepoCard;
  return (
    <Box mt={4}>
      {data?.pages?.map((page, i) => (
        <Grid
          columns={4}
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{
            alignItems: 'center',
            mt: 4,
          }}
          key={i}
        >
          {page.items.map((item: Repo | User) => (
            <Component
              key={item.id}
              repo={item as Repo}
              user={item as User}
            />
          ))}
        </Grid>
      ))}
    </Box>
  );
}
interface Props {
  data?: { pages: Page<User | Repo>[] };
  type: string;
}
