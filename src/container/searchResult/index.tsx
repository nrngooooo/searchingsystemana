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
<<<<<<< HEAD
import Header from "@/components/headers";
=======
import { useSearchParams } from "next/navigation";
import Header from "@/components/headers";

// GraphQL Search Query
const SEARCH_QUERY = gql`
  query SearchQuery($searchTerm: String!) {
    searchPeople(searchTerm: $searchTerm) {
      nickname
      relatedPerson {
        relationshipType
      }
      biography
      education {
        degree
        endYear
        fieldOfStudy
        institutionName
        startYear
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
>>>>>>> master

const SearchResult = () => {
  const searchParams = useSearchParams();
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  // const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  // const searchTerm = decodeURIComponent(searchParams.get("q") || "");

  // const [executeSearch, { loading, error, data }] = useLazyQuery<{
  //   searchPeople: SearchResultType[];
  // }>(SEARCH_QUERY, {
  //   variables: { searchTerm },
  // });

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
  // useEffect(() => {
  //   if (searchTerm) {
  //     void executeSearch();
  //   }
  // }, [searchTerm, executeSearch]);

  // Update search results when data is fetched
  // useEffect(() => {
  //   if (data?.searchPeople) {
  //     setSearchResults(data.searchPeople);
  //   }
  // }, [data]);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#ff9800",
      },
      background: {
        default: themeMode === "light" ? "#f9f4ea" : "#1c1c1c",
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

  // if (loading) return <Typography>Loading...</Typography>;
  // if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header themeMode={themeMode} />
<<<<<<< HEAD
=======
      <Box sx={{ position: "absolute", top: 10, right: 10 }}>
        <IconButton
          onClick={toggleTheme}
          sx={{ color: theme.palette.primary.main }}
        >
          {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
>>>>>>> master
      <Box sx={{ position: "absolute", top: 10, right: 10 }}>
        <IconButton
          onClick={toggleTheme}
          sx={{ color: theme.palette.primary.main }}
        >
          {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>

<<<<<<< HEAD
      <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
=======
      <Box sx={{ display: "flex", height: "calc(100vh - 64px)", overflow: "hidden" }}>
>>>>>>> master
        <Sidebar themeMode={themeMode} />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            p: 2,
            overflowY: "auto",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Carousel themeMode={themeMode} />
        </Box>
        <Profile themeMode={themeMode} />
      </Box>
    </ThemeProvider>
  );
};

export default SearchResult;
