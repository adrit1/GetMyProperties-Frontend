import { useState } from 'react';
import SuccessPage from '../components/UI/Modal/Success/SuccessPage';

const useSuccessModal = (autoCloseTime = 5000) => {
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [modalData, setModalData] = useState({
        heading: '',
        message: '',
        statusCode: ''
    });

    const showSuccessModal = (heading, message, statusCode = '200') => {
        setModalData({ heading, message, statusCode });
        setIsSuccessModalOpen(true);

        // Auto-close after `autoCloseTime` milliseconds
        setTimeout(() => {
            setIsSuccessModalOpen(false);
        }, autoCloseTime);
    };

    // Render SuccessPage component if modal is open
    const renderSuccessModal = () => {
        if (isSuccessModalOpen) {
            return (
                <SuccessPage
                    heading={modalData.heading}
                    message={modalData.message}
                    statusCode={modalData.statusCode}
                    onClose={() => setIsSuccessModalOpen(false)}
                />
            );
        }
        return null;
    };

    return {
        showSuccessModal,
        renderSuccessModal
    };
};

export default useSuccessModal;
