import React from 'react'
import styles from "./Section.module.css";
const Section = ({ title, subTitle, bgc, children }) => {
    return (

        <div style={{
            backgroundColor: bgc,

        }} className={styles.container}>
            <h2 className={styles.heading}>{title}</h2>
            <p className={styles.subHeading}>{subTitle}</p>

            {children}
        </div>
    )
}

export default Section