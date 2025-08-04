import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Box,
  Link,
  Stack,
} from '@mui/material';
import { useRepoDetails } from '../hooks/useRepoDetails';
import { Repo } from '../types/Repo';
import { User } from '../types/User';

interface Props {
  repo: Repo;
}

export default function RepoCard({ repo }: Props) {
  const { languages, forkers, isLoading } = useRepoDetails(
    repo.owner.login,
    repo.name,
    parseInt(repo.forks_count, 10),
    repo.language
  );

  return (
    <Card sx={{ marginY: 4, borderTopColor: '#000' }}>
      <CardContent>
        <Typography variant='h5'>
          <Link
            href={repo.html_url}
            target='_blank'
            rel='noopener'
          >
            {repo.full_name}
          </Link>
        </Typography>
        <Typography
          variant='h6'
          color='textSecondary'
        >
          ⭐ {repo.stargazers_count} | forks: {repo.forks_count}
        </Typography>
        <Typography
          variant='body1'
          my={1}
        >
          {repo.description}
        </Typography>

        {/* Languages */}
        <Box my={1}>
          {languages.map((lang) => (
            <Chip
              key={lang}
              label={lang}
              sx={{ marginRight: 1, marginBottom: 1 }}
            />
          ))}
        </Box>

        {/* Forkers */}
        {forkers.length > 0 && (
          <div>
            <Typography variant='subtitle2'>Recent Forkers:</Typography>
            <Stack
              direction='row'
              spacing={4}
              alignItems='center'
            >
              {forkers?.map(({ owner }: { owner: User }) => (
                <Stack
                  direction='row'
                  spacing={2}
                  alignItems='center'
                  key={'fork' + owner.id}
                >
                  <Avatar
                    src={owner.avatar_url}
                    alt={owner.login}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Typography variant='subtitle1'>{owner.login}</Typography>
                </Stack>
              ))}
            </Stack>
          </div>
        )}

        {isLoading && (
          <Typography variant='caption'>Loading details...</Typography>
        )}
      </CardContent>
    </Card>
  );
}
