import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { MobileMenu } from './MobileMenu.js';
import ProfileMenu from './ProfileMenu.js';
import { Search } from './Search.js';



const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }} id="back-to-top-anchor">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            GMP
          </Typography>
          <Search />
          <Box sx={{ flexGrow: 1 }} />
          <ProfileMenu />
          <Box display={{ sm: 'none', xs: 'flex' }}>
            <MobileMenu open={open} toggleDrawer={toggleDrawer} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
