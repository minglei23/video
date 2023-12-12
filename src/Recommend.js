import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { GetRecommendSeries, RecordHistory } from './service';
import { GetUser } from './cache';
import PlayerIcons from './PlayerIcons.js';

const Recommend = () => {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [showPlayerIcons, setShowPlayerIcons] = useState(true);

  const videoRef = useRef(null)
  const [play, setPlay] = useState(true);

  const onVideo = () => {
    if (play) {
      videoRef.current.pause();
      setPlay(false)
    }
    else {
      videoRef.current.play();
      setPlay(true)
    }
  }

  const fetchRecommend = async () => {
    try {
      const series = await GetRecommendSeries();
      if (series) {
        const episode = Math.floor(1 + Math.random() * 4)
        setUrl(`${series.BaseURL}/1.mp4`);
        setVideo(series);
        setShowPlayerIcons(true);
        const user = GetUser()
        if (user) {
          RecordHistory(user.ID, parseInt(series.ID), episode)
        }
      }
    } catch (error) {
      console.error('Error fetching recommend:', error);
    }
  };

  useEffect(() => {
    fetchRecommend();
  }, []);

  const handlers = useSwipeable({
    onSwiped: () => setShowPlayerIcons(false),
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
      height: '92vh',
      width: '100%',
    }}>
      <h5 style={{ height: '4vh', lineHeight: '4vh', fontSize: '2vh', margin: 0, padding: 0 }}>
        {video ? video.Name : "Loading..."}
      </h5>
      {url && <video
        src={url}
        loop
        playsInline
        autoPlay
        onClick={onVideo}
        ref={videoRef}
        style={{
          maxWidth: '100%',
          maxHeight: '80vh',
          objectFit: 'contain',
        }}
      />}
      {video && showPlayerIcons && <PlayerIcons seriesId={video.ID} />}
    </div>
  );
};

export default Recommend;
