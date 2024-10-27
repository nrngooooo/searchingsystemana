"use client";

import { useState, useEffect } from "react";
import Carousel from "@/components/carousel";
import Sidebar from "@/components/sidebar";
import Profile from "@/components/profile";
import {
  Box,
  CssBaseline,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const SearchResult = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: "absolute", top: 10, right: 10 }}>
        <IconButton
          onClick={toggleTheme}
          sx={{ color: theme.palette.primary.main }}
        >
          {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar themeMode={themeMode} />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            p: "0 30px 20px"
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
