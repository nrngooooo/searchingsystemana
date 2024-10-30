import { Box, List, ListItem, ListItemAvatar, Avatar, Typography } from '@mui/material';

const albums = [
  { name: 'Mr. Morale', src: '/images/4.jfif' },
  { name: 'DAMN.', src: '/images/3.jpg' },
  { name: 'Not Like Us', src: '/images/2.jfif' },
];

const Sidebar = ({ themeMode }: { themeMode: 'light' | 'dark' }) => {
  return (
    <Box
      sx={{
        width: '20%',
        minWidth: '250px',
        bgcolor: themeMode === 'light' ? '#f7f3ed' : '#1e1e1e',
        borderRight: `3px solid ${themeMode === 'light' ? '#ff9800' : '#333'}`,
        padding: 3,
        boxShadow: themeMode === 'dark' 
          ? '2px 0px 15px rgba(255, 152, 0, 0.2)' 
          : '2px 0px 10px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: themeMode === 'dark' 
            ? '2px 0px 20px rgba(255, 152, 0, 0.3)' 
            : '2px 0px 15px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <List sx={{ padding: 0 }}>
        {albums.map((album) => (
          <ListItem
            key={album.name}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 3,
              padding: 2,
              borderRadius: 2,
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: themeMode === 'dark' 
                  ? 'rgba(255, 152, 0, 0.1)' 
                  : 'rgba(0, 0, 0, 0.04)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <ListItemAvatar sx={{ marginBottom: 1 }}>
              <Avatar
                alt={album.name}
                src={album.src}
                sx={{
                  width: 100,
                  height: 100,
                  border: themeMode === 'dark' 
                    ? '2px solid rgba(255, 152, 0, 0.3)' 
                    : '2px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: themeMode === 'dark' 
                    ? '0px 0px 15px rgba(255, 152, 0, 0.3)' 
                    : '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: themeMode === 'dark' 
                      ? '0px 0px 20px rgba(255, 152, 0, 0.4)' 
                      : '0px 0px 15px rgba(0, 0, 0, 0.15)',
                  },
                }}
              />
            </ListItemAvatar>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: themeMode === 'light' ? '#333' : '#ff9800',
                fontWeight: 500,
                fontSize: '0.95rem',
                textAlign: 'center',
                transition: 'color 0.3s ease',
                marginTop: 1,
                '&:hover': {
                  color: themeMode === 'light' ? '#ff9800' : '#ffa726',
                },
              }}
            >
              {album.name}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
