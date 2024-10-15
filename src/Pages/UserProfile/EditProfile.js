import React, { useState } from 'react'
import AnimatedInput from '../../components/UI/Input/AnimatedInput'
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiGenderFemaleFill } from "react-icons/pi";
import AnimatedButton from '../../components/UI/Button/AnimatedButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


import useUserApiCalls from '../../Api/useUserApiCalls';
import Loading from '../../components/UI/Loading/Loading';

const EditProfile = ({ data, onClose }) => {
    const { updateUser } = useUserApiCalls();
    const [apiCallStatus, setApiCallStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState(data.user_name ? data.user_name : '')
    const [gender, setGender] = useState(data.gender ? data.gender : '')
    const [email_id, setEmail_id] = useState(data.email_id ? data.email_id : '');

    const userId = useSelector((state) => state.user.userId);
    const dispatch = useDispatch();


    const handleSubmit = async () => {

        const data = { name, email_id, gender };
        await updateUser(setLoading, setApiCallStatus, data, userId);
        onClose()
    }


    if (loading) return <Loading loading={loading} />;
    return (
        <>
            <h2>Update Profile Data</h2>
            <AnimatedInput placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} type="text" icon={<FaUserAlt />} />
            <AnimatedInput placeholder="Enter your email" value={email_id} onChange={(e) => setEmail_id(e.target.value)} type="email" icon={<MdEmail />} />

            <AnimatedInput placeholder="Enter your gender" value={gender} onChange={(e) => setGender(e.target.value)} type="select" icon={<PiGenderFemaleFill />}
                options={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'not to say', label: 'Not Prefer to say' },
                ]}


            />

            <AnimatedButton title="Update" onClick={handleSubmit} color="orange" />
            <p>{apiCallStatus}</p>

        </>
    )
}

export default (EditProfile)