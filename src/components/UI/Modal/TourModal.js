import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import AnimatedInput from '../Input/AnimatedInput';
import { BsFillCalendarDateFill } from "react-icons/bs";
import { RiMessage2Fill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import AnimatedButton from '../Button/AnimatedButton';
import useUserApiCalls from '../../../Api/useUserApiCalls';

const TourModal = ({ isTourModalOpen, setIsTourModalOpen, tourData, propertyId }) => {
    const { addTour, updateTour } = useUserApiCalls();

    const [apiCallStatus, setApiCallStatus] = useState('');
    const [loading, setLoading] = useState(false);
    console.log(tourData)
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');


    const userId = useSelector(state => state.profile.userId);

    useEffect(() => {
        if (tourData) {
            setTime(tourData.time || '');
            setMessage(tourData.message || '');
        }
    }, [tourData]);

    const handleRequestTour = async () => {
        const postData = { user_id: userId, time, message, property_id: propertyId };
        addTour(postData, setLoading, setApiCallStatus)


    };
    const handleUpdateTour = async () => {
        const postData = { time, message };
        updateTour(tourData, postData, setLoading, setApiCallStatus)


    };
    if (loading) return <p>Loading...</p>;
    return (
        <Modal isOpen={isTourModalOpen} onClose={() => setIsTourModalOpen(false)}>
            <h2>{tourData ? 'Update' : 'Post'} Tour</h2>

            <AnimatedInput type='date' placeholder='Choose preferred date' value={time} onChange={(e) => setTime(e.target.value)} icon={<BsFillCalendarDateFill />} />

            <AnimatedInput type='text' placeholder='Write a message' value={message} onChange={(e) => setMessage(e.target.value)} icon={<RiMessage2Fill />} />

            {tourData ? <AnimatedButton title="Update" onClick={handleUpdateTour} color='orange' /> : <AnimatedButton title="Submit" onClick={handleRequestTour} color='green' />}
            {(apiCallStatus) && <p>Status: {apiCallStatus}</p>}
        </Modal>
    );
}

export default (TourModal);
