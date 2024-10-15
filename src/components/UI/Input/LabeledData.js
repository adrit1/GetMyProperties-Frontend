import React from 'react';
import styles from "./LabeledData.module.css"

const LabeledData = ({ label, data }) => {
    return (
        <div className={styles.container}>
            <label className={styles.label} >{label} : </label>
            <span className={styles.data} >{(!data || data === '') ? "Dummy Data" : data}</span>
        </div>
    )
}

export default LabeledData