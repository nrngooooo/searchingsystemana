import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { SEARCH_QUERY } from "@/container/searchResult";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  themeMode: "light" | "dark";
  searchTerm: string;
}

const Sidebar = ({ themeMode, searchTerm }: SidebarProps) => {
  const router = useRouter();
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
              id: album.id,
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
              id: artwork.id,
            }))
          );
        }
        if (person.writtenWorks?.length) {
          items.push(
            ...person.writtenWorks.map((writtenwork: any) => ({
              type: "writtenwork",
              title: writtenwork.title,
              image: writtenwork.writtenWorksImage,
              date: writtenwork.publicationDate,
              description: writtenwork.description,
              id: writtenwork.id,
            }))
          );
        }
        if (person.filmRoles?.length) {
          items.push(
            ...person.filmRoles.map((role: any) => ({
              type: "film",
              title: role.film.title,
              image: role.film.filmImage,
              date: role.film.releaseDate,
              role: role.roleName,
              id: role.film.id,
            }))
          );
        }
        return items;
      });
      setSidebarData(result);
    }
  }, [data]);

  if (loading) return <Typography>Loading data...</Typography>;
  if (error)
    return <Typography>Error loading data: {error.message}</Typography>;
  if (!sidebarData.length) return <Typography>No items found</Typography>;

  const handleItemClick = (item: any) => {
    // Navigate based on the type of the item (album, artwork, writtenwork, or film)
    const path = `/details/${item.type}/${item.id}`;
    router.push(path);
  };

  return (
    <Box
      sx={{
        width: "20%",
        minWidth: "250px",
        bgcolor: themeMode === "light" ? "white" : "#1e1e1e",
        borderRight: `3px solid ${themeMode === "light" ? "#ff9800" : "#333"}`,
        padding: 3,
        boxShadow:
          themeMode === "dark"
            ? "2px 0px 15px rgba(255, 152, 0, 0.2)"
            : "2px 0px 15px rgba(255, 90, 0, 0.2)",
        maxHeight: "100vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <List sx={{ padding: 0 }}>
        {sidebarData.map((item, index) => (
          <ListItem
            key={index}
            onClick={() => handleItemClick(item)} // Trigger navigate on click
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
                    : "rgba(255, 152, 0, 0.1)",
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
                    border:
                      themeMode === "dark"
                        ? "2px solid rgba(255, 152, 0, 0.3)"
                        : "2px solid rgba(255, 152, 0, 0.8)",
                    boxShadow:
                      themeMode === "dark"
                        ? "0px 0px 15px rgba(255, 152, 0, 0.3)"
                        : "0px 0px 15px rgba(255, 152, 0, 0.6)",
                  }}
                />
              </ListItemAvatar>
            )}
            <Typography
              variant="subtitle1"
              sx={{
                color: themeMode === "light" ? "#ff9800" : "#ff9800",
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
                  color: themeMode === "light" ? "#ff9800" : "#ffa726",
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
