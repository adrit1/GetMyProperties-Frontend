import React, { useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import AnimatedButton from "../../components/UI/Button/AnimatedButton";
import styles from "./UserProfile.module.css";
import apiRequest from "../../hook/useApi";
import { useError } from "../../ErrorContext";

const DeleteProfileModal = ({ userId }) => {
    const { handleError } = useError();
    const [apiCallStatus, setApiCallStatus] = useState('');
    const [loading, setLoading] = useState(false);


    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async () => {

        try {
            await apiRequest({
                requestType: 'delete',
                url: `${process.env.REACT_APP_URI}user/deleteUser/${userId}`,
                setLoading: setLoading,

                onSuccess: (data) => {
                    setApiCallStatus("Profile deleted successfully!");
                    console.log(data)
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus("Error deleting profile");
        }

    };


    if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;


    return (
        <>
            <AnimatedButton title="Delete Profile" onClick={() => { setIsModalOpen(true); }} color="red" />
            <AnimatedButton title="Log out" onClick={() => { setIsModalOpen(true); }} color="red" />
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className={styles.deleteProfileModal}>
                    <h2>Are you sure you want to delete your profile?</h2>
                    <div className={styles.deleteProfileActions}>
                        <AnimatedButton title="Yes Delete" onClick={handleDelete} color="red" />
                        <AnimatedButton title="cancel" onClick={() => setIsModalOpen(false)} color="blue" />
                    </div>
                </div>
                {(apiCallStatus) && <p>Status: {apiCallStatus}</p>}
            </Modal>

        </>
    );
};

export default (DeleteProfileModal);
