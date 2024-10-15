import React from 'react';
import styles from './PropertyCard.module.css';

const PropertyCard = ({ data }) => {
    const {
        AC, Age, Area, Balcony, BathRoom, BedRoom, BikeParking, Brokerage, CarParking, CycleParking, FLOOR, Facing,
        FlatView, Flooring, Fridge, Furnishing, Gym, Laundry, Lift, Location, Nature, PIN, PetFriendly, Rent,
        Security, Securitydeposit, State, SwimmingPool, TV, Type, UpdateDate, WashingMachine, WaterAvailability,
        Zone, description, image_files
    } = data;

    return (
        <div className={styles.card}>
            <div className={styles.imageSection}>
                <img src={image_files[0]} alt="Property" className={styles.image} />
            </div>
            <div className={styles.detailsSection}>
                <h3>{Type} in {Location}</h3>
                <p>{description}</p>
                <div className={styles.propertyDetails}>
                    <p><strong>Rent:</strong> ₹{Rent}</p>
                    <p><strong>Bedrooms:</strong> {BedRoom}</p>
                    <p><strong>Bathrooms:</strong> {BathRoom}</p>
                    <p><strong>Area:</strong> {Area} sq.ft</p>
                    <p><strong>Floor:</strong> {FLOOR}</p>
                    <p><strong>Facing:</strong> {Facing}</p>
                    <p><strong>Furnishing:</strong> {Furnishing}</p>
                    <p><strong>Balcony:</strong> {Balcony ? "Yes" : "No"}</p>
                    <p><strong>Parking:</strong> Car - {CarParking ? "Yes" : "No"}, Bike - {BikeParking ? "Yes" : "No"}</p>
                    <p><strong>Pet Friendly:</strong> {PetFriendly}</p>
                    <p><strong>Swimming Pool:</strong> {SwimmingPool ? "Yes" : "No"}</p>
                    <p><strong>Security Deposit:</strong> ₹{Securitydeposit}</p>
                    <p><strong>Brokerage:</strong> ₹{Brokerage}</p>
                    <p><strong>Flooring:</strong> {Flooring}</p>
                    <p><strong>Gym:</strong> {Gym ? "Yes" : "No"}</p>
                    <p><strong>Updated on:</strong> {new Date(UpdateDate).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
