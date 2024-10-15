import React, { useState } from 'react'
import ExpandStructure from '../../components/UI/Expand/ExpandStructure';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useError } from '../../ErrorContext';
const ApplyRequest = () => {
    const { handleError } = useError();
    const [applyTours, setApplyTours] = useState([]);
    const [hasFetchedApplyTour, setHasFetchedApplyTour] = useState(false);

    const [applyContacts, setApplyContacts] = useState([]);
    const [hasFetchedApplyContact, setHasFetchedApplyContact] = useState(false);

    const user = useSelector((state) => state.profile.user)


    const fetchTourRequests = async (isApply) => {
        if (!hasFetchedApplyTour) {
            try {
                const token = localStorage.getItem("token");

                let reqArray = "tour_request";
                if (isApply) {
                    reqArray = "tour_apply";
                }
                const tourRequests = await Promise.all(
                    user[reqArray].map((tourId) =>
                        axios.get(
                            `${process.env.REACT_APP_URI}tours/${tourId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        )
                    )
                );
                // console.log(tourRequests);
                if (isApply) {
                    setApplyTours(tourRequests.map((res) => res.data));
                    setHasFetchedApplyTour(true);
                }


            } catch (error) {
                console.error("Error fetching properties:", error);
                handleError(error);

            }
        }
    };

    const fetchContactRequests = async (isApply) => {
        if (!hasFetchedApplyContact) {
            try {
                const token = localStorage.getItem("token");

                let reqArray = "contact_request";
                if (isApply) {
                    reqArray = "contact_apply";
                }
                const contactRequests = await Promise.all(
                    user[reqArray].map((contactId) =>
                        axios.get(
                            `${process.env.REACT_APP_URI}contacts/${contactId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        )
                    )
                );
                // console.log(contactRequests);
                if (isApply) {
                    setApplyContacts(contactRequests.map((res) => res.data));
                    setHasFetchedApplyContact(true);
                }


            } catch (error) {
                console.error("Error fetching properties:", error);
                handleError(error);
            }
        }
    };
    return (
        <div>
            <ExpandStructure title="Tour Applied" onExpand={() => fetchTourRequests(true)}>
                {applyTours.length > 0 && applyTours.map((tour, idx) => <div key={idx}>
                    <p>{tour.message}</p>
                    <p>{tour.time}</p>
                    <p>{tour.property_id}</p>

                </div>)}
            </ExpandStructure>
            <ExpandStructure title="Contact Applied" onExpand={() => fetchContactRequests(true)}>
                {applyContacts.length > 0 && applyContacts.map((contact, idx) => <div key={idx}>
                    <p>{contact.message}</p>
                    <p>{contact.time}</p>
                    <p>{contact.property_id}</p>

                </div>)}
            </ExpandStructure>




        </div>
    )
}

export default ApplyRequest