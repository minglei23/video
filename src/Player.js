import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetSeries, RecordHistory } from './service';
import { useSwipeable } from 'react-swipeable';
import { GetUser } from './cache';
import PlayerIcons from './PlayerIcons.js';
import SeriesName from './SeriesName.js';
import StopIcons from './StopIcons.js';

const Player = () => {
  const navigate = useNavigate();
  const { seriesId, episode } = useParams();
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [showPlayerIcons, setShowPlayerIcons] = useState(true);

  const videoRef = useRef(null)
  const [play, setPlay] = useState(false);

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
        videoRef.current.play();
        setShowPlayerIcons(true);
        if (user) {
          RecordHistory(user.ID, parseInt(series.ID), parseInt(episode));
        }
      }
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  }, [seriesId, episode]);

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
        navigateToEpisode(episodeNumber + 1);
      }
    },
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
      {video && showPlayerIcons && <StopIcons stop={play} click={onVideo} />}
      {video && showPlayerIcons && <SeriesName name={`${video.Name} - ${episode}`} />}
      {video && showPlayerIcons && <PlayerIcons seriesId={video.ID} />}
      <div style={{ height: '8vh' }}></div>
    </div>
  );
};

export default Player;
