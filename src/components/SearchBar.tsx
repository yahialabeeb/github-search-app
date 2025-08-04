import { TextField, ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
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
      marginX={'auto'}
      width={'50%'}
    >
      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={handleChange}
        color='primary'
      >
        <ToggleButton value='users'>Users</ToggleButton>
        <ToggleButton value='repositories'>Repositories</ToggleButton>
      </ToggleButtonGroup>
      <TextField
        variant='outlined'
        placeholder='Search in GitHub Repos and Users'
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </Box>
  );
}
