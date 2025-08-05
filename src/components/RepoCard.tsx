import { Typography, Chip, Box, Link, Grid, Paper } from '@mui/material';
import { useRepoDetails } from '../hooks/useRepoDetails';
import { Repo } from '../types/Repo';
import ForkersList from './ForkersList';
import { Page } from '@/types/Page';

interface Props {
  repo: Repo;
}

interface RepoListingProps {
  page: Page<Repo>;
}

function RepoCard({ repo }: Props) {
  const { languages, forkers, isLoading } = useRepoDetails(
    repo.owner.login,
    repo.name,
    parseInt(repo.forks_count, 10),
    repo.language
  );

  return (
    <Grid size={{ xs: 4, lg: 2 }}>
      <Paper
        sx={{
          minHeight: 300,
          minWidth: { sx: '280px', lg: '350px' },
          height: 'fit-content',
          padding: { xs: 2, sm: 4 },
          borderTopColor: '#000',
        }}
      >
        <Typography variant='h5'>
          <Link
            href={repo.html_url}
            target='_blank'
            rel='noopener'
            sx={{ wordBreak: 'break-all' }}
          >
            {repo.full_name}
          </Link>
        </Typography>
        <Typography
          variant='h6'
          color='textSecondary'
          width={'fit-content'}
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

        <ForkersList forkers={forkers} />

        {isLoading && (
          <Typography variant='caption'>Loading details...</Typography>
        )}
      </Paper>
    </Grid>
  );
}

export default function RepoListing({ page }: RepoListingProps) {
  return (
    <>
      {page.items.map((repo: Repo) => (
        <RepoCard
          key={repo.id}
          repo={repo}
        />
      ))}
    </>
  );
}
