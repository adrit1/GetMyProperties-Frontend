
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import styles from './Slider.module.css';

// import required modules
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';

const Slider = ({ image_files, isBanner = false }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const handleSlideChange = (swiper) => {
        setActiveSlide(swiper.activeIndex);
    }

    const getHeight = () => {
        const width = window.innerWidth;
        if (isBanner) {
            if (width <= 768) return "50vh"; // Mobile
            if (width <= 1024) return "60vh"; // Tablets
            return "90vh"; // Desktop
        } else {
            return "400px";
        }
    };
    return (

        <Box className={styles.imageSlider}>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="mySwiper"
                onSlideChange={handleSlideChange}
                effect="fade" // Apply fade effect
                fadeEffect={{ crossFade: true }}
            // allowSlidePrev={false}

            >
                {image_files.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img}
                            alt={`property ${index}`}
                            className={`${styles.sliderImage} ${activeSlide === index ? styles.zoomOut : ""}`

                            }

                            style={{ height: getHeight() }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box >
    )
}

export default Slider