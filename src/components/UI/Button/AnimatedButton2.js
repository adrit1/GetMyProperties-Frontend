import React, { useState } from 'react';
import styles from './AnimatedButton2.module.css'; // Importing the module CSS for styling


const AnimatedButton2 = ({ onPress, title, color }) => {


    return (
        <div
            className={`${styles.button}`}
            style={{ backgroundColor: color || "hot-pink" }}

        >
            <p className={styles.buttonText}>{title}</p>
        </div>
    );
};

export default AnimatedButton2;
