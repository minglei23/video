import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { GetSeries, RecordFavorites, RecordHistory } from './service';
import { Button } from '@mui/material';

const Player = () => {
  const { seriesId, episodeNumber: episodeNumberStr } = useParams();
  const navigate = useNavigate();
  const episodeNumber = parseInt(episodeNumberStr, 10);
  const [videoSrc, setVideoSrc] = useState('');
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [error, setError] = useState('');
  const [userID, setUserID] = useState(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    const checkAccess = (user) => {
      if (user && user.Activated) {
        setUserID(user.ID)
        setVerified(true)
      }
      return episodeNumber <= 2 || (user && user.VIP);
    };

    const fetchSeries = () => {
      GetSeries(seriesId)
        .then(seriesData => {
          setTotalEpisodes(seriesData.TotalNumber);
          setVideoSrc(`${seriesData.BaseURL}/${episodeNumber + 1}.mp4`);
        })
        .catch(err => setError('Error loading series data'));
      if (verified) {
        RecordHistory(userID, parseInt(seriesId), parseInt(episodeNumber))
          .catch((error) => {
            console.error('Error Record History:', error);
          });
      }
    };

    if (checkAccess(JSON.parse(storedUser))) {
      fetchSeries();
    } else {
      navigate('/profile');
    }
  }, [seriesId, episodeNumber, navigate]);

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

  const handleCollectSeries = () => {
    if (userID && verified) {
      RecordFavorites(userID, parseInt(seriesId))
        .then(() => {
          setVerified(false);
        })
        .catch((error) => {
          console.error('Error Record Favorites:', error);
        });
    }
  };

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
      {verified && (
        <Button
          variant="contained"
          onClick={handleCollectSeries}
          style={{ position: 'absolute', right: 20, bottom: 100 }}>
          Collect Series
        </Button>
      )}
    </div>
  );
};

export default Player;
