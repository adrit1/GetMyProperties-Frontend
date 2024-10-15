import React, { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import AnimatedInput from '../../components/UI/Input/AnimatedInput'; // Adjust the import based on your file structure
import AnimatedButton from '../../components/UI/Button/AnimatedButton';
import styles from "./Register.module.css"

import ErrorPage from '../Error/ErrorPage';
import { TiTick } from "react-icons/ti";

import { useErrorHandler } from '../../hook/useErrorHandler';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/profileActions';

import apiRequest from "../../hook/useApi";

const MyComponent = () => {
    const [apiCallStatus, setApiCallStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error1, setError1] = useState(null);

    const [mobileNumber, setMobileNumber] = useState('');
    const [sendOTPSuccess, setSendOTPSuccess] = useState(false);

    const [otp, setOtp] = useState('');

    const [mobileError, setMobileError] = useState('');
    const [otpError, setOtpError] = useState('');
    const [otpButtonLoading, setOtpButtonLoading] = useState(false);


    const [showSendOTP, setShowSendOTP] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [showSubmitBtn, setShowSubmitBtn] = useState(false);
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    // const [user, setUser] = useState(null);

    const { error, showErrorModal, handleError, closeErrorModal } = useErrorHandler();



    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (registerSuccess) {
            const timer = setTimeout(() => {
                navigate('/properties');
            }, 6000); // 6000 milliseconds = 6 seconds

            // Cleanup the timer if the component unmounts before the timeout completes
            return () => clearTimeout(timer);
        }
    }, [registerSuccess, navigate]);
    const handleMobileChange = (e) => {


        const { value } = e.target;
        // Allow only numbers and limit to 10 digits
        if (/^\d{0,10}$/.test(value)) {
            setMobileError('');
            if (value.length === 10) {
                setMobileNumber(value);
                setShowSendOTP(true);
            }
            else {
                setMobileNumber(value);
                setShowSendOTP(false);
            }
        } else {
            setMobileError('Please enter only 10 digits.');

        }
    };

    const handleOtpChange = (e) => {
        const { value } = e.target;
        // Allow only numbers and limit to 6 digits in dot format
        if (/^\d{0,10}$/.test(value)) {
            setOtp(value);
            setOtpError(''); // Clear error if input is valid
        } else {
            setOtpError('Please enter OTP).');
        }
    };

    const handleOTPSend = async () => {
        setOtpButtonLoading(true); // Set loading state when sending OTP

        try {
            // console.log(process.env)
            // console.log(process.env.REACT_APP_URI)
            let response;

            try {
                response = await apiRequest({
                    requestType: 'post',
                    url: `${process.env.REACT_APP_URI}otp/request-otp`,
                    data: { "mobile_number": mobileNumber },
                    setLoading: setLoading,
                    setError: setError1,
                    onSuccess: (data) => {
                        setApiCallStatus("OTP sent successfully");
                        console.log(data)
                    },
                });
            } catch (error) {
                setApiCallStatus('Error sending OTP');
            }


            if (apiCallStatus === "OTP sent successfully") {
                // setShowSendOTP(false);
                setShowOTP(true);
                setShowSubmitBtn(true);
                startTimer(); // Start the timer after sending OTP
                setSendOTPSuccess(true);
            } else {
                setOtpError('Error sending OTP. Try again...');
            }
        } catch (error) {
            setOtpError('Error sending OTP. Try again...');
        } finally {
            setOtpButtonLoading(false); // Reset loading state
        }
    };

    const handleRegister = async () => {
        try {
            setSubmitButtonLoading(true);
            let response;

            try {
                response = await apiRequest({
                    requestType: 'post',
                    url: `${process.env.REACT_APP_URI}user/postData`,
                    data: { mobile_number: mobileNumber, enteredOtp: otp },
                    setLoading: setLoading,
                    setError: setError1,
                    onSuccess: (data) => {
                        setApiCallStatus("User created successfully");
                        console.log(data)
                    },
                });
            } catch (error) {
                setApiCallStatus('Error creating user');
            }

            console.log(mobileNumber + " " + otp + " " + response);
            setSubmitButtonLoading(false);
            if (response.status === 200) {
                console.log("Successfully registered");
                console.log(response.data.data);
                console.log(response.data.data.profile_pic);
                try {

                    dispatch(setUser(response.data.data._id, response.data.data));
                } catch (e) {
                    console.error("Error while dispatching:", e); // Log the complete error object
                    alert("Error while dispatching: " + e.message);
                };
                localStorage.setItem("token", response.data.token)
                // setUser(response.data);
                setRegisterSuccess(true);

            } else {
                handleError({
                    response: {
                        status: response.status,
                        data: { message: 'Invalid Error(status code)' }
                    }
                });
            }
        } catch (err) {

            setSubmitButtonLoading(false);
            // console.log("Hii")
            handleError(err);
        }
    };
    const startTimer = () => {
        setTimer(30); // Reset timer to 30 seconds
        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    return 0; // Stop the timer at 0
                }
                return prevTimer - 1; // Decrement the timer
            });
        }, 1000);
    };

    // if (loading) return <p>Loading...</p>;
    if (error1) return <p>Error: {error1.message}</p>;

    return (
        <>
            {!registerSuccess && <div className={styles.register}>
                <h2>Register/Login</h2>
                <AnimatedInput
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={handleMobileChange}
                    type="text"
                    icon={<FaUser />}
                />
                {mobileError && <p style={{ color: 'red', fontSize: '10px', margin: '0px' }}>{mobileError}</p>}


                {showSendOTP && <div className={styles.otpContainer}>
                    <AnimatedButton
                        title={loading ? "Loading..." : "Send OTP"}
                        color="orange"
                        onClick={handleOTPSend}
                        isLoading={otpButtonLoading}
                        isDisabled={timer > 0}
                    />
                    {timer > 0 && <p>{timer}s</p>}
                </div>}

                {sendOTPSuccess && <p style={{ color: 'green', fontSize: '10px', margin: '0px' }}>Otp sent Successfully.</p>}





                {showOTP && <AnimatedInput
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    type="password"
                    icon={<RiLockPasswordFill />}

                />}

                {otpError && <p style={{ color: 'red' }}>{otpError}</p>}

                {showSubmitBtn && <AnimatedButton title="Submit" color="green" onClick={handleRegister} isLoading={submitButtonLoading} />}
                {(apiCallStatus) && <p>Status: {apiCallStatus}</p>}
                {showErrorModal && error && <ErrorPage heading="Error during registration" message={error.message} statusCode={error.statusCode} onClose={closeErrorModal} />}
            </div>}

            {registerSuccess && <div className={styles.registered}>


                <img src="/images/tick.webp" alt="Success" className={styles.gif} />
                {/* <div>
                    <h2>User Data</h2>
                    <img src={user.profile_pic} alt="User Profile" style={{ width: '150px', height: '150px' }} />
                    <div><strong>Mobile Number:</strong> {user.mobile_number}</div>
                    
                </div> */}


                <h3>Successfully Registered</h3>
            </div>}

        </>

    );
};

export default MyComponent;
