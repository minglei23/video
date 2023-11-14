import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useGesture } from '@use-gesture/react';

const Player = () => {
  const { seriesId } = useParams();
  const [videoSrc, setVideoSrc] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoUrls = [
    'https://dc4ef1i295q51.cloudfront.net/m_0.mp4',
    'https://dc4ef1i295q51.cloudfront.net/m_1.mp4',
    'https://dc4ef1i295q51.cloudfront.net/m_2.mp4',
  ];

  const bind = useGesture({
    onScroll: ({ direction }) => {
      if (direction[1] > 0) { // 向下滚动
        const nextIndex = Math.min(currentIndex + 1, videoUrls.length - 1);
        if (nextIndex !== currentIndex) {
          setCurrentIndex(nextIndex);
          setVideoSrc(videoUrls[nextIndex]);
        }
      }
    },
  });

  useEffect(() => {
    setVideoSrc(videoUrls[currentIndex]);
  }, [currentIndex]);
  return (
    <div {...bind()} style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      width: '100%',
    }}>
      <ReactPlayer
        url={videoSrc}
        playing
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Player;
