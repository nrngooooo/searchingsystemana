import { Box, Typography, Avatar, Link } from "@mui/material";

const Profile = () => {
  return (
    (<Box sx={{ width: "25%", bgcolor: "background.paper", padding: 2 }}>
      <Avatar
        alt="Kendrick Lamar"
        src="/images/kendrick.jpg"
        sx={{ width: 150, height: 150, marginBottom: 2 }}
      />
      <Typography variant="h6" sx={{
        color: "primary"
      }}>
        Kendrick Lamar
      </Typography>
      <Typography variant="body2" sx={{
        color: "textSecondary"
      }}>
        Born: Kendrick Lamar Duckworth <br />
        Occupation: Rapper, songwriter, etc.
        <br />
        Years active: 2003 - present
        <br />
        Organization: pgLang
      </Typography>
      <Link
        href="https://oklama.com"
        target="_blank"
        rel="noopener"
        sx={{
          color: "primary"
        }}
      >
        oklama.com
      </Link>
    </Box>)
  );
};

export default Profile;
