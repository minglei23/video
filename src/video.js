import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import './video.css';

// import required modules
import { Virtual } from 'swiper/modules';

export default function Video() {
    const slides = ['https://dc4ef1i295q51.cloudfront.net/1.mp4',
        'https://dc4ef1i295q51.cloudfront.net/2.mp4',
        'https://dc4ef1i295q51.cloudfront.net/3.mp4',
        'https://dc4ef1i295q51.cloudfront.net/4.mp4',
        'https://dc4ef1i295q51.cloudfront.net/5.mp4']

    return (
        <div className="swiper-box">
            <Swiper
                onSlidePrevTransitionEnd={(swiper) => {
                    const videoElement = document.getElementById(`video_${swiper.activeIndex + 1}`)
                    const _videoElement = document.getElementById(`video_${swiper.activeIndex}`)
                    videoElement.pause()
                    videoElement.currentTime = 0
                    _videoElement.play()
                }}
                onSlideNextTransitionEnd={(swiper) => {
                    const videoElement = document.getElementById(`video_${swiper.activeIndex - 1}`)
                    const _videoElement = document.getElementById(`video_${swiper.activeIndex}`)
                    videoElement.pause()
                    videoElement.currentTime = 0
                    _videoElement.play()
                }}
                // onSlideChange={(swiper) => {
                //     console.log(swiper)
                //     if (swiper - 1) {
                //         const videoElement = document.getElementById(`video_${swiper.activeIndex -1}`)
                //         videoElement.pause()
                //     }
                // }}
                direction={'vertical'}
                modules={[Virtual]}
                className="mySwiper"
                virtual
            >

                {slides.map((slideContent, index) => (
                    <SwiperSlide key={slideContent} virtualIndex={index}>
                        <div className="swiper-content">
                            <video
                                id={`video_${index}`}
                                src={slideContent}
                                muted={true}
                                autoPlay
                                loop
                                controls
                                playsInline
                                width="100%"
                                style={{
                                    objectFit: 'contain',
                                }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
