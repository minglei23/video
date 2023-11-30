import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useSwipeable } from 'react-swipeable';
import { GetSeries, GetVideo } from './service';

const Player = () => {
  const { seriesId, episodeNumber: episodeNumberStr } = useParams();
  const navigate = useNavigate();
  const episodeNumber = parseInt(episodeNumberStr, 10);

  const [videoSrc, setVideoSrc] = useState('');
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
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
  }, [seriesId, episodeNumber]);

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
      <div>
        <ReactPlayer
          url={videoSrc}
          playing
          controls
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Player;
