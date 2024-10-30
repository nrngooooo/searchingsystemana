import React from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface HeaderProps {
    themeMode: "light" | "dark";
}

const Header: React.FC<HeaderProps> = ({ themeMode }) => {
    return (
        <AppBar position="static" sx={{ backgroundColor: themeMode === "dark" ? '#333' : '#f5e2de' }}>
            <Toolbar>
                <img src="/images/logo.png" alt="MyWebsite Logo" style={{ height: '70px', marginRight: '1px' }} />
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
            </Toolbar>
        </AppBar>
    );
};

export default Header;
