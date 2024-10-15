import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserProfile.module.css";
import ProfileDetails from "./ProfileDetails";
import AllPostedProperties from "./AllPostedProperties";
import ActiveProperties from "./ActiveProperties";
import TourRequests from "./TourRequests";
import ContactRequests from "./ContactRequests";
import DeleteProfileModal from "./DeleteProfileModal";

import ApplyRequest from "./ApplyRequest";
import Loading from "../../components/UI/Loading/Loading";
import { Link } from "react-router-dom";

const UserProfile = () => {
    const [loading, setLoading] = useState(false);

    const user = useSelector((state) => state.user);
    const userId = useSelector((state) => state.user.userId);
    console.log(user)


    if (loading) {
        return <Loading loading={loading} />;
    }

    return (
        userId ? (
            <div className={styles.container}>
                <h1 className={styles.topHeading}>Profile</h1>
                <ProfileDetails />
                {/* <ImageUpload userId={user._id} /> */}
                <div className={styles.bottomContainer}>
                    <AllPostedProperties />
                    <ActiveProperties user={user} />
                    <TourRequests user={user} />
                    <ContactRequests user={user} />
                    {user && user.role === "broker" &&
                        <ApplyRequest />}


                    <DeleteProfileModal userId={user && user._id} />


                </div>
            </div>
        ) : <p>Please log in. <Link to="/register">Register/Log in</Link></p>
    );
};

export default UserProfile;
