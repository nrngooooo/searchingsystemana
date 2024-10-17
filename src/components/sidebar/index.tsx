import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";

const albums = [
  { name: "Mr. Morale", src: "/images/morale.jpg" },
  { name: "DAMN.", src: "/images/damn.jpg" },
  { name: "Not Like Us", src: "/images/notlikeus.jpg" },
];

const Sidebar = () => {
  return (
    <Box sx={{ width: "20%", bgcolor: "background.default", padding: 2 }}>
      <List>
        {albums.map((album) => (
          <ListItem
            key={album.name}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ListItemAvatar>
              <Avatar
                alt={album.name}
                src={album.src}
                sx={{ width: 80, height: 80 }}
              />
            </ListItemAvatar>
            <Typography variant="body2" color="textPrimary">
              {album.name}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
