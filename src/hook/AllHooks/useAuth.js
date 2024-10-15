// src/hooks/useAuth.js
import { useDispatch } from "react-redux";
import { setUser, setProfileImage, addPostedProperty, removePostedProperty, addTourRequest, removeTourRequest, addContactRequest, removeContactRequest, setTourApplies, setContactApplies, logoutUser } from "../../store/userAction";
import { useError } from "../../ErrorContext";
import { useSuccess } from "../../SuccessContext";
import apiRequest from "../useApi";




const useAuth = () => {
    const { handleError } = useError();
    const { handleSuccess } = useSuccess();
    const dispatch = useDispatch();

    const sendOTP = async (data, setLoading, setApiCallStatus, setShowOTP, setShowSubmitBtn) => {
        await apiRequest({
            requestType: 'post',
            url: `${process.env.REACT_APP_URI}otp/request-otp`,
            data,
            setLoading,
            onSuccess: (response) => {
                setApiCallStatus("OTP sent successfully");
                console.log(response);
                handleSuccess(response.message || 'OTP sent successfully', 200);
                setShowOTP(true);
                setShowSubmitBtn(true);
            },
            onError: (error) => handleError(error)
        });
    };

    const createUser = async (setLoading, setApiCallStatus, data, setRegisterSuccess) => {
        await apiRequest({
            requestType: 'post',
            url: `${process.env.REACT_APP_URI}user/sign-up`,
            data,
            setLoading,
            onSuccess: (response) => {
                setApiCallStatus("User created successfully");
                console.log(response);
                handleSuccess(response.message || 'User profile created successfully', 200);

                const { _id, profile_pic, posted_properties, active_properties, tour_request, contact_request, tour_apply, contact_apply } = response.data;
                const profileData = {
                    user_name: response.data.user_name,
                    email_id: response.data.email_id,
                    gender: response.data.gender,
                    mobile_number: response.data.mobile_number
                };

                dispatch(setUser(_id, profile_pic, profileData, posted_properties, active_properties, tour_request, contact_request, tour_apply, contact_apply));
                setRegisterSuccess(true);
            },
            onError: (error) => handleError(error)
        });
    };

    const signInUser = async (setLoading, setApiCallStatus, data, setRegisterSuccess) => {
        await apiRequest({
            requestType: 'post',
            url: `${process.env.REACT_APP_URI}user/sign-in`,
            data,
            setLoading,
            onSuccess: (response) => {
                setApiCallStatus("User signed in successfully");
                console.log(response);
                handleSuccess(response.message || 'User signed in successfully', 200);

                const { _id, profile_pic, posted_properties, active_properties, tour_request, contact_request, tour_apply, contact_apply } = response.data;
                const profileData = {
                    user_name: response.data.user_name,
                    email_id: response.data.email_id,
                    gender: response.data.gender,
                    mobile_number: response.data.mobile_number
                };

                dispatch(setUser(_id, profile_pic, profileData, posted_properties, active_properties, tour_request, contact_request, tour_apply, contact_apply));
                setRegisterSuccess(true);
            },
            onError: (error) => handleError(error)
        });
    };

    return {
        sendOTP,
        createUser,
        signInUser
    };
};

export default useAuth;
