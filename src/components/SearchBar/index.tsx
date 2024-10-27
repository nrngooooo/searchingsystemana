import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';

type SearchBarProps = {
  placeholder: string;
  themeMode: 'dark' | 'light';
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, themeMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/searchResult?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <TextField
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        fullWidth
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: themeMode === 'dark' ? '#333' : '#fff',
            '& fieldset': {
              borderColor: themeMode === 'dark' ? '#555' : 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: themeMode === 'dark' ? '#777' : 'rgba(0, 0, 0, 0.23)',
            },
            '&.Mui-focused fieldset': {
              borderColor: themeMode === 'dark' ? '#fff' : '#1976d2',
            },
          },
          '& .MuiInputBase-input': {
            color: themeMode === 'dark' ? '#fff' : '#000',
          },
          '& .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: themeMode === 'dark' ? '#fff' : 'rgba(0, 0, 0, 0.54)',
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }
        }}
      />
    </form>
  );
};

export default SearchBar;