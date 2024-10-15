// src/hooks/useTours.js
import { useDispatch } from "react-redux";
import { addTourRequest, removeTourRequest } from "../../store/userAction";
import { useError } from "../../ErrorContext";
import { useSuccess } from "../../SuccessContext";
import apiRequest from "../useApi";
import axios from "axios";
import { setTour } from "../../store/tourActions";

const useTours = () => {
    const { handleError } = useError();
    const { handleSuccess } = useSuccess();
    const dispatch = useDispatch();

    const fetchTour = async (isApply, TourRequest, TourApply, setApplyTours, setHasFetchedApplyTour, setTours, setHasFetchedTour) => {
        try {
            let reqArray = isApply ? TourApply : TourRequest;

            console.log(TourRequest);
            const tourRequests = await Promise.all(
                reqArray.map((tourId) =>
                    axios.get(`${process.env.REACT_APP_URI}tours/${tourId}`)
                )
            );

            if (isApply) {
                setApplyTours(tourRequests.map((res) => res.data));
                setHasFetchedApplyTour(true);
            } else {
                setTours(tourRequests.map((res) => res.data));
                dispatch(setTour(tourRequests.map((res) => res.data)))
                setHasFetchedTour(true);
            }
        } catch (error) {
            console.error("Error fetching tours:", error);
            handleError(error);
        }
    };

    const addTour = async (postData, setLoading, setApiCallStatus) => {
        try {
            await apiRequest({
                requestType: 'post',
                url: `${process.env.REACT_APP_URI}tours/create`,
                data: postData,
                setLoading,
                onSuccess: (response) => {
                    setApiCallStatus('Tour created successfully');
                    handleSuccess(response.message || 'Tour added successfully', 200);
                    console.log(response);
                    dispatch(addTourRequest(response.savedTour._id));
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error in tour creation');
            handleError(error);
        }
    };

    const updateTour = async (tourData, postData, setLoading, setApiCallStatus) => {
        try {
            await apiRequest({
                requestType: 'put',
                url: `${process.env.REACT_APP_URI}tours/update/${tourData._id}`,
                data: postData,
                setLoading,
                onSuccess: (response) => {
                    setApiCallStatus('Tour updated successfully');
                    handleSuccess('Tour updated successfully', 200);
                    console.log(response);
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error updating tour');
            handleError(error);
        }
    };

    const deleteTour = async (userId, propId, tourId, setLoading, setApiCallStatus) => {
        try {
            await apiRequest({
                requestType: 'delete',
                url: `${process.env.REACT_APP_URI}tours/delete/${userId}/${propId}/${tourId}`,
                setLoading,
                onSuccess: (response) => {
                    setApiCallStatus('Tour deleted successfully');
                    handleSuccess(response.message || 'Tour deleted successfully', 200);
                    console.log(response);
                    dispatch(removeTourRequest(response.id));
                },
                onError: (error) => handleError(error)
            });
        } catch (err) {
            setApiCallStatus("Error deleting tour");
            handleError(err);
        }
    };

    return {
        fetchTour,
        addTour,
        updateTour,
        deleteTour
    };
};

export default useTours;
