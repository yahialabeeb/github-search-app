import { Card, CardContent, Avatar, Typography, Link } from '@mui/material';
import { User } from '../types/User';

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <Card sx={{ marginY: 4 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={user.avatar_url}
          alt={user.login}
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
  );
}
