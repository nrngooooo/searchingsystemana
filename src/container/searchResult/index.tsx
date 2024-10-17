import Carousel from '@/components/carousel';
import Sidebar from '@/components/sidebar';
import Profile from '@/components/profile';
import { Box } from '@mui/material';

const SearchResult = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content in the center (Carousel) */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Carousel />
      </Box>

      {/* Profile on the right */}
      <Profile />
    </Box>
  );
}

export default SearchResult;
