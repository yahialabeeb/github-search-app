import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Link,
  Grid,
} from '@mui/material';
import { User } from '../types/User';
import { Page } from '@/types/Page';

interface Props {
  page: Page<User>;
}

export default function UserCard({ page }: Props) {
  return (
    <>
      {page.items.map((user) => (
        <Grid
          size={{ xs: 2, md: 1 }}
          key={user.id}
        >
          <Card sx={{ marginY: 4 }}>
            <CardContent
              sx={{
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Avatar
                src={user.avatar_url}
                alt={user.login}
                sx={{ width: { sm: 58, md: 82 }, height: { sm: 58, md: 82 } }}
              />
              <Link
                href={user.html_url}
                target='_blank'
                rel='noopener'
              >
                <Typography variant='h5'>{user.login}</Typography>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
}
