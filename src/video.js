import React, {useCallback, useEffect, useRef, useState} from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide,useSwiper  } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './video.css';

// import required modules
import { Pagination, Virtual } from 'swiper/modules';

export default function Video() {
    const [swiperRef, setSwiperRef] = useState(null);
    const videoRef = useRef()
    const slides = ['https://dc4ef1i295q51.cloudfront.net/9.mp4', 'https://dc4ef1i295q51.cloudfront.net/7.mp4']
    const rgb = () =>{
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        return  'rgb('+r+','+g+','+b+')';
    }

    return (
        <div className="swiper-box">
            <Swiper
                onSwiper={setSwiperRef}
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
                pagination={{
                    clickable: true,
                }}
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
