import React, { useRef, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper } from 'swiper/react';

const Slider = ({ one, two, three, children }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        // Assign the swiper-button-prev and swiper-button-next to the elements with the refs
        if (prevRef.current && nextRef.current) {
            prevRef.current.classList.add('swiper-button-prev');
            nextRef.current.classList.add('swiper-button-next');
        }
    }, []);

    return (
        <div className="container1" style={{ position: 'relative' }}>
            <Swiper
                slidesPerView={2}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                navigation={{
                    prevEl: prevRef.current, // Use the ref for previous button
                    nextEl: nextRef.current, // Use the ref for next button
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                breakpoints={{
                    420: {
                        slidesPerView: one || 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: two || 3,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: three || 4,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {children}
            </Swiper>

            {/* Custom Previous Button */}
            <div
                ref={prevRef} // Assign the ref here
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    cursor: 'pointer',
                    padding: '10px',
                    color: 'blue',
                    borderRadius: '50%',

                }}
            >

            </div>

            {/* Custom Next Button */}
            <div
                ref={nextRef} // Assign the ref here
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    cursor: 'pointer',
                    padding: '10px',
                    color: 'blue',
                    borderRadius: '50%',

                }}
            >

            </div>
        </div>
    );
};

export default Slider;
