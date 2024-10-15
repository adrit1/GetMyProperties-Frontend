import React from 'react';
import styles from './VideoBackground.module.css'; // Importing the modular CSS

const VideoBackground = () => {
    return (
        <div className={styles.container}>
            {/* Video Background */}
            <video className={styles.videoBackground} autoPlay loop muted>
                <source src="../../../images/video.mp4" type="video/mp4" />

            </video>

            {/* Overlay Content */}
            <div className={styles.overlay}>
                <div className={styles.textWrapper}>
                    <span className={styles.projectTag}>Mohorkoonjo</span>
                    <h2 className={styles.description}>3, 4 BHK Villas at Baruipur, Kolkata</h2>
                    <p className={styles.price}>Starting from ₹ 59.8 Lac</p>
                    <p className={styles.marketed}>Marketed by Squaremark Homes Pvt Ltd</p>
                </div>
            </div>
        </div>
    );
};

export default VideoBackground;
