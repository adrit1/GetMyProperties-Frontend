import React from 'react';
import styles from './ErrorPage.module.css';
import AnimatedButton from '../../Button/AnimatedButton';

const ErrorPage = ({ heading, message, statusCode, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.errorModal}>
                <button className={styles.closeButton} onClick={onClose}>✖</button>
                <h1 className={styles.topHeading}>{heading}</h1>
                <div className={styles.errorMessage}>
                    <h2>Status Code: {statusCode}</h2>
                    <p>{message}</p>
                </div>
                <AnimatedButton title="Okay" onClick={onClose} color="red" style={{ width: '30%' }} />
            </div>
        </div>
    );
};

export default ErrorPage;
