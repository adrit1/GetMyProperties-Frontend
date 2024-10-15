import React from 'react';
import { Box, Grid, Typography, IconButton, Link } from '@mui/material';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css'; // Assuming you have modular CSS for additional styling

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#f1f1f1',
                padding: '20px 40px',
                width: '100%',
                textAlign: 'center',
                marginTop: 'auto', // Makes sure footer is pushed to bottom
            }}
        >
            <Grid container spacing={4} justifyContent="center">
                {/* About Us Section */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="body2">
                        We provide the best property services, offering a wide range of real estate options for buyers and sellers.
                    </Typography>
                </Grid>

                {/* Services Section */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                        Services
                    </Typography>
                    <Typography variant="body2"><Link href="#" underline="hover">Property Listings</Link></Typography>
                    <Typography variant="body2"><Link href="#" underline="hover">Tour Scheduling</Link></Typography>
                    <Typography variant="body2"><Link href="#" underline="hover">Consultation</Link></Typography>
                </Grid>

                {/* Social Media Section */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                        Follow Us
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '10px', justifyContent: "center", alignItems: "center" }}>
                        <IconButton href="https://facebook.com" aria-label="Facebook" color="primary">
                            <FaFacebook />
                        </IconButton>
                        <IconButton href="https://instagram.com" aria-label="Instagram" color="secondary">
                            <FaInstagram />
                        </IconButton>
                        <IconButton href="https://twitter.com" aria-label="Twitter" color="primary">
                            <FaTwitter />
                        </IconButton>
                        <IconButton href="https://linkedin.com" aria-label="LinkedIn" color="primary">
                            <FaLinkedin />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ textAlign: 'center', marginTop: '30px' }}>
                <Typography variant="body2">© 2024 PropertyFinder. All Rights Reserved.</Typography>
            </Box>
        </Box>
    );
};

export default Footer;
