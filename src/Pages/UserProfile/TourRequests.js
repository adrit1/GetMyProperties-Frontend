import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpandStructure from "../../components/UI/Expand/ExpandStructure";
import AnimatedButton from "../../components/UI/Button/AnimatedButton";
import TourModal from "../../components/UI/Modal/TourModal";
import { useSelector } from "react-redux";
import apiRequest from "../../hook/useApi";

import useUserApiCalls from "../../Api/useUserApiCalls";
import { useError } from "../../ErrorContext";
import Loading from "../../components/UI/Loading/Loading";
const TourRequests = () => {
    const TourRequest = useSelector(state => state.user.tourRequests);
    const TourDetails = useSelector(state => state.tourRequests.tours);
    const TourApply = useSelector(state => state.user.tourApplies);
    console.log(TourRequest);
    console.log(TourDetails);
    const { fetchTour, deleteTour } = useUserApiCalls();
    const { handleError } = useError();
    const [apiCallStatus, setApiCallStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [tours, setTours] = useState([]);
    const [hasFetchedTour, setHasFetchedTour] = useState(false);
    // const [applyTours, setApplyTours] = useState([]);
    // const [hasFetchedApplyTour, setHasFetchedApplyTour] = useState(false);

    const [isTourModalOpen, setIsTourModalOpen] = useState(false);

    const [data, setData] = useState({ time: '', message: '', _id: '' })
    const userId = useSelector(state => state.user.userId);

    const fetchTourRequests = async (isApply) => {
        if (!hasFetchedTour) {
            setLoading(true);
            fetchTour(false, TourRequest, TourApply, () => { }, () => { }, setTours, setHasFetchedTour);
            setLoading(false);
        }
    };
    const handleUpdate = async (tour) => {
        console.log(tour.message + " " + tour.time)
        setData({ time: tour.time, message: tour.message, _id: tour._id })
        setIsTourModalOpen(true);
        console.log(data);
    }

    const handleDelete = async (tourId, propId) => {
        await deleteTour(userId, propId, tourId, setLoading, setApiCallStatus);

    };
    useEffect(() => {

        TourDetails.length === 0 && fetchTour(false, TourRequest, TourApply, () => { }, () => { }, setTours, setHasFetchedTour);
    }, [hasFetchedTour])

    return (
        <ExpandStructure title="Tour Requests" >
            {loading && <Loading loading={loading} />}
            {!loading && TourDetails.length > 0 && TourDetails.map((tour, idx) => <div key={idx}>
                <p>{tour.message}</p>
                <p>{tour.time}</p>
                <p>{tour.property_id}</p>
                <AnimatedButton title='Update' color='green' onClick={() => handleUpdate(tour)} />
                <AnimatedButton title='Delete' color='red' onClick={() => handleDelete(tour._id, tour.property_id)} />
                <p>{apiCallStatus}</p>

            </div>)}
            {isTourModalOpen && <TourModal isTourModalOpen={isTourModalOpen} setIsTourModalOpen={setIsTourModalOpen} tourData={data} />}



        </ExpandStructure>
    );
};

export default TourRequests;
