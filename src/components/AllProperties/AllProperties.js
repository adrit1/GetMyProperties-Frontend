import React, { useState } from 'react';
import styles from './AllProperties.module.css';

import TopProjects from './TopProjects/TopProjects';
import Section from './Section';
import { SwiperSlide } from 'swiper/react';
import ProductCard1 from './ProductCard';
import Slider from './Slider';
import PropertyCard2 from './ProductCard2';


const AllProperties = ({ data }) => {
    console.log(data)

    return (
        <>
            <Section data={data} title="Recently Added" subTitle="Based on preferences of users like you" bgc="#ccc9" >
                <Slider one="2" two="3" three="4" sliderId="1" >
                    {data.map((card, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard1 data={card} />
                        </SwiperSlide>
                    ))}
                </Slider>
            </Section>

            <TopProjects data={data} title="Top Projects" subTitle="Best developers in Kolkata to explore" bgc="#ccc3" />
            <Section data={data} title="Recently Added" subTitle="Based on preferences of users like you" bgc="#ccc9" >
                <Slider one="2" two="2" three="3" sliderId="1" >
                    {data.map((card, index) => (
                        <SwiperSlide key={index}>
                            <PropertyCard2 data={card} />
                        </SwiperSlide>
                    ))}
                </Slider>
            </Section>
        </>
    );
};

export default AllProperties;
