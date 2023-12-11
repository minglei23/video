import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { GetRecommendSeries, RecordHistory } from './service';
import { GetUser } from './cache';
import PlayerIcons from './PlayerIcons.js';

const Recommend = () => {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [showPlayerIcons, setShowPlayerIcons] = useState(true);

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
      <h5 style={{height: '5vh', lineHeight: '5vh', fontSize: '2.5vh', margin: 0, padding: 0}}>
        {video ? video.Name : "Loading..."}
      </h5>
      {url && <video
        src={url}
        autoPlay
        loop
        controls
        playsInline
        style={{
          maxWidth: '100%',
          maxHeight: '85vh',
          objectFit: 'contain',
        }}
      />}
      {video && showPlayerIcons && <PlayerIcons seriesId={video.ID} />}
      <div style={{ height: '8vh' }}></div>
    </div>
  );
};

export default Recommend;
