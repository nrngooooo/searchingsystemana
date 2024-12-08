"use client";

import { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Carousel from "@/components/carousel";
import Sidebar from "@/components/sidebar";
import Profile from "@/components/profile";
import {
  Box,
  CssBaseline,
  IconButton,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useSearchParams } from "next/navigation";
import Header from "@/components/headers";

// GraphQL Search Query
export const SEARCH_QUERY = gql`
  query SearchQuery($searchTerm: String!) {
    searchPeople(searchTerm: $searchTerm) {
      awards {
        category
        dateAwarded
        description
        organization
        title
      }
      nickname
      lastName
      firstName
      biography
      dateOfBirth
      education {
        degree
        institutionName
        startYear
        endYear
      }
      profileImage
      relatedPerson {
        relationshipType
        person {
          dateOfBirth
          education {
            degree
            endYear
            startYear
            institutionName
            fieldOfStudy
          }
          firstName
          lastName
          nickname
          socialmedialinkSet {
            platform
            profileImage
            profileUrl
          }
          writtenWorks {
            description
            genre
            publicationDate
            title
            id
          }
          profileImage
          artworks {
            artImage
            title
            description
            creationDate
            artist {
              biography
              dateOfBirth
              dateOfDeath
              education {
                degree
                endYear
                fieldOfStudy
                institutionName
                startYear
              }
              firstName
              lastName
              nickname
              musicAlbums {
                albumImage
                title
                releaseDate
              }
            }
          }
        }
      }
      filmRoles {
        film {
          filmImage
          releaseDate
          title
          id
        }
        role
        roleName
      }
      quotesSet {
        quoteText
        source
      }
      artworks {
        artImage
        creationDate
        title
        description
        id
      }
      musicAlbums {
        albumImage
        title
        releaseDate
        id
      }
      placeOfBirth
      writtenWorks {
        id
        title
        description
        publicationDate
        writtenWorksImage
      }
    }
  }
`;

interface RelatedPerson {
  relationshipType: string;
}

interface Education {
  degree: string;
  endYear: number;
  fieldOfStudy: string;
  institutionName: string;
  startYear: number;
}

interface SearchResultType {
  nickname: string;
  relatedPerson: RelatedPerson[];
  biography: string;
  education: Education[];
}

const SearchResult = () => {
  const searchParams = useSearchParams();
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const searchTerm = decodeURIComponent(searchParams.get("q") || "");

  const [executeSearch, { loading, error, data }] = useLazyQuery<{
    searchPeople: SearchResultType[];
  }>(SEARCH_QUERY, {
    variables: { searchTerm },
  });

  // Handle theme mode
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setThemeMode(storedTheme as "light" | "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Trigger search query when searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      void executeSearch();
    }
  }, [searchTerm, executeSearch]);

  // Update search results when data is fetched
  useEffect(() => {
    if (data?.searchPeople) {
      setSearchResults(data.searchPeople);
    }
  }, [data]);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#ff9800",
      },
      background: {
        default: themeMode === "light" ? "#ffffff" : "#1c1c1c",
      },
      text: {
        primary: themeMode === "light" ? "#333" : "#ffffff",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background:
              themeMode === "light"
                ? "linear-gradient(135deg, #fff4e6, #ffd1a4)"
                : "linear-gradient(135deg, #1c1c1c, #2e2e2e)",
          },
        },
      },
    },
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header themeMode={themeMode} />
      <Box sx={{ position: "absolute", top: 10, right: 10 }}>
        <IconButton
          onClick={toggleTheme}
          sx={{ color: theme.palette.primary.main }}
        >
          {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 77px)",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Sidebar themeMode={themeMode} searchTerm={searchTerm} />
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            backgroundColor: theme.palette.background.default,
          }}
        >
          {/* Search Results Section */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            {searchResults.length === 0 ? (
              <Typography>No results found.</Typography>
            ) : (
              searchResults.map((result, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant="h5">{result.nickname}</Typography>

                  {result.biography && (
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Biography:</strong> {result.biography}
                    </Typography>
                  )}

                  {result.education?.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography>
                        <strong>Education:</strong>
                      </Typography>
                      {result.education.map((edu, idx) => (
                        <Box key={idx} sx={{ mt: 1 }}>
                          <Typography variant="body2">
                            {edu.degree} in {edu.fieldOfStudy} from{" "}
                            {edu.institutionName} ({edu.startYear} -{" "}
                            {edu.endYear})
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              ))
            )}
          </Box>
          {/* Carousel Section */}
          <Carousel themeMode={themeMode} searchTerm={searchTerm} />
        </Box>
        <Profile themeMode={themeMode} searchTerm={searchTerm} />
      </Box>
    </ThemeProvider>
  );
};

export default SearchResult;
