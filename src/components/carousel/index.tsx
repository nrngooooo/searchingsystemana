import { Box, IconButton, Avatar } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const artists = [
  { name: 'Dr. Dre', src: '/images/dre.jpg' },
  { name: 'Baby Keem', src: '/images/keem.jpg' },
  { name: 'Drake', src: '/images/drake.jpg' },
];

const Carousel = () => {
  // Carousel logic can be expanded with state for sliding, for simplicity this will just be static
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <IconButton>
        <ArrowBackIosIcon />
      </IconButton>
      {artists.map((artist) => (
        <Avatar key={artist.name} alt={artist.name} src={artist.src} sx={{ width: 150, height: 150 }} />
      ))}
      <IconButton>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default Carousel;
