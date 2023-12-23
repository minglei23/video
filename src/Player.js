import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetSeries, RecordHistory } from './service';
import { SetHistory } from './cache';
import { useSwipeable } from 'react-swipeable';
import { GetUser } from './cache';
import PlayerIcons from './PlayerIcons.js';
import PlayerSlider from './PlayerSlider.js';
import SeriesName from './SeriesName.js';
import StopIcons from './StopIcons.js';
import Menu from './Menu.js';
import LastEpisodeModal from './LastEpisodeModal.js';
import VipEpisodeModal from './VipEpisodeModal.js';

const Player = () => {
  let timer = null;
  const navigate = useNavigate();
  const { seriesId, episode } = useParams();
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [showPlayerIcons, setShowPlayerIcons] = useState(true);
  const [lastEpisodeModal, setLastEpisodeModal] = useState(false);
  const [vipEpisodeModal, setVipEpisodeModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef(null)
  const [play, setPlay] = useState(true);

  const onVideo = () => {
    if (play) {
      videoRef.current.pause();
      setPlay(false)
      setShowPlayerIcons(true);
      clearInterval(timer);
    }
    else {
      videoRef.current.play();
      setPlay(true)
      onTimeUpdate();
    }
  }

  const onIcons = () => {
    setShowPlayerIcons(!showPlayerIcons);
  }

  const fetchVideo = useCallback(async () => {
    try {
      const user = GetUser();
      const series = await GetSeries(seriesId);
      if (series) {
        setUrl(`${series.BaseURL}/${episode}.mp4`);
        setTotalEpisodes(series.TotalNumber);
        setVideo(series);
        console.log('series',series);
        setShowPlayerIcons(true);
        SetHistory(series.ID, episode);
        if (user) {
          RecordHistory(user.ID, parseInt(series.ID), parseInt(episode));
        }
        videoRef.current.play().then(() => {
          setPlay(true);
          onTimeUpdate();
        }).catch(() => {
          setPlay(false);
        });
      }
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  }, [seriesId, episode]);

  const onTimeUpdate = () => {
    if(timer){
      clearInterval(timer);
    }
    timer = setInterval(()=>{
      if(videoRef.current.currentTime < video.TotalNumber){
        setCurrentTime(videoRef.current.currentTime);
      }else{
        clearInterval(timer);
      }
    },1000)
  }

  useEffect(() => {
    const user = GetUser();
    if (parseInt(episode) <= 5 || (user && user.VIP)) {
      fetchVideo();
    } else {
      navigate('/profile');
    }
  }, [seriesId, episode, navigate, fetchVideo]);

  const navigateToEpisode = useCallback((newEpisode) => {
    navigate(`/player/${seriesId}/${newEpisode}`);
  }, [seriesId, navigate]);

  const handlers = useSwipeable({
    onSwiped: () => setShowPlayerIcons(false),
    onSwipedDown: () => {
      const episodeNumber = parseInt(episode);
      if (episodeNumber > 1) {
        navigateToEpisode(episodeNumber - 1);
      }
    },
    onSwipedUp: () => {
      const episodeNumber = parseInt(episode);
      if (episodeNumber < totalEpisodes) {
        if (episodeNumber < 5) {
          navigateToEpisode(episodeNumber + 1);
        } else {
          const user = GetUser();
          if (user && user.VIP) {
            navigateToEpisode(episodeNumber + 1);
          } else {
            setVipEpisodeModal(true);
          }
        }
      } else {
        setLastEpisodeModal(true);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

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
        ref={videoRef}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />}
      {video && <StopIcons stop={play} click={onVideo} />}
      {video && showPlayerIcons && <SeriesName name={`${video.Name} - ${episode}`} />}
      {video && showPlayerIcons && <PlayerIcons seriesId={video.ID} showVipMotal={() => setVipEpisodeModal(true)} />}
      {video && showPlayerIcons && <PlayerSlider currentTime={currentTime} allTime={video.TotalNumber} />}
      {showPlayerIcons && <Menu />}
      <LastEpisodeModal open={lastEpisodeModal} onClose={() => setLastEpisodeModal(false)} />
      <VipEpisodeModal open={vipEpisodeModal} onClose={() => setVipEpisodeModal(false)} />
    </div>
  );
};

export default Player;
