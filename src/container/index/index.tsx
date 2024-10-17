'use client';

import { Box, IconButton, Button } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState } from 'react';
import SearchBar from '@/components/SearchBar';

 const Index = () => {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'en' | 'mn' | 'kr'>('en'); // Track current language

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLanguageChange = (lang: 'en' | 'mn' | 'kr') => {
    setLanguage(lang);
  };

  // Placeholder text based on selected language
  const placeholderText = {
    en: 'Search...',
    mn: 'Хайх...',
    kr: '검색...',
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themeMode === 'dark' ? '#000' : '#fff',
        color: themeMode === 'dark' ? '#fff' : '#000',
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          gap: '10px',
        }}
      >
        <IconButton onClick={toggleTheme} sx={{ color: themeMode === 'dark' ? '#ff9800' : '#333' }}>
          {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <Button
          onClick={() => handleLanguageChange('en')}
          variant={language === 'en' ? 'contained' : 'outlined'}
          sx={{ color: themeMode === 'dark' ? '#ff9800' : '#333' }}
        >
          EN
        </Button>
        <Button
          onClick={() => handleLanguageChange('mn')}
          variant={language === 'mn' ? 'contained' : 'outlined'}
          sx={{ color: themeMode === 'dark' ? '#ff9800' : '#333' }}
        >
          MN
        </Button>
        <Button
          onClick={() => handleLanguageChange('kr')}
          variant={language === 'kr' ? 'contained' : 'outlined'}
          sx={{ color: themeMode === 'dark' ? '#ff9800' : '#333' }}
        >
          KR
        </Button>
      </Box>

      {/* Main Logo */}
      <Box sx={{ marginBottom: '30px' }}>
        <img src="/path/to/your/logo.png" alt="Main Logo" width={150} height={150} />
      </Box>

      {/* Search Bar Component */}
      <SearchBar placeholder={placeholderText[language]} />
    </Box>
  );
}

export default Index;
