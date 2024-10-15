import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpandStructure from "../../components/UI/Expand/ExpandStructure";
import AnimatedButton from "../../components/UI/Button/AnimatedButton";
import { useSelector } from "react-redux";
import ContactModal from "../../components/UI/Modal/ContactModal";
import { useError } from "../../ErrorContext";
import useUserApiCalls from "../../Api/useUserApiCalls";
import Loading from "../../components/UI/Loading/Loading";
const ContactRequests = () => {
    const user = useSelector(state => state.user);
    console.log(user);


    const { fetchContact, deleteContact } = useUserApiCalls();
    const ContactRequests = useSelector(state => state.user.contactRequests)
    console.log(ContactRequests);
    const ContactApplies = useSelector(state => state.user.contactApplies)
    const [contacts, setContacts] = useState([]);
    const [apiCallStatus, setApiCallStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const [hasFetchedContact, setHasFetchedContact] = useState(false);
    // const [applyContacts, setApplyContacts] = useState([]);
    // const [hasFetchedApplyContact, setHasFetchedApplyContact] = useState(false);
    const userId = useSelector(state => state.profile.userId);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const [data, setData] = useState({ message: '', _id: '' })
    const fetchContactRequests = async (isApply) => {
        if (!hasFetchedContact) {
            setLoading(true)
            fetchContact(false, ContactRequests, ContactApplies, () => { }, () => { }, setHasFetchedContact, setContacts)
            setLoading(false)
        }
    };
    const handleUpdate = async (contact) => {
        console.log(contact.message + " " + contact.time)
        setIsContactModalOpen(true);
        setData({ message: contact.message, _id: contact._id })
        console.log(data);
    }

    const handleDelete = async (contactId, agentId) => {

        await deleteContact(userId, agentId, contactId, setLoading, setApiCallStatus, setContacts, contacts)
    };


    useEffect(() => {
        fetchContact(false, ContactRequests, ContactApplies, () => { }, () => { }, setHasFetchedContact, setContacts)
    }, [hasFetchedContact])


    return (
        <ExpandStructure title="Contact Requests" onExpand={() => fetchContactRequests(false)}>
            {loading && <Loading loading={loading} />}
            {!loading && contacts.length > 0 && contacts.map((contact, idx) => <div key={idx}>
                <p>{contact.message}</p>
                <p>{contact.time}</p>
                <p>{contact.property_id}</p>
                <AnimatedButton title='Update' color='green' onClick={() => handleUpdate(contact)} />
                <AnimatedButton title='Delete' color='red' onClick={() => handleDelete(contact._id, contact.agent_id)} />
            </div>)}

            {isContactModalOpen &&
                <ContactModal isContactModalOpen={isContactModalOpen} setIsContactModalOpen={setIsContactModalOpen} contactData={data} />}
            {(apiCallStatus) && <p>Status: {apiCallStatus}</p>}

        </ExpandStructure>

    );

}
export default ContactRequests;
