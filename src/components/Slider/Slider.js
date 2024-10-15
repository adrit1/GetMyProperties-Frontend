
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
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="mySwiper"
                onSlideChange={handleSlideChange}
                effect="fade" // Apply fade effect
                fadeEffect={{ crossFade: true }}

            >
                {image_files.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img}
                            alt={`property ${index}`}
                            className={`${styles.sliderImage} ${activeSlide === index ? styles.zoomOut : ""}`

                            }

                            style={{ height: isBanner === true ? "90vh" : "400px" }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box >
    )
}

export default Slider