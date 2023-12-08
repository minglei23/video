import React, { useState } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ height: '50px' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search Series ..."
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: '#a70' }} />
            </InputAdornment>
          ),
          style: { color: '#fff', fontSize: '14px' },
        }}
        sx={{
          backgroundColor: '#222'
        }}
      />
    </Box>
  );
}
