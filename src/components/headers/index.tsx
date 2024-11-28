<<<<<<< HEAD
import React from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
=======
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
>>>>>>> master

interface HeaderProps {
    themeMode: "light" | "dark";
}

const Header: React.FC<HeaderProps> = ({ themeMode }) => {
<<<<<<< HEAD
    return (
        <AppBar position="static" sx={{ backgroundColor: themeMode === "dark" ? '#333' : '#f5e2de' }}>
            <Toolbar>
                <img src="/images/logo.png" alt="MyWebsite Logo" style={{ height: '70px', marginRight: '1px' }} />
=======
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [language, setLanguage] = useState<string>('en'); // Default language

    const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLanguageClose = (lang: string) => {
        setLanguage(lang);
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: themeMode === "dark" ? '#333' : '#f5e2de' }}>
            <Toolbar>
                <img src="/images/lgo.png" alt="MyWebsite Logo" style={{ height: '70px', marginRight: '16px' }} />
>>>>>>> master
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    sx={{
                        marginRight: '16px',
                        backgroundColor: themeMode === "dark" ? '#fff' : '#fff',
                        '& .MuiInputBase-input': {
                            color: themeMode === "dark" ? '#000' : '#000',
                        },
                        '& .MuiInputLabel-root': {
                            color: themeMode === "dark" ? '#000' : '#000',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: themeMode === "dark" ? '#000' : '#1976d2',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: themeMode === "dark" ? '#000' : '#1976d2',
                        },
                    }}
                />
                <IconButton color="inherit">
                    <SearchIcon />
                </IconButton>
<<<<<<< HEAD
=======
                <IconButton
                    color="inherit"
                    onClick={handleLanguageClick}
                >
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
>>>>>>> master
            </Toolbar>
        </AppBar>
    );
};

<<<<<<< HEAD
export default Header;
=======
export default Header;
>>>>>>> master
