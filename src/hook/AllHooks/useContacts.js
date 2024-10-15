// src/hooks/useContacts.js
import { useDispatch } from "react-redux";
import { addContactRequest, removeContactRequest } from "../../store/userAction";
import { useError } from "../../ErrorContext";
import { useSuccess } from "../../SuccessContext";
import apiRequest from "../useApi";
import axios from "axios";

const useContacts = () => {
    const { handleError } = useError();
    const { handleSuccess } = useSuccess();
    const dispatch = useDispatch();

    const fetchContact = async (isApply, ContactRequests, ContactApplies, setHasFetchedApplyContact, setApplyContacts, setHasFetchedContact, setContacts) => {
        try {
            let reqArray = isApply ? ContactApplies : ContactRequests;

            console.log(`Contacts ${reqArray}`);
            const contactRequests = await Promise.all(
                reqArray.map((contactId) =>
                    axios.get(`${process.env.REACT_APP_URI}contacts/${contactId}`)
                )
            );

            if (isApply) {
                setApplyContacts(contactRequests.map((res) => res.data));
                setHasFetchedApplyContact(true);
            } else {
                setContacts(contactRequests.map((res) => res.data));
                setHasFetchedContact(true);
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
            handleError(error);
        }
    };

    const addContact = async (postData, setLoading, setApiCallStatus) => {
        try {
            await apiRequest({
                requestType: 'post',
                url: `${process.env.REACT_APP_URI}contacts/create`,
                data: postData,
                setLoading,
                onSuccess: (response) => {
                    setApiCallStatus('Contact created successfully');
                    handleSuccess('Contact added successfully', 201);
                    console.log(response);
                    dispatch(addContactRequest(response.savedContact._id));
                    console.log(`Add contacts ${response.savedContact._id}`);
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error in contact creation');
            handleError(error);
        }
    };

    const updateContact = async (contactData, postData, setLoading, setApiCallStatus) => {
        try {
            await apiRequest({
                requestType: 'put',
                url: `${process.env.REACT_APP_URI}contacts/update/${contactData._id}`,
                data: postData,
                setLoading,
                onSuccess: (response) => {
                    setApiCallStatus('Contact updated successfully');
                    handleSuccess('Contact updated successfully', 200);
                    console.log(response);
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error updating contact');
            handleError(error);
        }
    };

    const deleteContact = async (userId, agentId, contactId, setLoading, setApiCallStatus, setContacts, contacts) => {
        try {
            await apiRequest({
                requestType: 'delete',
                url: `${process.env.REACT_APP_URI}contacts/delete/${userId}/${agentId}/${contactId}`,
                setLoading,
                onSuccess: (response) => {
                    setApiCallStatus('Contact deleted successfully');
                    handleSuccess('Contact deleted successfully', 200);
                    console.log(response);
                    setContacts(contacts.filter(contact => contact._id !== contactId));
                    console.log(contactId);
                    dispatch(removeContactRequest(response.id));
                    console.log(contacts);
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus("Error deleting contact");
            handleError(error);
        }
    };

    return {
        fetchContact,
        addContact,
        updateContact,
        deleteContact
    };
};

export default useContacts;
