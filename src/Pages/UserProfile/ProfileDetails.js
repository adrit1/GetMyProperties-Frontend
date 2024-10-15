import React, { useState } from "react";
import LabeledData from "../../components/UI/Input/LabeledData";
import Modal from "../../components/UI/Modal/Modal";
import EditProfile from "./EditProfile";
import AnimatedButton from "../../components/UI/Button/AnimatedButton";
import styles from "./UserProfile.module.css";
import { useSelector } from "react-redux";

import useUserApiCalls from "../../Api/useUserApiCalls";
import Loading from "../../components/UI/Loading/Loading";
const ProfileDetails = () => {
    const profileImage = useSelector(state => state.user.profileImage);
    const profileData = useSelector(state => state.user.profileData);
    // console.log(profileImage)
    // console.log(profileData)
    const { profileImageUpload, profileImageUpdate } = useUserApiCalls();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [apiCallStatus, setApiCallStatus] = useState('');
    const [loading, setLoading] = useState(false);


    const userId = useSelector((state) => state.user.userId);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Function to handle file selection
    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Function to handle file upload
    const onClickImgUpload = async () => {
        if (!selectedFile) {
            setApiCallStatus('Please select a file to upload.');
            return;
        }

        const data = new FormData();
        data.append('image', selectedFile);
        await profileImageUpload(setLoading, setApiCallStatus, data, userId);

    };
    const onclickImgEdit = async () => {
        if (!selectedFile) {
            setApiCallStatus('Please select a file to upload.');
            return;
        }

        const data = new FormData();
        data.append('image', selectedFile);

        await profileImageUpdate(setLoading, setApiCallStatus, data, userId);


    }


    // if (loading) return <p>Loading....</p>

    return (
        <div className={styles.topContainer}>
            <div className={styles.left}>
                {loading ? <Loading loading={loading} /> : <>
                    <img
                        src={profileImage}
                        alt="User Profile"
                        className={styles.img}
                    />
                    <input type="file" accept="image/*" onChange={onFileChange} />
                    <button onClick={onclickImgEdit}>Edit</button>
                    <button onClick={onClickImgUpload}>Upload</button>
                    <p>{apiCallStatus}</p>
                </>}

            </div>
            <div className={styles.right}>
                <h3 className={styles.rightHeading}>User Details</h3>
                <LabeledData label="Name" data={profileData.user_name} />
                <LabeledData label="Mobile Number" data={profileData.mobile_number} />
                <LabeledData label="Email Id" data={profileData.email_id} />
                <LabeledData label="Gender" data={profileData.gender} />
                <button onClick={handleOpenModal}>Edit</button>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <EditProfile data={profileData} onClose={handleCloseModal} />
                </Modal>

            </div>

        </div>
    );
};

export default ProfileDetails;
