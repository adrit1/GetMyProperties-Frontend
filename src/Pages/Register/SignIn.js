import React, { useState } from 'react'
import styles from "./Register.module.css";
import AnimatedInput from '../../components/UI/Input/AnimatedInput';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import AnimatedButton from '../../components/UI/Button/AnimatedButton';
import useApiCalls from "../../Api/useUserApiCalls"
const SignIn = () => {
    const { signInUser } = useApiCalls();
    const [emailId, setEmailId] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [apiCallStatus, setApiCallStatus] = useState('');

    const handleEmailChange = (e) => {
        const { value } = e.target;

        // Simple email validation regex: checks if it follows the format `something@something.com`
        const emailRegex = /^\S+@\S+\.\S+$/;

        setEmailId(value);
        if (emailRegex.test(value)) {
            setEmailError(''); // Clear error if email is valid

        } else {

            setEmailError('Please enter a valid email address.'); // Show error for invalid email format
        }
    };

    const handleSignIn = async () => {
        setSubmitButtonLoading(true);
        const data = { email_id: emailId, password: password }
        try {
            await signInUser(setLoading, setApiCallStatus, data, setRegisterSuccess)
        } catch (err) {
            console.log(err)
        } finally {
            setSubmitButtonLoading(false);
        }
    };
    return (
        <div className={styles.register}>
            <h2>Login</h2>

            <AnimatedInput placeholder="Enter email id" value={emailId} onChange={(e) => handleEmailChange(e)} icon={<MdEmail />} bgc="#e6f2ff" />
            <p color='red'>{emailError}</p>
            <AnimatedInput
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                icon={<RiLockPasswordFill />}
                bgc="#e6f2ff"
            />
            <AnimatedButton title="Submit" color="green" onClick={handleSignIn} isLoading={submitButtonLoading} />


        </div>
    )
}

export default SignIn