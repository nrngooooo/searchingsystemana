import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter, useSearchParams } from 'next/navigation';

type SearchBarProps = {
  placeholder: string;
  themeMode: 'dark' | 'light';
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, themeMode }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const newParams = new URLSearchParams(searchParams);
  const [searchTerm, setSearchTerm] = useState(newParams.get("q") ?? "");



  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      router.push(`/searchResult?q=${encodedSearchTerm}`);
    }
  };

  useEffect(() => {
    const currentSearchTerm = searchParams.get('q');
    if (currentSearchTerm) {
      setSearchTerm(currentSearchTerm);
    }
  }, [searchParams]);

  

  return (
    <form onSubmit={handleSearch}>
      <TextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        fullWidth
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: themeMode === 'dark' ? '#333' : '#fff',
            '& fieldset': {
              borderColor: themeMode === 'dark' ? '#555' : 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: themeMode === 'dark' ? '#777' : '#1976d2',
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
      />
    </form>
  );
};

export default SearchBar;
