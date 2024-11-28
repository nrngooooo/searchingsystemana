"use client";

import { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LanguageIcon from "@mui/icons-material/Language";
import SearchBar from "@/components/SearchBar/index";
import Image from "next/image";

const Index = () => {
  const [themeMode, setThemeMode] = useState<"dark" | "light">("light");
  const [language, setLanguage] = useState<"en" | "mn" | "kr" | "zh" | "de" | "fr">(
    "en"
  ); // Added French (fr)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For language menu

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLanguageMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: "en" | "mn" | "kr" | "zh" | "de" | "fr") => {
    setLanguage(lang);
    handleLanguageMenuClose(); // Close the menu after selecting a language
  };

  // Placeholder text for each language
  const placeholderText = {
    en: "Search...",
    mn: "Хайх...",
    kr: "검색...",
    zh: "搜索...", // Chinese
    de: "Suche...", // German
    fr: "Rechercher...", // French
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: themeMode === "dark" ? "#000" : "#fff",
        color: themeMode === "dark" ? "#fff" : "#000",
        position: "relative",
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          gap: "12px",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <IconButton
          onClick={toggleTheme}
          sx={{
            color: themeMode === "dark" ? "#ff9800" : "#333",
            "&:hover": {
              backgroundColor:
                themeMode === "dark"
                  ? "rgba(255, 152, 0, 0.1)"
                  : "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {/* Language Menu */}
        <IconButton
          onClick={handleLanguageMenuOpen}
          sx={{
            color: themeMode === "dark" ? "#ff9800" : "#333", // Orange in dark mode, default in light mode
            "&:hover": {
              backgroundColor:
                themeMode === "dark"
                  ? "rgba(255, 152, 0, 0.1)"
                  : "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleLanguageMenuClose}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: themeMode === "dark" ? "#333" : "#f9f9f9",
              borderRadius: "8px",
              boxShadow:
                themeMode === "dark"
                  ? "0px 4px 20px rgba(255, 152, 0, 0.2)"
                  : "0px 4px 20px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          {["en", "mn", "kr", "zh", "de", "fr"].map((lang) => ( // Added 'fr'
            <MenuItem
              key={lang}
              onClick={() =>
                handleLanguageChange(lang as "en" | "mn" | "kr" | "zh" | "de" | "fr")
              }
              selected={language === lang}
              sx={{
                fontSize: "16px",
                fontWeight: language === lang ? "bold" : "normal",
                color: themeMode === "dark" ? "#ff9800" : "#333",
                "&:hover": {
                  backgroundColor:
                    themeMode === "dark"
                      ? "rgba(255, 152, 0, 0.2)"
                      : "rgba(0, 0, 0, 0.04)",
                  color: themeMode === "dark" ? "#fff" : "#000",
                },
              }}
            >
              {lang.toUpperCase()}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Main Logo */}
      <Box
        sx={{
          mt: "100px",
          mb: "40px",
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          src="/images/lgo.png"
          alt="Main Logo"
          width={400}
          height={400}
          style={{ objectFit: "contain" }}
        />
      </Box>

      {/* Search Bar Component */}
      <Box sx={{ width: "100%", maxWidth: "600px", px: 2 }}>
        <SearchBar
          placeholder={placeholderText[language]}
          themeMode={themeMode}
        />
      </Box>
    </Box>
  );
};

export default Index;
