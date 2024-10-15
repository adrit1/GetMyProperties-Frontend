import React, { useState, useEffect } from 'react';
import MobileInput from './MobileInput';
import OtpInput from './OtpInput';
import OtpButton from './OtpButton';
import { startTimer } from './timerUtils';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useUserApiCalls from '../../Api/useUserApiCalls2';

import styles from "./Register.module.css";
import AnimatedButton from '../../components/UI/Button/AnimatedButton';

import { useError } from '../../ErrorContext';
import AnimatedInput from '../../components/UI/Input/AnimatedInput';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from 'react-icons/ri';
import { PiMessengerLogoFill } from "react-icons/pi";
import { MuiOtpInput } from 'mui-one-time-password-input'
const Register = () => {
    const { createUser, sendOTP } = useUserApiCalls();
    const { handleError } = useError();
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailId, setEmailId] = useState('');
    const [emailError, setEmailError] = useState('');
    const [otp, setOtp] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [otpError, setOtpError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSendOTP, setShowSendOTP] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [showSubmitBtn, setShowSubmitBtn] = useState(false);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    const [otpButtonLoading, setOtpButtonLoading] = useState(false);
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [apiCallStatus, setApiCallStatus] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('');



    const navigate = useNavigate();
    const dispatch = useDispatch();



    useEffect(() => {
        if (registerSuccess) {
            const timer = setTimeout(() => {
                navigate('/properties');
            }, 6000); // 6000 milliseconds = 6 seconds

            return () => clearTimeout(timer);
        }
    }, [registerSuccess, navigate]);

    const handleMobileChange = (e) => {
        const { value } = e.target;
        if (/^\d{0,10}$/.test(value)) {
            setMobileError('');
            setMobileNumber(value);
            setShowSendOTP(value.length === 10);
        } else {
            setMobileError('Please enter only 10 digits.');
        }
    };
    const handleEmailChange = (e) => {
        const { value } = e.target;

        // Simple email validation regex: checks if it follows the format `something@something.com`
        const emailRegex = /^\S+@\S+\.\S+$/;

        setEmailId(value);
        if (emailRegex.test(value)) {
            setEmailError(''); // Clear error if email is valid
            setShowSendOTP(true);
            // setShowOTP(true);
        } else {
            setShowSendOTP(false);
            // setShowOTP(false);
            setEmailError('Please enter a valid email address.'); // Show error for invalid email format
        }
    };

    const handleOtpChange = (value) => {
        // const { value } = e.target;
        setOtp(value);
        if (/^\d{4}$/.test(value)) {
            setOtpError('');
            setShowPassword(true);
        } else {
            setOtpError('Please enter OTP.');
            setShowPassword(false);
        }
    };
    const handleConfirmPasswordChange = (e) => {
        const { value } = e.target;
        setConfirmPassword(value);
        if (value !== password) {
            setPasswordError('Password & confirm password must match');
        } else {
            setPasswordError('');
            setShowSubmitBtn(true);
            setIsBtnDisabled(false);
        }
    }

    const handleOTPSend = async () => {

        setOtpButtonLoading(true);
        const data = { "email_id": emailId };
        console.log(data);
        try {
            sendOTP(data, setLoading, setApiCallStatus, setShowOTP, setShowSubmitBtn);
            startTimer(setTimer);

        } catch (error) {
            setOtpError('Error sending OTP. Try again...');
        } finally {
            setOtpButtonLoading(false);
        }
    };

    const handleRegister = async () => {
        setSubmitButtonLoading(true);
        const data = { email_id: emailId, enteredOtp: otp, password: password }
        try {
            await createUser(setLoading, setApiCallStatus, data, setRegisterSuccess);
        } catch (err) {
            console.log(err)
        } finally {
            setSubmitButtonLoading(false);
        }
    };



    return (
        <div className={styles.register} >
            {!registerSuccess && (
                <div >
                    <h2>Register</h2>
                    {/* <MobileInput mobileNumber={mobileNumber} handleMobileChange={handleMobileChange} mobileError={mobileError} /> */}

                    {/* <TextField id="outlined-basic" label="Enter your email" variant="outlined" required type='email' /> */}

                    <AnimatedInput placeholder="Enter email id" value={emailId} onChange={(e) => handleEmailChange(e)} icon={<MdEmail />} bgc="#e6f2ff" />
                    <p color='red'>{emailError}</p>
                    {showSendOTP && <OtpButton loading={loading} handleOTPSend={handleOTPSend} isDisabled={timer > 0} timer={timer} />}

                    {showOTP &&

                        <div>Enter OTP<MuiOtpInput autoFocus length={4} value={otp} onChange={handleOtpChange} TextFieldsProps={{ placeholder: '-' }} />

                        </div>


                    }
                    {otpError && <p style={{ color: 'red' }}>{otpError}</p>}

                    {showPassword && <><AnimatedInput
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        icon={<RiLockPasswordFill />
                        }
                        bgc="#e6f2ff"
                    />
                        <AnimatedInput
                            placeholder="Enter confirm password"
                            value={confirmPassword}
                            onChange={(e) => handleConfirmPasswordChange(e)}
                            type="password"
                            icon={<RiLockPasswordFill />}
                            bgc="#e6f2ff"
                        /></>}
                    <p>{passwordError}</p>


                    {showSubmitBtn && <AnimatedButton title="Submit" color="green" onClick={handleRegister} isLoading={submitButtonLoading} isDisabled={isBtnDisabled} />}
                    {apiCallStatus && <p>Status: {apiCallStatus}</p>}


                </div>
            )}
            {registerSuccess && (
                <div className={styles.registered}>
                    <img src="/images/tick.webp" alt="Success" className={styles.gif} />
                    <h3>Successfully Registered</h3>
                </div>
            )}
        </div>
    );
};

export default Register
