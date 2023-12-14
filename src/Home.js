import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetSeriesList } from './service';
import { GetHistory } from './cache';
import Carousel from './Carousel';
import SeriesRows from './SeriesRows';
import PopularList from './PopularList';
import ComingSoonList from './ComingSoonList';
import TrendingList from './TrendingList';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function Home() {
  const navigate = useNavigate();

  const [seriesByType, setSeriesByType] = useState({
    type1: [],
    type2: [],
    type3: []
  });

  useEffect(() => {
    GetSeriesList().then(data => {
      setSeriesByType(data);
    });
  }, []);

  const handleSeriesClick = (seriesItem) => {
    const history = GetHistory(seriesItem.ID);
    if (history) {
      navigate(`/player/${seriesItem.ID}/${history}`);
    } else {
      navigate(`/player/${seriesItem.ID}/1`);
    }
  };

  return (
    <div style={{ overflowY: 'auto', backgroundColor: '#111', color: 'white' }}>

      <Carousel seriesList={seriesByType['type1']} handleSeriesClick={handleSeriesClick} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(#444, #111)',
        padding: '10px',
        margin: '10px 0'
      }}>
        <EmojiEventsIcon style={{ color: '#fda' }} />
        <h3 style={{ fontWeight: 'bold', color: '#fda', margin: '0 10px' }}>Trending</h3>
      </div>
      <TrendingList seriesList={seriesByType['type1']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>New Release</h3>
      <PopularList seriesList={seriesByType['type2']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>Coming Soon</h3>
      <ComingSoonList seriesList={seriesByType['type3']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>Love After Marriage</h3>
      <PopularList seriesList={seriesByType['type1']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>Dating My Boss</h3>
      <PopularList seriesList={seriesByType['type2']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>Short Series</h3>
      <SeriesRows seriesList={seriesByType['type3']} handleSeriesClick={handleSeriesClick} />

      <div style={{ height: '8vh' }}></div>
    </div>
  );
}
