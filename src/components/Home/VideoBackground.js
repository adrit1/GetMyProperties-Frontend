import React from 'react';
import styles from './VideoBackground.module.css'; // Importing the modular CSS

const VideoBackground = () => {
    return (
        <div className={styles.container}
        >
            {/* Video Background */}
            <iframe
                className={styles.videoBackground}
                width="100%"
                height="auto"
                src="https://www.youtube.com/embed/yAxIo84SE5w?autoplay=1&loop=1&mute=1&playlist=yAxIo84SE5w"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title='one'
                pointerEvents="none"
            ></iframe>


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
