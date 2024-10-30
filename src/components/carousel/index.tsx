import { Box, IconButton, Avatar, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const artists = [
  { name: 'Dr. Dre', src: '/images/dre.webp' },
  { name: 'Baby Keem', src: '/images/baby.jfif' },
  { name: 'Drake', src: '/images/drake.webp' },
];

const Carousel = ({ themeMode }: { themeMode: 'light' | 'dark' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4, // Increased gap between items
        padding: '24px 32px', // More horizontal padding
        bgcolor: themeMode === 'light' ? '#f7f3ed' : '#1e1e1e',
        borderRadius: 4,
        boxShadow: themeMode === 'dark' 
          ? '0px 4px 20px rgba(255, 152, 0, 0.3)' 
          : '0px 4px 15px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease', // Smooth transition for theme changes
        '&:hover': {
          boxShadow: themeMode === 'dark' 
            ? '0px 6px 25px rgba(255, 152, 0, 0.4)' 
            : '0px 6px 20px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <IconButton 
        sx={{ 
          color: themeMode === 'dark' ? '#ff9800' : '#333',
          '&:hover': {
            backgroundColor: themeMode === 'dark' 
              ? 'rgba(255, 152, 0, 0.1)' 
              : 'rgba(0, 0, 0, 0.04)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      {artists.map((artist) => (
        <Box 
          key={artist.name} 
          sx={{ 
            textAlign: 'center',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Avatar
            alt={artist.name}
            src={artist.src}
            sx={{
              width: 120, // Slightly larger avatars
              height: 120,
              margin: '0 auto',
              border: themeMode === 'dark' 
                ? '3px solid rgba(255, 152, 0, 0.3)' 
                : '3px solid rgba(0, 0, 0, 0.08)',
              boxShadow: themeMode === 'dark' 
                ? '0px 0px 15px rgba(255, 152, 0, 0.3)' 
                : '0px 0px 10px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: themeMode === 'dark' 
                  ? '0px 0px 20px rgba(255, 152, 0, 0.4)' 
                  : '0px 0px 15px rgba(0, 0, 0, 0.15)',
              },
            }}
          />
          <Typography 
            variant="subtitle2" // Changed from caption for better readability
            sx={{ 
              color: themeMode === 'light' ? '#333' : '#ff9800',
              marginTop: 2,
              fontWeight: 500, // Semi-bold text
              fontSize: '0.9rem',
              transition: 'color 0.3s ease',
            }}
          >
            {artist.name}
          </Typography>
        </Box>
      ))}

      <IconButton 
        sx={{ 
          color: themeMode === 'dark' ? '#ff9800' : '#333',
          '&:hover': {
            backgroundColor: themeMode === 'dark' 
              ? 'rgba(255, 152, 0, 0.1)' 
              : 'rgba(0, 0, 0, 0.04)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default Carousel;
