// MobileInput.js
import React from 'react';
import AnimatedInput from '../../components/UI/Input/AnimatedInput';
import { FaUser } from "react-icons/fa";

const MobileInput = ({ mobileNumber, handleMobileChange, mobileError }) => {
    return (
        <div>
            <AnimatedInput
                placeholder="Enter your mobile number"
                value={mobileNumber}
                onChange={handleMobileChange}
                type="text"
                icon={<FaUser />}
            />
            {mobileError && <p style={{ color: 'red', fontSize: '10px', margin: '0px' }}>{mobileError}</p>}
        </div>
    );
};

export default MobileInput;
