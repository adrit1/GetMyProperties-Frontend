import React, { useEffect, useState } from 'react';
import AnimatedInput from '../../components/UI/Input/AnimatedInput';
import styles from './AddProperty.module.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AnimatedButton from '../../components/UI/Button/AnimatedButton';
import ImageUpload from './ImageUpload';
import apiRequest from "../../hook/useApi";


import { useError } from '../../ErrorContext';
const AddProperty = ({ onSubmit }) => {
    const { handleError } = useError();
    const userId = useSelector(state => state.profile.userId);
    const location = useLocation();
    const u_prop_id = location.state?.u_prop_id;
    const [images, setImages] = useState([]);
    const [apiCallStatus, setApiCallStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [propertyData, setPropertyData] = useState({
        description: 'a',
        Zone: 'a',
        Location: 'a',
        PIN: '1',
        State: 'a',
        Type: 'Residential',
        Area: '1',
        Rent: '1',
        BedRoom: '1',
        BathRoom: '1',
        Securitydeposit: '1',
        Brokerage: '1',
        FLOOR: '1',
        Furnishing: 'Unfurnished',
        Flooring: '1',
        CarParking: false,
        BikeParking: false,
        CycleParking: false,
        Facing: '1',
        FlatView: '1',
        Age: '1',
        Nature: '1',
        Lift: false,
        WaterAvailability: 'a',
        PetFriendly: 'a',
        Laundry: 'a',
        WashingMachine: 'a',
        Fridge: false,
        TV: false,
        AC: false,
        Balcony: false,
        Gym: false,
        SwimmingPool: false,
        Security: false,
        coordinates: '12,12',
    });
    useEffect(() => {
        if (location.state && location.state.propertyData) {
            setPropertyData(location.state.propertyData);
            console.log(location.state.propertyData);
        }
    }, [location.state]);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setPropertyData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            ...propertyData,
            user_id: userId,
            u_prop_id: u_prop_id,
            coordinates: propertyData.coordinates.split(',').map(Number),
            image_files: images
        };
        console.log(updatedData);

        try {
            await apiRequest({
                requestType: 'post',
                url: `${process.env.REACT_APP_URI}properties/add`,
                setLoading: setLoading,
                data: updatedData,
                setError: setError,
                onSuccess: (data) => {
                    setApiCallStatus("Properties Added successfully");
                    console.log(data)
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error getting properties.');
        }

    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedData = {
            ...propertyData,
            user_id: userId,
            u_prop_id: u_prop_id,
            coordinates: propertyData.coordinates.split(',').map(Number),
        };
        console.log(updatedData);


        try {
            await apiRequest({
                requestType: 'put',
                url: `${process.env.REACT_APP_URI}properties/update/${location.state.propertyData._id}`,
                setLoading: setLoading,
                data: updatedData,
                setError: setError,
                onSuccess: (data) => {
                    setApiCallStatus("Properties updated successfully");
                    console.log(data)
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error getting properties.');
        }
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div className={styles.form}>
            <h2>Property Details</h2>
            <ImageUpload images={images} setImages={setImages} />
            <div>
                <AnimatedInput
                    type="text"
                    placeholder="Description"
                    value={propertyData.description}
                    onChange={handleChange}
                    name="description"
                />

                <AnimatedInput
                    type="text"
                    placeholder="Zone"
                    value={propertyData.Zone}
                    onChange={handleChange}
                    name="Zone"
                />

                <AnimatedInput
                    type="text"
                    placeholder="Location"
                    value={propertyData.Location}
                    onChange={handleChange}
                    name="Location"
                />
                <AnimatedInput
                    type="text"
                    placeholder="PIN"
                    value={propertyData.PIN}
                    onChange={handleChange}
                    name="PIN"
                />
                <AnimatedInput
                    type="text"
                    placeholder="State"
                    value={propertyData.State}
                    onChange={handleChange}
                    name="State"
                />
                <AnimatedInput
                    type="select"
                    placeholder="Type"
                    value={propertyData.Type}
                    onChange={handleChange}
                    name="Type"
                    options={[
                        { value: 'Residential', label: 'Residential' },
                        { value: 'Commercial', label: 'Commercial' },
                    ]}
                />
                <AnimatedInput
                    type="number"
                    placeholder="Area (in sq ft)"
                    value={propertyData.Area}
                    onChange={handleChange}
                    name="Area"
                />
                <AnimatedInput
                    type="number"
                    placeholder="Rent"
                    value={propertyData.Rent}
                    onChange={handleChange}
                    name="Rent"
                />
                <AnimatedInput
                    type="number"
                    placeholder="Bedrooms"
                    value={propertyData.BedRoom}
                    onChange={handleChange}
                    name="BedRoom"
                />
                <AnimatedInput
                    type="number"
                    placeholder="Bathrooms"
                    value={propertyData.BathRoom}
                    onChange={handleChange}
                    name="BathRoom"
                />
                <AnimatedInput
                    type="number"
                    placeholder="Security Deposit"
                    value={propertyData.Securitydeposit}
                    onChange={handleChange}
                    name="Securitydeposit"
                />
                <AnimatedInput
                    type="number"
                    placeholder="Brokerage"
                    value={propertyData.Brokerage}
                    onChange={handleChange}
                    name="Brokerage"
                />
                <AnimatedInput
                    type="number"
                    placeholder="Floor"
                    value={propertyData.FLOOR}
                    onChange={handleChange}
                    name="FLOOR"
                />
                <AnimatedInput
                    type="select"
                    placeholder="Furnishing"
                    value={propertyData.Furnishing}
                    onChange={handleChange}
                    name="Furnishing"
                    options={[
                        { value: 'Fully-Furnished', label: 'Fully-Furnished' },
                        { value: 'Semi-Furnished', label: 'Semi-Furnished' },
                        { value: 'Unfurnished', label: 'Unfurnished' },
                    ]}
                />
                <AnimatedInput
                    type="text"
                    placeholder="Flooring"
                    value={propertyData.Flooring}
                    onChange={handleChange}
                    name="Flooring"
                />
                <AnimatedInput
                    type="text"
                    placeholder="Facing"
                    value={propertyData.Facing}
                    onChange={handleChange}
                    name="Facing"
                />
                <AnimatedInput
                    type="text"
                    placeholder="Flat View"
                    value={propertyData.FlatView}
                    onChange={handleChange}
                    name="FlatView"
                />
                <AnimatedInput
                    type="number"
                    placeholder="Age of Property (in years)"
                    value={propertyData.Age}
                    onChange={handleChange}
                    name="Age"
                />
                <AnimatedInput
                    type="text"
                    placeholder="Nature of Property"
                    value={propertyData.Nature}
                    onChange={handleChange}
                    name="Nature"
                />
                <AnimatedInput
                    type="text"
                    placeholder="Water Availability"
                    value={propertyData.WaterAvailability}
                    onChange={handleChange}
                    name="WaterAvailability"
                />
                <AnimatedInput
                    type="text"
                    placeholder="Pet Friendly"
                    value={propertyData.PetFriendly}
                    onChange={handleChange}
                    name="PetFriendly"
                />
                <AnimatedInput
                    type="text"
                    placeholder="Laundry"
                    value={propertyData.Laundry}
                    onChange={handleChange}
                    name="Laundry"
                />
                <AnimatedInput
                    type="text"
                    placeholder="Washing Machine"
                    value={propertyData.WashingMachine}
                    onChange={handleChange}
                    name="WashingMachine"
                />
                <AnimatedInput
                    type="checkbox"
                    placeholder="Fridge"
                    checked={propertyData.Fridge}
                    onChange={handleChange}
                    name="Fridge"
                />
                <AnimatedInput
                    type="checkbox"
                    placeholder="TV"
                    checked={propertyData.TV}
                    onChange={handleChange}
                    name="TV"
                />
                <AnimatedInput
                    type="checkbox"
                    placeholder="AC"
                    checked={propertyData.AC}
                    onChange={handleChange}
                    name="AC"
                />
                <AnimatedInput
                    type="checkbox"
                    placeholder="Balcony"
                    checked={propertyData.Balcony}
                    onChange={handleChange}
                    name="Balcony"
                />
                <AnimatedInput
                    type="checkbox"
                    placeholder="Gym"
                    checked={propertyData.Gym}
                    onChange={handleChange}
                    name="Gym"
                />
                <AnimatedInput
                    type="checkbox"
                    placeholder="Swimming Pool"
                    checked={propertyData.SwimmingPool}
                    onChange={handleChange}
                    name="SwimmingPool"
                />
                <AnimatedInput
                    type="checkbox"
                    placeholder="Security"
                    checked={propertyData.Security}
                    onChange={handleChange}
                    name="Security"
                />
                <AnimatedInput
                    type="checkbox"
                    placeholder="Car Parking"
                    checked={propertyData.CarParking}
                    onChange={handleChange}
                    name="CarParking"
                />
                <AnimatedInput
                    type="checkbox"
                    placeholder="Bike Parking"
                    checked={propertyData.BikeParking}
                    onChange={handleChange}
                    name="BikeParking"
                />
                <AnimatedInput
                    type="checkbox"
                    placeholder="Cycle Parking"
                    checked={propertyData.CycleParking}
                    onChange={handleChange}
                    name="CycleParking"
                />
                <AnimatedInput
                    type="checkbox"
                    placeholder="Lift"
                    checked={propertyData.Lift}
                    onChange={handleChange}
                    name="Lift"
                />
                <AnimatedInput
                    type="text"
                    placeholder="Coordinates (e.g., 12.9716,77.5946)"
                    value={propertyData.coordinates}
                    onChange={handleChange}
                    name="coordinates"
                />
            </div>

            {(location.state?.propertyData) ? <AnimatedButton title="Update" onClick={handleUpdate} color="blue" /> : <AnimatedButton title="Add" color="blue" onClick={handleSubmit} />}

            {(apiCallStatus) && <p>Status: {apiCallStatus}</p>}
        </div>
    );
};

export default (AddProperty);
