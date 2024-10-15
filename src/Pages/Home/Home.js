import React from 'react'
import VideoBackground from '../../components/Home/VideoBackground'

import ImageSlider from '../../components/Home/ImageSlider'
import styles from "./Home.module.css"
import Banner from '../../components/Home/Banner'
const Home = () => {
    return (
        <>
            <Banner />
            <div className={styles.container}>

                <ImageSlider />
                <VideoBackground />


            </div>
        </>
    )
}

export default Home
