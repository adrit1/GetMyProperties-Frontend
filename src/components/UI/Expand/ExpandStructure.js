import React, { useState } from 'react';
import styles from './ExpandStructure.module.css'; // Import your CSS module

const ExpandStructure = ({ title, children, onExpand }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = async () => {
        await setIsExpanded(isExpanded => !isExpanded);
        console.log("IsExpand " + isExpanded);
        if (!isExpanded && onExpand) {
            onExpand();
        }
    };

    return (
        <div className={styles.expandStructure}>
            <div className={styles.header}>
                <h4 className={styles.title}>{title}</h4>
                <button className={styles.toggleButton} onClick={toggleExpand}>
                    {isExpanded ? '-' : '+'}
                </button>
            </div>
            {isExpanded && <div className={styles.content}>{children}</div>}
        </div>
    );
};

export default ExpandStructure;
