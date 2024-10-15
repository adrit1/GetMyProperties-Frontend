import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../store/profileActions";
import { setUser, setProfileImage, addPostedProperty, removePostedProperty, addTourRequest, removeTourRequest, addContactRequest, removeContactRequest, setTourApplies, setContactApplies, logoutUser } from "../store/userAction"
import { useError } from "../ErrorContext";
import apiRequest from "../hook/useApi";
import { useSuccess } from "../SuccessContext"
import axios from "axios";



const useUserApiCalls = () => {

    const { handleError } = useError();
    const { handleSuccess } = useSuccess();
    const dispatch = useDispatch();
    const contacts1 = useSelector(state => state.user.contactRequests)
    const sendOTP = async (data, setLoading, setApiCallStatus, setShowOTP, setShowSubmitBtn) => {
        await apiRequest({
            requestType: 'post',
            url: `${process.env.REACT_APP_URI}otp/request-otp`,
            data: data,
            setLoading: setLoading,
            onSuccess: (data) => {
                setApiCallStatus("OTP sent successfully");
                console.log(data);
                handleSuccess(data.message || 'OTP send successfully', 200);
                setShowOTP(true);
                setShowSubmitBtn(true, true);
            },
            onError: (error) => handleError(error)
        });
    }
    const createUser = async (setLoading, setApiCallStatus, data, setRegisterSuccess) => {
        await apiRequest({
            requestType: 'post',
            url: `${process.env.REACT_APP_URI}user/sign-up`,
            data: data,
            setLoading: setLoading,
            onSuccess: (data) => {
                setApiCallStatus("User created successfully");
                console.log(data);
                handleSuccess(data.message || 'User Profile created successfully', 200);
                const profileData = {
                    user_name: data.data.user_name,
                    email_id: data.data.email_id,
                    gender: data.data.gender,
                    mobile_number: data.data.mobile_number
                }
                const { _id, profile_pic, posted_properties, active_properties, tour_request, contact_request, tour_apply, contact_apply } = data.data;
                // console.log(profile_pic);
                // console.log(posted_properties);
                dispatch(setUser(_id, profile_pic, profileData, posted_properties, active_properties, tour_request, contact_request, tour_apply, contact_apply));

                setRegisterSuccess(true);
            },
            onError: (error) => handleError(error)

        });
    }
    const signInUser = async (setLoading, setApiCallStatus, data, setRegisterSuccess) => {
        await apiRequest({
            requestType: 'post',
            url: `${process.env.REACT_APP_URI}user/sign-in`,
            data: data,
            setLoading: setLoading,
            onSuccess: (data) => {
                setApiCallStatus("User sign in successfully");
                console.log(data);
                handleSuccess(data.message || 'User sign in successfully', 200);
                const profileData = {
                    user_name: data.data.user_name,
                    email_id: data.data.email_id,
                    gender: data.data.gender,
                    mobile_number: data.data.mobile_number
                }
                const { _id, profile_pic, posted_properties, active_properties, tour_request, contact_request, tour_apply, contact_apply } = data.data;
                // console.log(profile_pic);
                // console.log(posted_properties);
                dispatch(setUser(_id, profile_pic, profileData, posted_properties, active_properties, tour_request, contact_request, tour_apply, contact_apply));

                setRegisterSuccess(true);
            },
            onError: (error) => handleError(error)

        });
    }
    // handleSuccess('User Profile updated successfully', 200);
    const updateUser = async (setLoading, setApiCallStatus, data, userId) => {
        try {
            await apiRequest({
                requestType: 'put',
                url: `${process.env.REACT_APP_URI}user/update/${userId}`,
                data: data,
                setLoading: setLoading,

                onSuccess: (data) => {
                    setApiCallStatus('User Profile updated successfully');
                    console.log(data)
                    handleSuccess(data.message || 'User Profile updated successfully', 200);
                    const profileData = {
                        user_name: data.data.user_name,
                        email_id: data.data.email_id,
                        gender: data.data.gender,
                        mobile_number: data.data.mobile_number
                    }
                    const { _id, profile_pic, posted_properties, active_properties, tour_request, contact_request, tour_apply, contact_apply } = data.data;
                    dispatch(setUser(_id, profile_pic, profileData, posted_properties, active_properties, tour_request, contact_request, tour_apply, contact_apply));
                },
                onError: (error) => handleError(error)
            });
        } catch (err) {
            setApiCallStatus(err.message || 'Error updating user profile');
        }
    }

    //those two not working
    const profileImageUpload = async (setLoading, setApiCallStatus, data, userId) => {
        try {
            await apiRequest({
                requestType: 'post',
                url: `${process.env.REACT_APP_URI}user/upload-profile-image/${userId}`,
                data: data,
                setLoading: setLoading,
                onSuccess: (data) => {
                    setApiCallStatus(`File uploaded successfully`);
                    handleSuccess(data.message || 'User Profile image uploaded successfully', 200);
                    console.log(data)
                    dispatch(setProfileImage(data.imageUrl));

                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error uploading file');
            console.log(error);
        }
    }
    const profileImageUpdate = async (setLoading, setApiCallStatus, data, userId) => {
        try {
            await apiRequest({
                requestType: 'put',
                url: `${process.env.REACT_APP_URI}user/update-profile-image/${userId}`,
                data: data,
                setLoading: setLoading,

                onSuccess: (data) => {
                    setApiCallStatus(`File updated successfully`);
                    handleSuccess(data.message || 'User Profile image updated successfully', 200);
                    dispatch(setProfileImage(data.imageUrl));
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error uploading file');
            console.log(error)
        }
    }

    const fetchPostedProperties = async (postedProperties, setUPProperties, setHasFetched, handleError) => {
        try {
            const propertyDetails = await Promise.all(
                postedProperties.map((propertyId) =>
                    axios.get(`${process.env.REACT_APP_URI}userPost/get/${propertyId}`)
                )
            );

            setUPProperties(propertyDetails.map((res) => res.data));
            setHasFetched(true);

        } catch (error) {
            console.error('Error fetching properties:', error);
            handleError(error);
        }
    };
    const addPostedProperties = async (setLoading, setApiCallStatus, data) => {

        try {
            await apiRequest({
                requestType: 'post',
                url: `${process.env.REACT_APP_URI}userPost/add`,
                setLoading: setLoading,
                data: data,
                onSuccess: (data) => {
                    setApiCallStatus("Properties posted successfully");
                    handleSuccess(data.message || 'Add post successfully', 200);
                    console.log(data.savedProperty)
                    dispatch(addPostedProperty(data.savedProperty._id))

                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error posting properties.');
            handleError(error);
        }

    }

    const updatePostedProperties = async (setLoading, setApiCallStatus, data, id) => {

        try {
            await apiRequest({
                requestType: 'put',
                url: `${process.env.REACT_APP_URI}userPost/update/${id}`,
                setLoading: setLoading,
                data: data,
                onSuccess: (data) => {
                    setApiCallStatus("Properties updated successfully");
                    handleSuccess(data.message || 'Update post successfully', 200);
                    console.log(data)

                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error updating properties.');
        }

    }
    const deletePostedProperties = async (setLoading, setApiCallStatus, postId, userId) => {

        try {
            await apiRequest({
                requestType: 'delete',
                url: `${process.env.REACT_APP_URI}userPost/delete/${userId}/${postId}`,
                setLoading: setLoading,
                onSuccess: (data) => {
                    setApiCallStatus('Deleted successfully');
                    console.log(data)
                    handleSuccess(data.message || 'Delete post successfully', 200);
                    dispatch(removePostedProperty(data.id))

                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error deleting property');
        }

    }

    const fetchActiveProperties = async (activeProperties, setProperties, setHasFetched) => {
        try {

            const propertyDetails = await Promise.all(
                activeProperties.map((propertyId) =>
                    axios.get(
                        `${process.env.REACT_APP_URI}properties/${propertyId}`
                    )
                )
            );
            // console.log(propertyDetails);

            setProperties(propertyDetails.map((res) => res.data));
            setHasFetched(true);
        } catch (error) {
            console.error("Error fetching properties:", error);
            handleError(error);
        }
    }


    async function fetchTour(isApply, TourRequest, TourApply, setApplyTours, setHasFetchedApplyTour, setTours, setHasFetchedTour) {
        try {


            let reqArray = TourRequest;
            if (isApply) {
                reqArray = TourApply;
            }

            console.log(TourRequest)
            const tourRequests = await Promise.all(
                reqArray.map((tourId) =>
                    axios.get(
                        `${process.env.REACT_APP_URI}tours/${tourId}`
                    )
                )
            );
            // console.log(tourRequests);
            if (isApply) {
                setApplyTours(tourRequests.map((res) => res.data));
                setHasFetchedApplyTour(true);
            }
            else {
                setTours(tourRequests.map((res) => res.data));
                setHasFetchedTour(true);
            }

        } catch (error) {
            console.error("Error fetching properties:", error);
            handleError(error);
        }
    }
    async function addTour(postData, setLoading, setApiCallStatus) {
        try {
            await apiRequest({
                requestType: 'post',
                url: `${process.env.REACT_APP_URI}tours/create`,
                data: postData,
                setLoading: setLoading,
                onSuccess: (data) => {
                    setApiCallStatus('Tour created successfully');
                    handleSuccess(data.message || 'Add tour successfully', 200);
                    console.log(data)
                    dispatch(addTourRequest(data.savedTour._id))
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error in tour creation');
        }
    }
    async function updateTour(tourData, postData, setLoading, setApiCallStatus) {
        try {
            await apiRequest({
                requestType: 'put',
                url: `${process.env.REACT_APP_URI}tours/update/${tourData._id}`,
                data: postData,
                setLoading: setLoading,
                onSuccess: (data) => {
                    setApiCallStatus('Tour updated successfully');
                    handleSuccess('Update tour successfully', 200);
                    console.log(data)
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error updating tour');
        }
    }
    async function deleteTour(userId, propId, tourId, setLoading, setApiCallStatus) {
        try {
            await apiRequest({
                requestType: 'delete',
                url: `${process.env.REACT_APP_URI}tours/delete/${userId}/${propId}/${tourId}`,
                setLoading: setLoading,
                onSuccess: (data) => {
                    setApiCallStatus('Tour deleted successfully');
                    handleSuccess(data.message || 'Delete tour successfully', 200);
                    // console.log(data)
                    dispatch(removeTourRequest(data.id))

                },
                onError: (error) => handleError(error)
            });
        } catch (err) {
            setApiCallStatus("Error deleting tour:", err);
        }
    }


    async function fetchContact(isApply, ContactRequests, ContactApplies, setHasFetchedApplyContact, setApplyContacts, setHasFetchedContact, setContacts) {
        try {
            let reqArray = ContactRequests;
            if (isApply) {
                reqArray = ContactApplies;
            }
            console.log(`Contacts ${contacts1}`)
            console.log(reqArray);

            const contactRequests = await Promise.all(
                reqArray.map((contactId) =>
                    axios.get(
                        `${process.env.REACT_APP_URI}contacts/${contactId}`
                    )
                )
            );
            // console.log(contactRequests);
            if (isApply) {
                setApplyContacts(contactRequests.map((res) => res.data));
                setHasFetchedApplyContact(true);
            }
            else {
                setContacts(contactRequests.map((res) => res.data));

                setHasFetchedContact(true);
            }

        } catch (error) {
            console.error("Error fetching properties:", error);
            handleError(error);
        }
    }
    async function addContact(postData, setLoading, setApiCallStatus) {
        try {
            await apiRequest({
                requestType: 'post',
                url: `${process.env.REACT_APP_URI}contacts/create`,
                data: postData,
                setLoading: setLoading,
                onSuccess: (data) => {
                    setApiCallStatus('Contact created successfully');
                    handleSuccess('Add Contact successfully', 201);
                    console.log(data)
                    dispatch(addContactRequest(data.savedContact._id))
                    console.log(`Add contacts ${contacts1}`)
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error in Contact creation');
        }
    }
    async function updateContact(contactData, postData, setLoading, setApiCallStatus) {
        try {
            await apiRequest({
                requestType: 'put',
                url: `${process.env.REACT_APP_URI}contacts/update/${contactData._id}`,
                data: postData,
                setLoading: setLoading,
                onSuccess: (data) => {
                    setApiCallStatus('Contact created successfully');
                    handleSuccess('Update Contact successfully', 200);
                    console.log(data)
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error in Contact creation');
        }
    }
    async function deleteContact(userId, agentId, contactId, setLoading, setApiCallStatus, setContacts, contacts) {
        try {
            await apiRequest({
                requestType: 'delete',
                url: `${process.env.REACT_APP_URI}contacts/delete/${userId}/${agentId}/${contactId}`,
                setLoading: setLoading,
                onSuccess: (data) => {
                    setApiCallStatus('Contact deleted successfully');
                    handleSuccess('Delete Contact successfully', 200);
                    console.log(data)
                    setContacts(contacts.filter(contact => contact._id !== contactId))
                    console.log(contactId)
                    dispatch(removeContactRequest(data.id))
                    console.log(contacts)
                    console.log(contacts1)

                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus("Error deleting contact:");
        }
    }

    async function fetchProperties(page, setLoading, setApiCallStatus, setProperties, setHasMore) {
        try {
            await apiRequest({
                requestType: 'get',
                url: `${process.env.REACT_APP_URI}properties?page=${page}&limit=1`, // Adjust limit as needed
                setLoading: setLoading,
                onSuccess: (data) => {
                    setApiCallStatus("Properties fetched successfully");
                    setProperties((prevProperties) => [...prevProperties, ...data.properties]);
                    setHasMore(data.properties.length > 0);
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error getting properties.');
        }
    }







    return {
        sendOTP,
        createUser,
        signInUser,

        profileImageUpload,
        profileImageUpdate,
        updateUser,

        fetchPostedProperties,
        addPostedProperties,
        updatePostedProperties,
        deletePostedProperties,

        fetchActiveProperties,

        fetchTour,
        addTour,
        updateTour,
        deleteTour,

        fetchContact,
        addContact,
        updateContact,
        deleteContact,

        fetchProperties
    }
}

export default useUserApiCalls;
