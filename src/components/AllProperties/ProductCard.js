import React from 'react';
import { CardContent, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '../UI/Button/AnimatedButton';
import AnimatedButton2 from '../UI/Button/AnimatedButton2';

const ProductCard1 = ({ data }) => {
    // Define breakpoints
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(max-width:960px)');
    const navigator = useNavigate();

    return (
        <React.Fragment>
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // alignItems: 'center',
                }}
                onClick={() => {
                    console.log(data)
                    navigator(data.page_link || "/properties/single-property", {
                        state: { propertyData: data }
                    })
                }}
            >
                {/* Responsive Image */}
                <img
                    src={data.image_files[0]}
                    alt="product"
                    style={{
                        width: isSmallScreen ? '80px' : isMediumScreen ? '120px' : '150px',
                        height: 'auto', // Maintain aspect ratio
                    }}
                />

                {/* Responsive Typography */}
                <Typography
                    sx={{
                        fontSize: isSmallScreen ? '.8rem' : isMediumScreen ? '.1rem' : '1.2rem',
                        marginTop: '8px',
                        fontWeight: 'bold',
                        fontFamily: "Roboto"
                    }}
                >
                    {data.description}
                </Typography>
                <Typography
                    sx={{
                        fontSize: isSmallScreen ? '.5rem' : isMediumScreen ? '.75rem' : '1rem',
                        marginTop: '8px',
                    }}
                >
                    {data.Area} sf built up area
                </Typography>

                <Typography
                    sx={{
                        fontSize: isSmallScreen ? '0.4rem' : isMediumScreen ? '.6rem' : '.8rem',
                    }}
                >
                    {data.Location}
                </Typography>

                <Typography
                    sx={{
                        fontSize: isSmallScreen ? '.8rem' : isMediumScreen ? '.1rem' : '1.2rem',
                        marginTop: '8px'

                    }}
                >
                    ₹{data.Rent}
                </Typography>

                <AnimatedButton2 title="Contact" color="green" />
            </CardContent>
        </React.Fragment>
    );
};

export default ProductCard1;
