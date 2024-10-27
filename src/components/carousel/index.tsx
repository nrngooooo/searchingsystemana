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
        gap: 2,
        padding: 2,
        bgcolor: themeMode === 'light' ? '#f7f3ed' : '#1e1e1e',
        borderRadius: 3,
        boxShadow: themeMode === 'dark' ? '0px 0px 15px rgba(255, 152, 0, 0.6)' : '0px 0px 10px rgba(0,0,0,0.1)',
      }}
    >
      <IconButton sx={{ color: themeMode === 'dark' ? '#ff9800' : '#333' }}>
        <ArrowBackIosIcon />
      </IconButton>
      {artists.map((artist) => (
        <Box key={artist.name} sx={{ textAlign: 'center' }}>
          <Avatar
            alt={artist.name}
            src={artist.src}
            sx={{
              width: 100,
              height: 100,
              margin: '0 auto',
              boxShadow: themeMode === 'dark' ? '0px 0px 10px rgba(255, 152, 0, 0.6)' : '0px 0px 5px rgba(0,0,0,0.2)',
            }}
          />
          <Typography variant="caption" sx={{ color: themeMode === 'light' ? '#333' : '#ff9800', marginTop: 1 }}>
            {artist.name}
          </Typography>
        </Box>
      ))}
      <IconButton sx={{ color: themeMode === 'dark' ? '#ff9800' : '#333' }}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default Carousel;
