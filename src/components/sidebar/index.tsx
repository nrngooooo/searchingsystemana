import { Box, List, ListItem, ListItemAvatar, Avatar, Typography } from "@mui/material";
import { SEARCH_QUERY } from "@/container/searchResult";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

interface SidebarProps {
  themeMode: "light" | "dark";
  searchTerm: string;
}

const Sidebar = ({ themeMode, searchTerm }: SidebarProps) => {
  const [executeSearch, { data, loading, error }] = useLazyQuery(SEARCH_QUERY);
  const [sidebarData, setSidebarData] = useState<any[]>([]);

  useEffect(() => {
    if (searchTerm) {
      void executeSearch({ variables: { searchTerm } });
    }
  }, [searchTerm, executeSearch]);

  useEffect(() => {
    if (data?.searchPeople?.length > 0) {
      const result = data.searchPeople.flatMap((person: any) => {
        const items = [];
        if (person.musicAlbums?.length) {
          items.push(
            ...person.musicAlbums.map((album: any) => ({
              type: "album",
              title: album.title,
              image: album.albumImage,
              date: album.releaseDate,
            }))
          );
        }
        if (person.artworks?.length) {
          items.push(
            ...person.artworks.map((artwork: any) => ({
              type: "artwork",
              title: artwork.title,
              image: artwork.artImage,
              date: artwork.creationDate,
              description: artwork.description,
            }))
          );
        }
        if (person.filmRoles?.length) {
          items.push(
            ...person.filmRoles.map((role: any) => ({
              type: "film",
              title: role.film.title,
              date: role.film.releaseDate,
              role: role.roleName,
            }))
          );
        }
        return items;
      });
      setSidebarData(result);
    }
  }, [data]);

  if (loading) return <Typography>Loading data...</Typography>;
  if (error) return <Typography>Error loading data: {error.message}</Typography>;
  if (!sidebarData.length) return <Typography>No items found</Typography>;

  return (
    <Box
      sx={{
        width: "20%",
        minWidth: "250px",
        bgcolor: themeMode === "light" ? "#f7f3ed" : "#1e1e1e",
        borderRight: `3px solid ${themeMode === "light" ? "#ff9800" : "#333"}`,
        padding: 3,
        boxShadow: themeMode === "dark"
          ? "2px 0px 15px rgba(255, 152, 0, 0.2)"
          : "2px 0px 10px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
      }}
    >
      <List sx={{ padding: 0 }}>
        {sidebarData.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 3,
              padding: 2,
              borderRadius: 2,
              transition: "all 0.2s ease",
              cursor: "pointer",
              "&:hover": {
                backgroundColor:
                  themeMode === "dark"
                    ? "rgba(255, 152, 0, 0.1)"
                    : "rgba(0, 0, 0, 0.04)",
                transform: "translateY(-2px)",
              },
            }}
          >
            {item.image && (
              <ListItemAvatar sx={{ marginBottom: 1 }}>
                <Avatar
                  alt={item.title}
                  src={`http://localhost:8000/media/${item.image}`}
                  sx={{
                    width: 100,
                    height: 100,
                    
                    border: themeMode === "dark"
                      ? "2px solid rgba(255, 152, 0, 0.3)"
                      : "2px solid rgba(0, 0, 0, 0.08)",
                    boxShadow: themeMode === "dark"
                      ? "0px 0px 15px rgba(255, 152, 0, 0.3)"
                      : "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </ListItemAvatar>
            )}
            <Typography
              variant="subtitle1"
              sx={{
                color: themeMode === "light" ? "#333" : "#ff9800",
                fontWeight: 500,
                fontSize: "0.95rem",
                textAlign: "center",
                marginTop: 1,
              }}
            >
              {item.title}
            </Typography>
            {item.date && (
              <Typography
                variant="caption"
                sx={{
                  color: themeMode === "light" ? "#666" : "#ffa726",
                  textAlign: "center",
                  fontSize: "0.8rem",
                }}
              >
                {item.date}
              </Typography>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
