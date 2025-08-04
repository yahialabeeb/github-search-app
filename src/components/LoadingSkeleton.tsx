import { Grid, Skeleton } from '@mui/material';

export default function LoadingSkeleton() {
  return (
    <Grid
      columns={2}
      container
      spacing={4}
      sx={{
        marginTop: 5,
        alignItems: 'center',
      }}
    >
      {Array.from(Array(6)).map((_, i) => (
        <Grid
          size={1}
          key={i}
        >
          <Skeleton
            animation='wave'
            variant='rounded'
            height={200}
          />
        </Grid>
      ))}
    </Grid>
  );
}
