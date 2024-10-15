import React from 'react'
import Slider from "../Slider/Slider"
import styles from "./Banner.module.css"
const Banner = () => {
    const image_files = ["/images/slide1.jpg", "/images/slide2.jpg", "/images/slide3.jpg", "/images/slide4.jpg", "/images/slide5.jpg"]
    return (
        <div className={styles.container}>
            <div >
                <Slider image_files={image_files} isBanner={true} />
            </div>
            <div className={styles.heroSection}>
                <div className={styles.leftSection}>
                    <h1 className={styles.heading}>
                        Discover Properties <span className={styles.highlight}>Simplified!</span>
                    </h1>
                    <div className={styles.searchBox}>
                        <input type="text" placeholder="Search by location, developer or project name" />
                        <button>Search</button>
                    </div>
                </div>
                <div className={styles.formSection}>
                    <form className={styles.overlayForm}>
                        <input type="text" placeholder="Full Name" />
                        <input type="email" placeholder="Email" />
                        <input type="tel" placeholder="Phone" />
                        <div className={styles.radioGroup}>
                            <label>
                                <input type="radio" name="userType" value="Buyer" /> Buyer
                            </label>
                            <label>
                                <input type="radio" name="userType" value="Seller" /> Seller
                            </label>
                        </div>
                        <button type="submit" className={styles.submitButton}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Banner