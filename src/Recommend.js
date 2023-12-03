import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { GetRecommendSeries } from './service';

const Recommend = () => {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);

  const fetchRecommend = async () => {
    try {
      const series = await GetRecommendSeries();
      if (series) {
        setUrl(`${series.BaseURL}/${Math.floor(1+Math.random()*10)}.mp4`);
        setVideo(series);
      }
    } catch (error) {
      console.error('Error fetching recommend:', error);
    }
  };

  useEffect(() => {
    fetchRecommend();
  }, []);

  const handlers = useSwipeable({
    onSwipedDown: fetchRecommend,
    onSwipedUp: fetchRecommend,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      width: '100%',
    }}>
      <h2>
        {video ? video.Name : "Loading..."}
      </h2>
      {url && <video
        src={url}
        autoPlay
        loop
        controls
        playsInline
        style={{
          maxWidth: '98%',
          maxHeight: '80vh', // 调整为留有空间显示标题
          objectFit: 'contain',
        }}
      />}
    </div>
  );
};

export default Recommend;
