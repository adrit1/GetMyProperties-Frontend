import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import AnimatedInput from '../Input/AnimatedInput';
import { RiMessage2Fill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import AnimatedButton from '../Button/AnimatedButton';
import useUserApiCalls from '../../../Api/useUserApiCalls';

const ContactModal = ({ isContactModalOpen, setIsContactModalOpen, contactData, agentId }) => {
    const { addContact, updateContact } = useUserApiCalls();
    const [apiCallStatus, setApiCallStatus] = useState('');
    const [loading, setLoading] = useState(false);
    // console.log(contactData)

    const [message, setMessage] = useState('');


    const userId = useSelector(state => state.profile.userId);

    useEffect(() => {
        if (contactData) {
            setMessage(contactData.message || '');
        }
    }, [contactData]);

    const handleRequestContact = async () => {
        const postData = { user_id: userId, message, agent_id: agentId };
        addContact(postData, setLoading, setApiCallStatus)

    };
    const handleUpdateContact = async () => {
        const postData = { message: message };
        updateContact(contactData, postData, setLoading, setApiCallStatus)

    };

    if (loading) return <p>Loading...</p>;
    return (
        <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
            <h2>{contactData ? 'Update' : 'Post'} Contact</h2>

            <AnimatedInput type='text' placeholder='Write a message' value={message} onChange={(e) => setMessage(e.target.value)} icon={<RiMessage2Fill />} />
            {contactData ? <AnimatedButton title="Update" onClick={handleUpdateContact} color='orange' /> : <AnimatedButton title="Submit" onClick={handleRequestContact} color='green' />}
            {(apiCallStatus) && <p>Status: {apiCallStatus}</p>}
        </Modal>
    );
}

export default (ContactModal);
