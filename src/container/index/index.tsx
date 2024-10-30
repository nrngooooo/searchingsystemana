'use client';

import { Box, IconButton, Button } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState } from 'react';
import SearchBar from '@/components/SearchBar/index';
import Image from 'next/image';

const Index = () => {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('light');
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
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: themeMode === 'dark' ? '#000' : '#fff',
        color: themeMode === 'dark' ? '#fff' : '#000',
        position: 'relative',
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          gap: '12px',
          padding: '10px',
          borderRadius: '8px',
        }}
      >
        <IconButton 
          onClick={toggleTheme} 
          sx={{ 
            color: themeMode === 'dark' ? '#ff9800' : '#333',
            '&:hover': {
              backgroundColor: themeMode === 'dark' ? 'rgba(255, 152, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {['en', 'mn', 'kr'].map((lang) => (
          <Button
            key={lang}
            onClick={() => handleLanguageChange(lang as 'en' | 'mn' | 'kr')}
            variant={language === lang ? 'contained' : 'outlined'}
            sx={{
              minWidth: '48px',
              height: '36px',
              color: language === lang 
                ? (themeMode === 'dark' ? '#fff' : '#fff')
                : (themeMode === 'dark' ? '#fff' : '#333'),
              backgroundColor: language === lang 
                ? (themeMode === 'dark' ? '#424242' : '#1976d2')
                : 'transparent',
              '&:hover': {
                backgroundColor: language === lang 
                  ? (themeMode === 'dark' ? '#616161' : '#1565c0')
                  : 'rgba(25, 118, 210, 0.04)',
              },
            }}
          >
            {lang.toUpperCase()}
          </Button>
        ))}
      </Box>

      {/* Main Logo */}
      <Box 
        sx={{ 
          mt: '100px',
          mb: '40px',
          width: '100%',
          maxWidth: '600px',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image 
          src="/images/logo.png" 
          alt="Main Logo" 
          width={400}
          height={400} 
          style={{ objectFit: 'contain' }}
        />
      </Box>

      {/* Search Bar Component */}
      <Box sx={{ width: '100%', maxWidth: '600px', px: 2 }}>
        <SearchBar 
          placeholder={placeholderText[language]} 
          themeMode={themeMode}
        />
      </Box>
    </Box>
  );
}

export default Index;
