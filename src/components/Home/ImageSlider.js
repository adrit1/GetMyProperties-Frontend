import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Navigation } from 'swiper/modules';

import styles from './VideoBackground.module.css'; // Importing the modular CSS

const ImageSlider = () => {
    return (
        <div className={styles.container}>
            {/* Swiper with Image Scrolling */}
            <Swiper
                slidesPerView={1} // Show 1 slide at a time (scroll the whole image)
                spaceBetween={0} // No space between slides
                centeredSlides={true} // Center the slide for smooth transition
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                // navigation={true} // Enable navigation arrows
                modules={[Autoplay]}
                className="mySwiper"
            >
                {/* First slide containing the full image */}
                <SwiperSlide>
                    <img
                        src="/images/1.png" // Use absolute path for images in public folder
                        style={{ width: '100%' }}
                        alt="properties"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/2.png"
                        style={{ width: '100%' }}
                        alt="properties"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/3.png"
                        style={{ width: '100%' }}
                        alt="properties"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/4.png"
                        style={{ width: '100%' }}
                        alt="properties"
                    />
                </SwiperSlide>
            </Swiper>

            {/* Overlay Content */}
            <div className={styles.overlay}>
                <div className={styles.textWrapper}>
                    <span className={styles.projectTag} >HouseKing</span>
                    <h2 className={styles.description}>2, 3 BHK Villas at Goria, Kolkata</h2>
                    <p className={styles.price}>Starting from ₹ 79.8 Lac</p>
                    <p className={styles.marketed}>Marketed by Squaremark Homes Pvt Ltd</p>
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
