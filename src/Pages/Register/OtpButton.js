// OtpButton.js
import React from 'react';
import AnimatedButton from '../../components/UI/Button/AnimatedButton';

const OtpButton = ({ loading, handleOTPSend, isDisabled, timer }) => {
    return (
        <div>
            <AnimatedButton
                title={loading ? "Loading..." : "Send OTP"}
                color="orange"
                onClick={handleOTPSend}
                isLoading={loading}
                isDisabled={isDisabled}
            />
            {timer > 0 && <p>{timer}s</p>}
        </div>
    );
};

export default OtpButton;
