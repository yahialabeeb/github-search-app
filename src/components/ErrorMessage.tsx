import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ErrorMessage() {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      mt={4}
      gap={1}
    >
      <ErrorOutlineIcon
        color='error'
        fontSize='large'
      />
      <Typography color='error'>
        {'Something went wrong. Please try again.'}
      </Typography>
    </Box>
  );
}
