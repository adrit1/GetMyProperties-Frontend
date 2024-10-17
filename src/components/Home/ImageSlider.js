import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay } from 'swiper/modules';

import styles from './VideoBackground.module.css'; // Importing the modular CSS

const ImageSlider = () => {
    return (
        <div className={styles.container}>

            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}

                modules={[Autoplay]}
                className="mySwiper"

            >

                <SwiperSlide>
                    <img
                        src="/images/1.png"
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
