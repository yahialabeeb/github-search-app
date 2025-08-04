import { CircularProgress, Box, Typography } from '@mui/material';

export default function LoadingMessage({
  message = 'Please wait ...',
}: {
  message?: string;
}) {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      my={4}
    >
      <CircularProgress />
      <Typography mt={2}>{message}</Typography>
    </Box>
  );
}
