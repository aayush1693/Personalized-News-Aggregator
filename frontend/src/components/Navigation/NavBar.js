import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: 'lightgray' }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Personalized News Aggregator
                </Typography>
                <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                <Button color="inherit" component={Link} to="/bookmarks">Bookmarks</Button>
                <Button color="inherit" component={Link} to="/settings">Settings</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;