// src/hooks/useUserPostedProperties.js
import { useDispatch } from "react-redux";
import { addPostedProperty, removePostedProperty } from "../../store/userAction";
import { useError } from "../../ErrorContext";
import { useSuccess } from "../../SuccessContext";
import apiRequest from "../useApi";
import axios from "axios";

const useUserPostedProperties = () => {
    const { handleError } = useError();
    const { handleSuccess } = useSuccess();
    const dispatch = useDispatch();

    const fetchPostedProperties = async (postedProperties, setUPProperties, setHasFetched) => {
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
                data,
                setLoading,
                onSuccess: (response) => {
                    setApiCallStatus("Properties posted successfully");
                    handleSuccess(response.message || 'Property added successfully', 200);
                    console.log(response.savedProperty);
                    dispatch(addPostedProperty(response.savedProperty._id));
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error posting properties.');
            handleError(error);
        }
    };

    const updatePostedProperties = async (setLoading, setApiCallStatus, data, id) => {
        try {
            await apiRequest({
                requestType: 'put',
                url: `${process.env.REACT_APP_URI}userPost/update/${id}`,
                data,
                setLoading,
                onSuccess: (response) => {
                    setApiCallStatus("Properties updated successfully");
                    handleSuccess(response.message || 'Property updated successfully', 200);
                    console.log(response);
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error updating properties.');
            handleError(error);
        }
    };

    const deletePostedProperties = async (setLoading, setApiCallStatus, postId, userId) => {
        try {
            await apiRequest({
                requestType: 'delete',
                url: `${process.env.REACT_APP_URI}userPost/delete/${userId}/${postId}`,
                setLoading,
                onSuccess: (response) => {
                    setApiCallStatus('Deleted successfully');
                    console.log(response);
                    handleSuccess(response.message || 'Property deleted successfully', 200);
                    dispatch(removePostedProperty(response.id));
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error deleting property');
            handleError(error);
        }
    };

    const fetchActiveProperties = async (activeProperties, setProperties, setHasFetched) => {
        try {
            const propertyDetails = await Promise.all(
                activeProperties.map((propertyId) =>
                    axios.get(`${process.env.REACT_APP_URI}properties/${propertyId}`)
                )
            );

            setProperties(propertyDetails.map((res) => res.data));
            setHasFetched(true);
        } catch (error) {
            console.error("Error fetching properties:", error);
            handleError(error);
        }
    };

    const fetchProperties = async (page, setLoading, setApiCallStatus, setProperties, setHasMore) => {
        try {
            await apiRequest({
                requestType: 'get',
                url: `${process.env.REACT_APP_URI}properties?page=${page}&limit=1`, // Adjust limit as needed
                setLoading,
                onSuccess: (response) => {
                    setApiCallStatus("Properties fetched successfully");
                    setProperties((prevProperties) => [...prevProperties, ...response.properties]);
                    setHasMore(response.properties.length > 0);
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error getting properties.');
            handleError(error);
        }
    };

    return {
        fetchPostedProperties,
        addPostedProperties,
        updatePostedProperties,
        deletePostedProperties,
        fetchActiveProperties,
        fetchProperties
    };
};

export default useUserPostedProperties;
