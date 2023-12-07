import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SeriesInfo({user, series}) {

  const navigate = useNavigate();

  const handleEpisodeClick = (seriesId, episodeNumber) => {
    if (user?.VIP || episodeNumber < 5) {
      navigate(`/player/${seriesId}/${episodeNumber + 1}`);
    }
  };

  if (!series?.TotalNumber) return null;
  const image = series.BaseURL + '/image.jpg'

  return <div>
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <img src={image} alt="Series Cover" style={{ maxWidth: '100px', height: 'auto' }} />
    </div>
    {Array.from({ length: series.TotalNumber }).map((_, index) => {
      const isAccessible = user?.VIP || index < 5;
      return (
        <p
          key={index}
          style={{ cursor: isAccessible ? 'pointer' : 'not-allowed' }}
          onClick={() => isAccessible && handleEpisodeClick(series.ID, index)}
        >
          Episode {index + 1} {index >= 5 && !user?.VIP && <span style={{ color: '#fa0' }}>VIP</span>}
        </p>
      );
    })}
  </div>
}
