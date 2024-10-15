import React, { useState } from 'react'
import styles from "./SinglePP.module.css";
import AnimatedButton from "../../../components/UI/Button/AnimatedButton";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useUserApiCalls from '../../../Api/useUserApiCalls';
import Loading from '../../../components/UI/Loading/Loading';

const SinglePP = ({ data }) => {
    const { deletePostedProperties } = useUserApiCalls();

    const navigate = useNavigate();
    const userId = useSelector((state) => state.profile.userId);
    const user = useSelector((state) => state.profile.userData);

    const [apiCallStatus, setApiCallStatus] = useState('');
    const [loading, setLoading] = useState(false);
    // console.log(user)
    const handleUpdateProperty = () => {
        navigate('/add-property', { state: { propertyData: data } });
    };

    const handleDeleteProperty = async () => {
        deletePostedProperties(setLoading, setApiCallStatus, data._id, userId)
    }

    const handleAddVerifiedProperty = async () => {
        navigate('/add-verified-property', { state: { u_prop_id: data._id } })
    }

    if (loading) return <Loading loading={loading} />;


    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img className={styles.img} src={data.images[0]} alt={data.property_type} />
            </div>
            <div className={styles.right}>
                <p>{data.property_type} Property</p>
                <p>{data.address}</p>
                <p>{data.created_at ? data.created_at : Date.now}</p>
                <div style={{ position: "absolute", bottom: 8, right: 8, display: 'flex' }}>
                    <AnimatedButton title="Update" color="green" onClick={handleUpdateProperty} />
                    <AnimatedButton title="Pending" color="orange" />
                    <AnimatedButton title="Delete" color="red" onClick={handleDeleteProperty} />

                    {<AnimatedButton title="Add Property" color="blue" onClick={handleAddVerifiedProperty} />}
                </div>

                <p>{apiCallStatus}</p>

            </div>

        </div>
    )
}

export default SinglePP