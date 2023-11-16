import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    GetSeries(seriesId).then(seriesData => {
      setTotalEpisodes(seriesData.total_number);
    });

    GetVideo(seriesId, episodeNumber).then(videoUrl => {
      setVideoSrc(videoUrl);
    });
  }, [seriesId, episodeNumber]);

  const handlers = useSwipeable({
    onSwipedDown: () => {
      if (episodeNumber > 0) {
        navigate(`/player/${seriesId}/${episodeNumber - 1}`);
      }
    },
    onSwipedUp: () => {
      if (episodeNumber < totalEpisodes - 1) {
        navigate(`/player/${seriesId}/${episodeNumber + 1}`);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      width: '100%',
    }}>
      <ReactPlayer
        url={videoSrc}
        playing
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Player;
