import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { GetSeries, GetVideo } from './service';

const Player = () => {
  const { seriesId, episodeNumber: episodeNumberStr } = useParams();
  const navigate = useNavigate();
  const episodeNumber = parseInt(episodeNumberStr, 10);
  const [user, setUser] = useState(null);
  const [videoSrc, setVideoSrc] = useState('');
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [error, setError] = useState('');

  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        if (videoElement.paused) {
          videoElement.play();
        }
      }
    };

    videoElement.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      videoElement.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

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
        setTotalEpisodes(seriesData.total_number);
      })
      .catch(err => setError('Error loading series data'));

    GetVideo(seriesId, episodeNumber)
      .then(videoUrl => {
        setVideoSrc(videoUrl);
      })
      .catch(err => setError('Error loading video'))
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
        ref={videoRef}
        src={videoSrc}
        loop 
        controls
        style={{
          maxWidth: '98%',
          maxHeight: '98vh',
          zIndex: '1',
        }}
      />
    </div>
  );
};

export default Player;
