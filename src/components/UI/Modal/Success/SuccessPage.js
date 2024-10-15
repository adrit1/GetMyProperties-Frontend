import React from 'react';
import styles from './SuccessPage.module.css';
import AnimatedButton from '../../Button/AnimatedButton';

const SuccessPage = ({ heading, message, statusCode, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.errorModal}>
                <button className={styles.closeButton} onClick={onClose}>✖</button>
                <h1 className={styles.topHeading}>{heading}</h1>
                <div >
                    <img className={styles.gif} src='/images/thik-gif.gif' alt='gif success' />
                </div>

                <div className={styles.errorMessage}>
                    <h2>Status Code: {statusCode}</h2>
                    <p>{message}</p>
                </div>
                <AnimatedButton title="Okay" onClick={onClose} color="green" style={{ width: '30%' }} />
            </div>
        </div>
    );
};

export default SuccessPage;
