import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetSeries, RecordHistory } from './service';
import { useSwipeable } from 'react-swipeable';
import { GetUser } from './cache';
import PlayerIcons from './PlayerIcons.js';

const Player = () => {
  const navigate = useNavigate();
  const { seriesId, episode } = useParams();
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
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
      <h5 style={{ height: '4vh', lineHeight: '4vh', fontSize: '2vh', margin: 0, padding: 0 }}>
        {video ? `${video.Name} - ${episode}` : "Loading..."}
      </h5>
      {url && <video
        src={url}
        loop
        playsInline
        onClick={onVideo}
        ref={videoRef}
        style={{
          maxWidth: '100%',
          maxHeight: '80vh',
          objectFit: 'contain',
        }}
      />}
      {video && showPlayerIcons && <PlayerIcons seriesId={video.ID} />}
      <div style={{ height: '8vh' }}></div>
    </div>
  );
};

export default Player;
