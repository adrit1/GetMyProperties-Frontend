import React, { useState } from 'react';
import { Grid, Typography, Chip, Box } from '@mui/material';
import { FaBath, FaBed, FaCar, FaSwimmer, FaShieldAlt } from 'react-icons/fa';
import styles from './PropertyDetails.module.css';
import { useLocation } from 'react-router-dom'
import AnimatedButton from '../../components/UI/Button/AnimatedButton';
import TourModal from '../../components/UI/Modal/TourModal';
import ContactModal from '../../components/UI/Modal/ContactModal';
import Slider from '../../components/Slider/Slider';


// SwiperCore.use([Navigation, Pagination]);

const SingleProperties = () => {
    const [isTourModalOpen, setIsTourModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);


    const location1 = useLocation();
    const data = location1.state?.propertyData;
    const {
        image_files,
        description,
        BedRoom,
        BathRoom,
        Area,
        Rent,
        Furnishing,
        Facing,
        Balcony,
        CarParking,
        SwimmingPool,
        Gym,
        AC,
        Security,
        PetFriendly,
        location,
        PIN,
        State,
        WaterAvailability,
    } = data;

    console.log(data)

    return (
        <Box className={styles.container}>
            {/* <Typography variant="h4" className={styles.title}>
                Property Details
            </Typography> */}
            {/* Image Slider */}
            <Slider image_files={image_files} />

            {/* Property Overview */}
            <div className={styles.details}>
                <Box className={styles.propertyOverview}>
                    <Typography variant="h4" className={styles.title}>
                        {description}
                    </Typography>
                    <Typography variant="h5" color="primary">
                        ₹{Rent}/month
                    </Typography>
                    <Typography className={styles.location}>
                        PIN: {PIN}, {State}
                    </Typography>

                </Box>

                {/* Property Details Section */}
                <Grid container spacing={2} className={styles.detailsGrid}>
                    <Grid item xs={6} sm={4}>
                        <Typography className={styles.detail}>
                            <FaBed /> {BedRoom} Bedrooms
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography className={styles.detail}>
                            <FaBath /> {BathRoom} Bathrooms
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography className={styles.detail}>
                            <FaCar /> {CarParking ? 'Car Parking Available' : 'No Car Parking'}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography className={styles.detail}>
                            <FaSwimmer /> {SwimmingPool ? 'Swimming Pool' : 'No Swimming Pool'}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography className={styles.detail}>
                            <FaShieldAlt /> {Security ? 'Security Available' : 'No Security'}
                        </Typography>
                    </Grid>
                </Grid>

                {/* Amenities Section */}
                <Box className={styles.amenities}>
                    <Typography variant="h5" className={styles.sectionTitle}>
                        Amenities
                    </Typography>
                    <Chip label={`Furnishing: ${Furnishing}`} color="primary" />
                    <Chip label={`Facing: ${Facing}`} color="secondary" />
                    <Chip label={`Balcony: ${Balcony ? 'Yes' : 'No'}`} />
                    <Chip label={`AC: ${AC ? 'Available' : 'Not Available'}`} />
                    <Chip label={`Pet Friendly: ${PetFriendly}`} />
                    <Chip label={`Water Availability: ${WaterAvailability}`} />
                </Box>
                <div style={{ display: "flex", marginTop: "2rem" }}>
                    <AnimatedButton title="Tour Request" color="orange" onClick={() => setIsTourModalOpen(true)} />
                    <AnimatedButton title="Contact Request" color="orange" onClick={() => setIsContactModalOpen(true)} />
                </div>
            </div>
            {isTourModalOpen && <TourModal isTourModalOpen={isTourModalOpen} setIsTourModalOpen={setIsTourModalOpen} propertyId={data._id} />}

            {isContactModalOpen && <ContactModal isContactModalOpen={isContactModalOpen} setIsContactModalOpen={setIsContactModalOpen} agentId={data.user_id} />}
        </Box>
    );
};

export default SingleProperties;
