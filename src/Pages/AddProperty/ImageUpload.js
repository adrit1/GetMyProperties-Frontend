import React, { useState } from 'react';

import AnimatedButton from '../../components/UI/Button/AnimatedButton';
import apiRequest from "../../hook/useApi";

import { useError } from '../../ErrorContext';

const ImageUpload = ({ images, setImages }) => {
    const { handleError } = useError();
    const [apiCallStatus, setApiCallStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [imagePreviews, setImagePreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages(files);

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleImageUpload = async () => {
        if (images.length === 0) {
            alert('Please select some images to upload.');
            return;
        }

        const formData = new FormData();
        images.forEach((image) => {
            formData.append('images', image);
        });


        try {
            await apiRequest({
                requestType: 'post',
                url: `${process.env.REACT_APP_URI}/properties/imageUpload`,
                setLoading: setLoading,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                setError: setError,
                onSuccess: (data) => {
                    setApiCallStatus("Images uploaded successfully");
                    console.log('Uploaded image URLs:', data.imageUrls);
                    setImages(data.imageUrls);

                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error uploading images.');
        }
    };
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
            />
            <div>
                {imagePreviews.map((preview, idx) => (
                    <img key={idx} src={preview} alt="Preview" style={{ width: '100px', margin: '10px' }} />
                ))}
            </div>
            <AnimatedButton
                title={loading ? 'Uploading...' : 'Upload Images'}
                color="blue"
                onClick={handleImageUpload}
                disabled={loading || images.length === 0}
            />
            {(apiCallStatus) && <p>Status: {apiCallStatus}</p>}
        </div>
    );
};

export default (ImageUpload);
