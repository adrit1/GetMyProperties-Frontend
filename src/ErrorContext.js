import React, { createContext, useContext, useState } from 'react';
import ErrorPage from './components/UI/Modal/Error/ErrorPage';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const handleError = (err) => {
        console.log(err)
        setError({
            message: err.response ? err.response.data.message : 'An error occurred. Please try again.',
            statusCode: err.response ? err.response.status : '500',
        });

        console.log(error)

    };

    const closeErrorModal = () => {
        setError(null);
    };

    return (
        <ErrorContext.Provider value={{ error, handleError, closeErrorModal }}>
            {children}
            {error && (
                <ErrorPage
                    heading="Error"
                    message={error.message}
                    statusCode={error.statusCode}
                    onClose={closeErrorModal}
                />
            )}
        </ErrorContext.Provider>
    );
};

export const useError = () => {
    return useContext(ErrorContext);
};
