import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "../SearchBar"; // Ensure this component is correctly implemented and imported

interface HeaderProps {
  themeMode: "light" | "dark";
}

const Header: React.FC<HeaderProps> = ({ themeMode }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState<string>("en"); // Default language

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = (lang: string) => {
    setLanguage(lang);
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="relative"
      sx={{ backgroundColor: themeMode === "dark" ? "#333" : "white",  }}
    >
      <Toolbar>
        <Link href="/" passHref>
          <Image
            src="/images/lgo.png"
            alt="MyWebsite Logo"
            width={70}
            height={70}
            style={{ marginRight: "16px" }}
          />
        </Link>
        <SearchBar placeholder={language} themeMode={themeMode} />{" "}
        {/* Custom SearchBar */}
        <IconButton color="inherit" onClick={handleLanguageClick}>
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {["en", "mn", "kr", "zh", "de", "fr"].map((lang) => (
            <MenuItem
              key={lang}
              onClick={() => handleLanguageClose(lang)}
              selected={language === lang}
            >
              {lang.toUpperCase()}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
