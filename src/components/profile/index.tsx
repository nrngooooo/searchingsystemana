import { Box, Typography, Avatar, Link } from '@mui/material';

const Profile = ({ themeMode }: { themeMode: 'light' | 'dark' }) => {
  return (
    <Box
      sx={{
        width: '25%',
        bgcolor: themeMode === 'light' ? '#f7f3ed' : '#1e1e1e',
        padding: 3,
        borderRadius: 2,
        color: themeMode === 'light' ? '#333' : '#ff9800',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderLeft: `2px solid ${themeMode === 'light' ? '#ff9800' : '#333'}`,
      }}
    >
      <Avatar
        alt="Kendrick Lamar"
        src="/images/kendrick.jpg"
        sx={{
          width: 150,
          height: 150,
          marginBottom: 2,
          boxShadow: themeMode === 'dark' ? '0px 0px 10px rgba(255, 152, 0, 0.6)' : '0px 0px 10px rgba(255, 152, 0, 0.3)',
        }}
      />
      <Typography variant="h6" sx={{ color: themeMode === 'light' ? '#333' : '#ff9800', marginBottom: 1 }}>
        Kendrick Lamar
      </Typography>
      <Typography variant="body2" sx={{ color: themeMode === 'light' ? '#333' : '#ff9800', marginBottom: 2, textAlign: 'center' }}>
        Born: Kendrick Lamar Duckworth<br />
        Occupation: Rapper, songwriter, etc.<br />
        Years active: 2003 - present<br />
        Organization: pgLang
      </Typography>
      <Link
        href="https://oklama.com"
        target="_blank"
        rel="noopener"
        sx={{ color: themeMode === 'light' ? '#333' : '#ff9800', textDecoration: 'none' }}
      >
        oklama.com
      </Link>
    </Box>
  );
};

export default Profile;
