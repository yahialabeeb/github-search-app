import { Avatar, Box, Stack, Typography } from '@mui/material';
import { User } from 'src/types/User';

export default function ForkersList({
  forkers,
}: {
  forkers: { owner: User }[];
}) {
  return (
    <>
      {forkers.length > 0 && (
        <Box my={1}>
          <Typography variant='subtitle2'>Recent Forkers:</Typography>
          <Stack
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              alignItems: { xs: 'start', sm: 'center' },
            }}
          >
            {forkers?.map(({ owner }: { owner: User }) => (
              <Stack
                direction='row'
                spacing={1}
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
        </Box>
      )}
    </>
  );
}
