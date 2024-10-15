import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom'; // Change this



const DrawerList = ({ onClose }) => {
    const navigate = useNavigate(); // Change useNavigation to useNavigate

    const handleClickHome = () => {

        onClose();
        navigate("/");
    };
    const handleClickCart = () => {

        navigate("/properties");
        onClose();
    };
    const handleClickNotification = () => {

        navigate("/");
        onClose();
    };

    return (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleClickHome}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleClickCart}>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Properties" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleClickNotification}>
                        <ListItemIcon>
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary="Notifications" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
        </Box>
    );
};

export { DrawerList };
