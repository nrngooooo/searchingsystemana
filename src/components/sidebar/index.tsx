import { Box, List, ListItem, ListItemAvatar, Avatar, Typography } from '@mui/material';

const albums = [
  { name: 'Mr. Morale', src: '/images/morale.jpg' },
  { name: 'DAMN.', src: '/images/damn.jpg' },
  { name: 'Not Like Us', src: '/images/notlikeus.jpg' },
];

const Sidebar = ({ themeMode }: { themeMode: 'light' | 'dark' }) => {
  return (
    <Box
      sx={{
        width: '20%',
        bgcolor: themeMode === 'light' ? '#f7f3ed' : '#1e1e1e',
        borderRight: `2px solid ${themeMode === 'light' ? '#ff9800' : '#333'}`,
        padding: 2,
        boxShadow: themeMode === 'light' ? '2px 0px 6px rgba(0,0,0,0.1)' : '2px 0px 6px rgba(255,152,0,0.3)',
      }}
    >
      <List>
        {albums.map((album) => (
          <ListItem
            key={album.name}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <ListItemAvatar>
              <Avatar
                alt={album.name}
                src={album.src}
                sx={{
                  width: 80,
                  height: 80,
                  boxShadow: themeMode === 'dark' ? '0px 0px 10px rgba(255, 152, 0, 0.6)' : 'none',
                }}
              />
            </ListItemAvatar>
            <Typography variant="caption" sx={{ color: themeMode === 'light' ? '#333' : '#ff9800' }}>
              {album.name}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
