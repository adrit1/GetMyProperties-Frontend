import React, { useState } from 'react';
import { Box, Avatar, IconButton, Menu, MenuItem, Tooltip, Divider, ListItemIcon, Button, Badge } from '@mui/material';
import { PersonAdd, Settings, Logout } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
    const navigation = useNavigate();
    const user = "hi";

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const navigateToProfile = () => {
        navigation("/user/profile")
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box display={{ xs: 'none', sm: 'flex' }} alignItems="center">
                <Link to="/">
                    <Button
                        sx={{ margin: '10px' }}
                        color="#ccc"
                        startIcon={<HomeIcon color='white' />}
                        style={{ color: 'white' }}
                    >
                        Home
                    </Button>
                </Link>

                <Link to="/properties">
                    <Button
                        sx={{ margin: '10px' }}
                        startIcon={<ShoppingCartIcon />}
                        style={{ color: 'white' }}
                    >
                        Properties
                    </Button>
                </Link>
                <Badge badgeContent={17} style={{ marginRight: "5px" }} color="error">
                    <NotificationsIcon />
                </Badge>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {user ? (
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Link to="/register">
                        <Button
                            sx={{ margin: '10px' }}
                            color="white"
                            startIcon={<LoginIcon />}
                            variant="outlined"
                        >
                            Login
                        </Button>
                    </Link>
                )}
            </Box>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx={{
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={navigateToProfile}>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={() => { navigator("/register") }}>
                    <Avatar /> Register/Login
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon><FavoriteBorderIcon /></ListItemIcon> Wishlist
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon><ViewInArIcon /></ListItemIcon> Orders
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default ProfileMenu;
// <!--<source type="video/mp4" src="https://property.magicbricks.com/mbvideo/Laureate.mp4"></source>-->