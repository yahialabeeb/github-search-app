import { Box, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function EmptyResult({
  type,
}: {
  type: 'users' | 'repositories';
}) {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      mt={4}
    >
      <SearchOffIcon
        fontSize='large'
        color='disabled'
      />
      <Typography
        variant='subtitle1'
        mt={1}
      >
        No {type} match your search.
      </Typography>
    </Box>
  );
}
