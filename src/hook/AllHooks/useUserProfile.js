// src/hooks/useUserProfile.js
import { useDispatch } from "react-redux";
import { setUser, setProfileImage } from "../../store/userAction";
import { useError } from "../../ErrorContext";
import { useSuccess } from "../../SuccessContext";
import apiRequest from "../useApi";

const useUserProfile = () => {
    const { handleError } = useError();
    const { handleSuccess } = useSuccess();
    const dispatch = useDispatch();

    const updateUser = async (setLoading, setApiCallStatus, data, userId) => {
        try {
            await apiRequest({
                requestType: 'put',
                url: `${process.env.REACT_APP_URI}user/update/${userId}`,
                data,
                setLoading,
                onSuccess: (response) => {
                    setApiCallStatus('User profile updated successfully');
                    console.log(response);
                    handleSuccess(response.message || 'User profile updated successfully', 200);

                    const { _id, profile_pic, posted_properties, active_properties, tour_request, contact_request, tour_apply, contact_apply } = response.data;
                    const profileData = {
                        user_name: response.data.user_name,
                        email_id: response.data.email_id,
                        gender: response.data.gender,
                        mobile_number: response.data.mobile_number
                    };

                    dispatch(setUser(_id, profile_pic, profileData, posted_properties, active_properties, tour_request, contact_request, tour_apply, contact_apply));
                },
                onError: (error) => handleError(error)
            });
        } catch (err) {
            setApiCallStatus(err.message || 'Error updating user profile');
        }
    };

    const profileImageUpload = async (setLoading, setApiCallStatus, data, userId) => {
        try {
            await apiRequest({
                requestType: 'post',
                url: `${process.env.REACT_APP_URI}user/upload-profile-image/${userId}`,
                data,
                setLoading,
                onSuccess: (response) => {
                    setApiCallStatus(`File uploaded successfully`);
                    handleSuccess(response.message || 'User profile image uploaded successfully', 200);
                    console.log(response);
                    dispatch(setProfileImage(response.imageUrl));
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error uploading file');
            console.log(error);
        }
    };

    const profileImageUpdate = async (setLoading, setApiCallStatus, data, userId) => {
        try {
            await apiRequest({
                requestType: 'put',
                url: `${process.env.REACT_APP_URI}user/update-profile-image/${userId}`,
                data,
                setLoading,
                onSuccess: (response) => {
                    setApiCallStatus(`File updated successfully`);
                    handleSuccess(response.message || 'User profile image updated successfully', 200);
                    dispatch(setProfileImage(response.imageUrl));
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error updating file');
            console.log(error);
        }
    };

    return {
        updateUser,
        profileImageUpload,
        profileImageUpdate
    };
};

export default useUserProfile;
