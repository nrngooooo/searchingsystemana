import { Box, Typography, Avatar, Link } from '@mui/material';

const Profile = ({ themeMode }: { themeMode: 'light' | 'dark' }) => {
  return (
    <Box
      sx={{
        width: '25%',
        minWidth: '300px',
        height: '100vh',
        bgcolor: themeMode === 'light' ? '#f7f3ed' : '#1e1e1e',
        padding: '40px 30px',
        color: themeMode === 'light' ? '#333' : '#ff9800',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderLeft: `3px solid ${themeMode === 'light' ? '#ff9800' : '#333'}`,
        boxShadow: themeMode === 'dark' 
          ? '-2px 0px 15px rgba(255, 152, 0, 0.15)' 
          : '-2px 0px 10px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s ease',
        overflowY: 'auto',
      }}
    >
      <Avatar
        alt="Kendrick Lamar"
        src="/images/5.webp"
        sx={{
          width: 180,
          height: 180,
          marginBottom: 4,
          border: themeMode === 'dark' 
            ? '3px solid rgba(255, 152, 0, 0.2)' 
            : '3px solid rgba(0, 0, 0, 0.06)',
          boxShadow: themeMode === 'dark' 
            ? '0px 0px 20px rgba(255, 152, 0, 0.3)' 
            : '0px 0px 15px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: themeMode === 'dark' 
              ? '0px 0px 25px rgba(255, 152, 0, 0.4)' 
              : '0px 0px 20px rgba(0, 0, 0, 0.15)',
          },
        }}
      />
      <Typography 
        variant="h5" 
        sx={{ 
          color: themeMode === 'light' ? '#333' : '#ff9800',
          marginBottom: 2,
          fontWeight: 600,
          letterSpacing: '0.5px',
          textAlign: 'center',
        }}
      >
        Kendrick Lamar
      </Typography>
      <Box
        sx={{
          backgroundColor: themeMode === 'dark' 
            ? 'rgba(255, 152, 0, 0.05)'
            : 'rgba(0, 0, 0, 0.02)',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: 3,
          width: '100%',
          transition: 'all 0.3s ease',
        }}
      >
        <Typography 
          variant="body1" 
          sx={{ 
            color: themeMode === 'light' ? '#555' : '#e0e0e0',
            textAlign: 'center',
            lineHeight: 2,
            fontSize: '0.95rem',
          }}
        >
          Born: Kendrick Lamar Duckworth<br />
          Occupation: Rapper, songwriter, etc.<br />
          Years active: 2003 - present<br />
          Organization: pgLang
        </Typography>
      </Box>
      <Link
        href="https://oklama.com"
        target="_blank"
        rel="noopener"
        sx={{ 
          color: themeMode === 'light' ? '#ff9800' : '#ff9800',
          textDecoration: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: 500,
          fontSize: '0.95rem',
          letterSpacing: '0.5px',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: themeMode === 'dark' 
              ? 'rgba(255, 152, 0, 0.1)' 
              : 'rgba(255, 152, 0, 0.08)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        oklama.com
      </Link>
    </Box>
  );
};

export default Profile;
