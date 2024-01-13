import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
import VideoPlayer from "../VideoPlayer";
import "./index.css";

const VideoSwiper = (props) => {
  const { videoList = [], preloadVideo, isShowBack, onBack } = props;
  const [activeKey, setActiveKey] = useState(0);
  const [allVideoRecord, setAllVideoRecord] = useState([]);


  useEffect(() => {
    setAllVideoRecord([...videoList]);
  }, [videoList]);
  const handleOnSlideChange = (value) => {
    setActiveKey(value.activeIndex);
  };
  const handleOnReachEnd = () => {
    if (preloadVideo) {
      const nextVideo = preloadVideo();
      if (!nextVideo) return;
      setAllVideoRecord([...allVideoRecord, nextVideo]);
    }
  };
  return (
    <div className="video-swiper-content">
      <Swiper
        className="video-swiper"
        slidesPerView="1"
        modules={[Virtual]}
        virtual
        direction="vertical"
        onSlideChange={handleOnSlideChange}
        onReachEnd={handleOnReachEnd}
      >
        {allVideoRecord.map((item, index) => {
          return (
            <SwiperSlide
              className="video-swiper-item"
              key={`${item.ID}-${new Date().getTime()}-${index}`}
              virtualIndex={index}
            >
              <VideoPlayer
                videoInfo={{ ...item }}
                isActive={activeKey === index}
                isShowBack={isShowBack}
                onBack={onBack}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default VideoSwiper;
