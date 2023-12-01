import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { GetSeries } from './service';

const Player = () => {
  const { seriesId, episodeNumber: episodeNumberStr } = useParams();
  const navigate = useNavigate();
  const episodeNumber = parseInt(episodeNumberStr, 10);
  const [user, setUser] = useState(null);
  const [videoSrc, setVideoSrc] = useState('');
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  useEffect(() => {
    if (episodeNumber > 2 && (!user || !user.Activated || !user.VIP)) {
      navigate('/profile');
      return;
    }

    setError('');

    GetSeries(seriesId)
      .then(seriesData => {
        setTotalEpisodes(seriesData.TotalNumber);
        setVideoSrc(`${seriesData.BaseURL}/${episodeNumber+1}.mp4`);
      })
      .catch(err => setError('Error loading series data'));
  }, [seriesId, episodeNumber, user, navigate]);

  const navigateToEpisode = useCallback((newEpisodeNumber) => {
    navigate(`/player/${seriesId}/${newEpisodeNumber}`);
  }, [seriesId, navigate]);

  const handlers = useSwipeable({
    onSwipedDown: () => {
      if (episodeNumber > 0) {
        navigateToEpisode(episodeNumber - 1);
      }
    },
    onSwipedUp: () => {
      if (episodeNumber < totalEpisodes - 1) {
        navigateToEpisode(episodeNumber + 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div {...handlers} style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      width: '100%',
    }}>
      <video
        src={videoSrc}
        autoPlay
        loop 
        controls
        playsInline
        style={{
          maxWidth: '98%',
          maxHeight: '98vh',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};

export default Player;
