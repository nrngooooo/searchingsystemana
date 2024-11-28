"use client"; // This ensures the component runs on the client side

import { useState, useEffect } from "react";
import {
  CssBaseline,
  Box,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { ApolloWrapper } from "@/container/ApolloWrapper";

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // State for theme mode, defaulting to light mode
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  // Load theme from localStorage or set the default
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setThemeMode(storedTheme as "light" | "dark");
    }
  }, []);

  // Create MUI theme based on current themeMode
  const theme = createTheme({
    palette: {
      mode: themeMode, // Dynamically set to 'light' or 'dark'
      primary: {
        main: "#ff9800", // Customize primary color
      },
      background: {
        default: themeMode === "light" ? "#ffffff" : "#121212", // Background based on theme
      },
      text: {
        primary: themeMode === "light" ? "#000000" : "#ffffff", // Text based on theme
      },
    },
  });

  return (
    <ApolloWrapper>

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
        }}
        >
        {children}
      </Box>
    </ThemeProvider>
        </ApolloWrapper>
  );
}
