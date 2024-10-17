import React from 'react'
import Slider from "../Slider/Slider"
import styles from "./Banner.module.css"
import { useSuccess } from "../../SuccessContext";
const Banner = () => {
    const { handleSuccess } = useSuccess();
    // handleSuccess("Your Data has been saved")

    const getHeight = () => {
        const width = window.innerWidth;

        if (width <= 768) return "-14%"; // Mobile


        return "18%";

    };
    const onSubmitForm = (event) => {
        event.preventDefault();
        handleSuccess("Your Data has been saved")

    }
    const image_files = ["/images/slide1.jpg", "/images/slide2.jpg", "/images/slide3.jpg", "/images/slide4.jpg", "/images/slide5.jpg"]
    return (
        <div className={styles.container}>
            <div >
                <Slider image_files={image_files} isBanner={true} />
            </div>
            <div className={styles.heroSection} style={{ position: 'absolute', top: getHeight() }}>
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
                    <form className={styles.overlayForm} onSubmit={onSubmitForm}>
                        <input type="text" placeholder="Full Name" required />
                        <input type="email" placeholder="Email" required />
                        <input type="tel" placeholder="Phone" required />
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