import React, { useState } from "react";

import styles from "./UserProfile.module.css";
import apiRequest from "../../hook/useApi";
import { useError } from "../../ErrorContext";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/profileActions";

const ImageUpload = ({ userId }) => {
    const { handleError } = useError();
    const [apiCallStatus, setApiCallStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (!image) return;
        const formData = new FormData();
        formData.append("image", image);

        try {
            await apiRequest({
                requestType: 'post',
                url: `${process.env.REACT_APP_URI}user/uploadImage/${userId}`,
                data: formData,
                setLoading: setLoading,
                onSuccess: (data) => {
                    setApiCallStatus("Image uploaded successfully!");
                    console.log(data)
                    dispatch(setUser(data.data._id, data.data));

                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus("Error uploading image:", error);
        }

    };

    // if (error) return <p>Error: {error.message}</p>;
    return (
        <div className={styles.imageUploadContainer}>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleImageUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload Image"}
            </button>


        </div>
    );
};

export default ImageUpload;
