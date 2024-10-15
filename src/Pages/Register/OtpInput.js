// OtpInput.js
import React from 'react';
import AnimatedInput from '../../components/UI/Input/AnimatedInput';
import { RiLockPasswordFill } from "react-icons/ri";

const OtpInput = ({ otp, handleOtpChange, otpError }) => {
    return (
        <div>
            <AnimatedInput
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                type="password"
                icon={<RiLockPasswordFill />}
            />
            {otpError && <p style={{ color: 'red' }}>{otpError}</p>}
        </div>
    );
};

export default OtpInput;
