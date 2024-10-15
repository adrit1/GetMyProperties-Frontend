import React from 'react'
import styles from "./PostedProperties.module.css";
import SinglePP from './SinglePP';
const PostedProperties = ({ data }) => {
    return (
        <div className={styles.container}>
            {data.length !== 0 && data.map((property) => <SinglePP key={property._id} data={property} />
            )}
        </div>
    )
}

export default PostedProperties