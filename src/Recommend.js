import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { GetRecommendSeries, RecordHistory } from './service';
import { GetUser, SetHistory } from './cache';
import PlayerIcons from './PlayerIcons.js';
import SeriesName from './SeriesName.js';
import StopIcons from './StopIcons.js';
import Menu from './Menu.js';
import PlayerSlider from './PlayerSlider.js';

const Recommend = () => {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [showPlayerIcons, setShowPlayerIcons] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef(null)
  const [play, setPlay] = useState(true);

  const onVideo = () => {
    if (play) {
      videoRef.current.pause();
      setPlay(false)
      setShowPlayerIcons(true);
    }
    else {
      videoRef.current.play();
      setPlay(true)
    }
  }

  const onIcons = () => {
    setShowPlayerIcons(!showPlayerIcons);
  }

  const fetchRecommend = async () => {
    try {
      const series = await GetRecommendSeries();
      if (series) {
        setUrl(`${series.BaseURL}/1.mp4`);
        setVideo(series);
        setShowPlayerIcons(true);
        SetHistory(series.ID, 1);
        const user = GetUser()
        if (user) {
          RecordHistory(user.ID, parseInt(series.ID), 1)
        }
        videoRef.current.play().then(() => {
          setPlay(true);
        }).catch(() => {
          setPlay(false);
        });
      }
    } catch (error) {
      console.error('Error fetching recommend:', error);
    }
  };

  const handleTimeUpdate = () => {
    // console.log('当前播放时间', videoRef.current.currentTime);
    setCurrentTime(videoRef.current.currentTime)
  }

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

  // change currenttime
  const handleOnChangeTime = (value) => {
    videoRef.current.currentTime = value
  }

  return (
    <div {...handlers} style={{
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      zIndex: 20,
      backgroundColor: '#111',
    }}>
      {url && <video
        src={url}
        loop
        playsInline
        onClick={onIcons}
        onTimeUpdate={handleTimeUpdate}
        ref={videoRef}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />}
      {video && <StopIcons stop={play} click={onVideo} />}
      {video && showPlayerIcons && <SeriesName name={video.Name} />}
      {video && showPlayerIcons && <PlayerIcons seriesId={video.ID} />}
      {video && showPlayerIcons && <PlayerSlider currentTime={currentTime} allTime={video.TotalNumber} onChangeTime={handleOnChangeTime}/>}
      {showPlayerIcons && <Menu />}
    </div>
  );
};

export default Recommend;
