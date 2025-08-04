import { Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchMessage() {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      mt={4}
      gap={1}
    >
      <SearchIcon
        fontSize='large'
        color='disabled'
      />
      <Typography
        mt={2}
        variant='h5'
      >
        You can Search for any user or repo
      </Typography>
      <Typography variant='h4'>Try It !!</Typography>
    </Box>
  );
}
