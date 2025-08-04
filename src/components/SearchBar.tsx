import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface Props {
  onSearch: (value: string) => void;
  type: 'users' | 'repositories';
  setType: (type: 'users' | 'repositories') => void;
}

export default function SearchBar({ onSearch, setType, type }: Props) {
  const [query, setQuery] = useState('');

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newType: 'users' | 'repositories'
  ) => {
    newType ? setType(newType) : null;
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={3}
      mt={4}
      sx={{ marginX: 'auto', width: { xs: '100%', sm: '70%', md: '50%' } }}
      width={'50%'}
    >
      <Typography
        sx={{ textAlign: 'center' }}
        variant='h3'
      >
        Search on Github
      </Typography>
      <TextField
        variant='outlined'
        placeholder='Search in GitHub Repos and Users'
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
      />
      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={handleChange}
        color='primary'
        sx={{ marginX: 'auto' }}
      >
        <ToggleButton value='users'>Users</ToggleButton>
        <ToggleButton value='repositories'>Repositories</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
