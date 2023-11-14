import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const Player = () => {
  const { seriesId } = useParams();
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    const loadVideo = (index) => {
      const videoPath = `https://dc4ef1i295q51.cloudfront.net/media_0.ts`;
      setVideoSrc(videoPath);
    };

    loadVideo(videoIndex);
  }, [seriesId, videoIndex]);

  const handleScroll = (e) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setVideoIndex(vi => vi + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
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
