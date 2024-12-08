"use client";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_QUERY } from "@/container/searchResult";
import { useEffect, useState } from "react";
import { Typography, Box, Avatar, Button, Paper } from "@mui/material";
import { useParams } from "next/navigation"; // Import useParams

const Detail = () => {
  const { id, type } = useParams(); // Get route parameters (id and type)
  const [executeSearch, { data, loading, error }] = useLazyQuery(SEARCH_QUERY);
  const [itemDetails, setItemDetails] = useState<any>(null);

  useEffect(() => {
    if (id) {
      void executeSearch({ variables: { searchTerm: id } });
    }
  }, [id, executeSearch]);

  useEffect(() => {
    if (data?.searchPeople) {
      const result = data.searchPeople.flatMap((person: any) => {
        const items = [];

        if (person.musicAlbums?.length) {
          items.push(
            ...person.musicAlbums.map((album: any) => ({
              type: "album",
              title: album.title,
              image: album.albumImage,
              date: album.releaseDate,
              description: album.description,
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
              description: role.roleName,
              id: role.film.id,
            }))
          );
        }
        return items;
      });

      const foundItem = result.find((item: any) => item.id === id);
      if (foundItem) {
        setItemDetails(foundItem);
      }
    }
  }, [data, id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading data: {error.message}</Typography>;

  if (!itemDetails) {
    return <Typography>No details found for the selected item</Typography>;
  }

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Avatar
          alt={itemDetails.title}
          src={`http://localhost:8000/media/${itemDetails.image}`}
          sx={{
            width: 200,
            height: 200,
            marginBottom: 2,
            borderRadius: "8px",
          }}
        />
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          {itemDetails.title}
        </Typography>
        {itemDetails.date && (
          <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
            {itemDetails.type === "album" ? "Release Date:" : "Creation Date:"}{" "}
            {itemDetails.date}
          </Typography>
        )}
        {itemDetails.description && (
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            {itemDetails.description}
          </Typography>
        )}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          More Details
        </Button>
      </Paper>
    </Box>
  );
};

export default Detail;
