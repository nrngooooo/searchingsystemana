import { Box, IconButton, Avatar, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SEARCH_QUERY } from "@/container/searchResult";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

interface RelatedPerson {
  person: {
    nickname: string;
    profileImage: string;
  };
}

interface RelationshipType {
  relatedPerson: RelatedPerson[]; // Assuming relatedPerson is an array
}

const Carousel = ({
  themeMode,
  searchTerm,
}: {
  themeMode: "light" | "dark";
  searchTerm: string;
}) => {
  const [executeSearch, { data, loading, error }] = useLazyQuery(SEARCH_QUERY);
  const [relationshipData, setRelationshipData] = useState<RelationshipType[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (searchTerm) {
      void executeSearch({ variables: { searchTerm } });
    }
  }, [searchTerm, executeSearch]);

  // Update profile data based on search results
  useEffect(() => {
    if (data?.searchPeople?.length > 0) {
      setRelationshipData(data.searchPeople); // Store all people in relationshipData
    }
  }, [data]);

  // Handle the previous and next button clicks
  const handlePrev = () => {
    if (relationshipData) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? relationshipData.length - 1 : prevIndex - 1));
    }
  };

  const handleNext = () => {
    if (relationshipData) {
      setCurrentIndex((prevIndex) => (prevIndex === relationshipData.length - 1 ? 0 : prevIndex + 1));
    }
  };

  if (loading) return <Typography>Loading profile...</Typography>;
  if (error) return <Typography>Error loading profile: {error.message}</Typography>;
  if (!relationshipData || relationshipData.length === 0) {
    return <Typography>No profiles found</Typography>;
  }

  const currentPerson = relationshipData[currentIndex];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        p: 3,
        bgcolor: themeMode === "light" ? "#f7f3ed" : "#1e1e1e",
        borderRadius: 4,
        boxShadow:
          themeMode === "dark"
            ? "0px 4px 20px rgba(255, 152, 0, 0.3)"
            : "0px 4px 15px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow:
            themeMode === "dark"
              ? "0px 6px 25px rgba(255, 152, 0, 0.4)"
              : "0px 6px 20px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <IconButton
        onClick={handlePrev}
        sx={{
          color: themeMode === "dark" ? "#ff9800" : "#333",
          "&:hover": {
            backgroundColor:
              themeMode === "dark"
                ? "rgba(255, 152, 0, 0.1)"
                : "rgba(0, 0, 0, 0.04)",
          },
          transition: "all 0.2s ease",
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
        }}
      >
        {currentPerson.relatedPerson.map((related, index) => (
          <Box
            key={index}
            sx={{
              textAlign: "center",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Avatar
              alt={related.person.nickname}
              src={`http://localhost:8000/media/${related.person.profileImage}`}
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                border: `3px solid ${
                  themeMode === "dark"
                    ? "rgba(255, 152, 0, 0.3)"
                    : "rgba(0, 0, 0, 0.08)"
                }`,
                boxShadow:
                  themeMode === "dark"
                    ? "0px 0px 15px rgba(255, 152, 0, 0.3)"
                    : "0px 0px 10px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow:
                    themeMode === "dark"
                      ? "0px 0px 20px rgba(255, 152, 0, 0.4)"
                      : "0px 0px 15px rgba(0, 0, 0, 0.15)",
                },
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                color: themeMode === "light" ? "#333" : "#ff9800",
                mt: 2,
                fontWeight: 500,
                fontSize: "0.9rem",
                transition: "color 0.3s ease",
              }}
            >
              {related.person.nickname}
            </Typography>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={handleNext}
        sx={{
          color: themeMode === "dark" ? "#ff9800" : "#333",
          "&:hover": {
            backgroundColor:
              themeMode === "dark"
                ? "rgba(255, 152, 0, 0.1)"
                : "rgba(0, 0, 0, 0.04)",
          },
          transition: "all 0.2s ease",
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default Carousel;
