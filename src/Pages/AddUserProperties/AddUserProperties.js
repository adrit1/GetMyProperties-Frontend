import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';
import styles from "./AddUserProperties.module.css";
import AnimatedButton from '../../components/UI/Button/AnimatedButton';

import AnimatedInput from '../../components/UI/Input/AnimatedInput';
import useUserApiCalls from '../../Api/useUserApiCalls';

import { useError } from '../../ErrorContext';
const AddUserProperty = () => {
    const { addPostedProperties, updatePostedProperties } = useUserApiCalls();

    const location = useLocation(); // Get the location object
    const propertyData = location.state?.propertyData; // Access the passed property data
    let buttonText = "Add";

    if (propertyData) {
        buttonText = "Update"
    }



    const [apiCallStatus, setApiCallStatus] = useState('');
    const [loading, setLoading] = useState(false);






    const userId = useSelector((state) => state.profile.userId);

    const [propertyType, setPropertyType] = useState(propertyData ? propertyData.property_type : '');
    const [address, setAddress] = useState(propertyData ? propertyData.address : '');
    const [images, setImages] = useState(propertyData ? propertyData.images : []);


    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('property_type', propertyType);
        formData.append('address', address);

        console.log('Submitting data:', {
            user_id: userId,
            property_type: propertyType,
            address: address,
        });


        if (propertyData) {
            updatePostedProperties(setLoading, setApiCallStatus, formData, propertyData._id)

        } else {
            // Append images for a new property
            images.forEach((image) => {
                formData.append('images', image);
            });
            addPostedProperties(setLoading, setApiCallStatus, formData);

        }

        if (apiCallStatus === "Properties posted successfully" || apiCallStatus === "Properties updated successfully") {
            setAddress('');
            setImages([]);
            setPropertyType('')
        }
    };
    if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
            <h2>Add New Property</h2>
            <form onSubmit={handleSubmit}>

                <AnimatedInput type="select" placeholder="Enter property type" name="property_type" onChange={(e) => {
                    setPropertyType(e.target.value);
                }} value={propertyType} options={[
                    { label: "Residential", value: "Residential" },
                    { label: "Commercial", value: "Commercial" }
                ]} />

                <AnimatedInput type="text" placeholder="Enter property address" name="property_address" onChange={(e) => {
                    setAddress(e.target.value);
                }} value={address} />
                <div>
                    <label>Images (up to 5):</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>

                {propertyData?.images && <div>{images.map((imgUrl, idx) => <img className={styles.img} key={idx} src={imgUrl} alt='Property' />)}</div>}

            </form>

            {(apiCallStatus) && <p>Status: {apiCallStatus}</p>}
            <AnimatedButton title={buttonText} color="green" onClick={handleSubmit} />

        </div>

    );
};

export default AddUserProperty;
