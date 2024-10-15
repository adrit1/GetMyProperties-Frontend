import React, { createContext, useContext, useState } from 'react';
import SuccessPage from './components/UI/Modal/Success/SuccessPage';

const SuccessContext = createContext();

export const SuccessProvider = ({ children }) => {
    const [success, setSuccess] = useState(null);

    const handleSuccess = (message, statusCode = 200) => {
        setSuccess({
            message: message || 'Action completed successfully!',
            statusCode: statusCode,
        });

        // Automatically close the modal after 5 seconds
        setTimeout(() => {
            setSuccess(null);
        }, 3000);
    };

    const closeSuccessModal = () => {
        setSuccess(null);
    };

    return (
        <SuccessContext.Provider value={{ success, handleSuccess, closeSuccessModal }}>
            {children}
            {success && (
                <SuccessPage
                    heading="Success!"
                    message={success.message}
                    statusCode={success.statusCode}
                    onClose={closeSuccessModal}
                />
            )}
        </SuccessContext.Provider>
    );
};

export const useSuccess = () => {
    return useContext(SuccessContext);
};
