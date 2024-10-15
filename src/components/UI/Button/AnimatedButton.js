import React, { useEffect, useRef } from 'react';
import styles from './AnimatedButton.module.css';

const AnimatedButton = ({ onClick, title, style, color, isLoading, isDisabled }) => {
    const sliderRef = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current;

        const keyframes = [
            { transform: 'translateX(-100%) rotate(45deg)' },
            { transform: 'translateX(400px) rotate(45deg)' },
            { transform: 'translateX(-200%) rotate(45deg)' }
        ];

        const options = {
            duration: 4000,
            iterations: Infinity,
            easing: 'linear',
        };

        slider.animate(keyframes, options);
    }, []);

    return (
        <button onClick={isLoading ? null : onClick} disabled={isLoading || isDisabled} className={styles.animatedButton} style={{ ...style, backgroundColor: color }} >
            <span className={styles.buttonText}>{(isLoading && isLoading === true) ? "Loading..." : title}</span>
            <div className={styles.sliderContainer}>
                <div ref={sliderRef} className={styles.slider}></div>
            </div>
        </button>
    );
};

export default AnimatedButton;
