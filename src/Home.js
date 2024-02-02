import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetSeriesList } from './service';
import { GetHistory } from './cache';
import Carousel from './Carousel';
import SeriesRows from './SeriesRows';
import PopularList from './PopularList';
import TrendingList from './TrendingList';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { action, ancient, billionaires, love, popular, revenge, short, trending } from './word';

export default function Home() {
  const navigate = useNavigate();

  const [seriesByType, setSeriesByType] = useState({
    type1: [],
    type2: [],
    type3: [],
    type4: [],
    type5: [],
    type6: [],
    type7: [],
    type8: [],
    type9: [],
  });

  const getCountryCodeFromIP = async () => {
    try {
      const response = await fetch('https://api.ip.sb/geoip', {
        headers: {
          'Accept': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      return data.country_code;
    } catch (error) {
      console.error('Error fetching user country code:', error);
      return null;
    }
  };

  const setLanguage = async () => {
    let language = localStorage.getItem("language");
    if (!language) {
      const countryCode = await getCountryCodeFromIP() || "EN";
      switch (countryCode) {
        case "CN":
        case "TW":
        case "HK":
          language = "CN";
          break;
        case "VN":
          language = "VN";
          break;
        case "TH":
          language = "TH";
          break;
        case "PH":
          language = "TL";
          break;
        case "AE":
          language = "AE";
          break;
        case "ID":
          language = "ID";
          break;
        case "MY":
          language = "MS";
          break;
        case "CA":
          language = "CN";
          break;
        default:
          language = "EN";
      }
      localStorage.setItem("language", language);
    }
  };

  useEffect(() => {
    setLanguage()
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

      <Carousel seriesList={seriesByType['type5']} handleSeriesClick={handleSeriesClick} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(#444, #111)',
        padding: '10px',
        margin: '10px 0'
      }}>
        <EmojiEventsIcon style={{ color: '#fda' }} />
        <h3 style={{ fontWeight: 'bold', color: '#fda', margin: '0 10px' }}>{trending()}</h3>
      </div>
      <TrendingList seriesList={seriesByType['type9']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>{popular()}</h3>
      <PopularList seriesList={seriesByType['type6']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>{revenge()}</h3>
      <PopularList seriesList={seriesByType['type3']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>{ancient()}</h3>
      <PopularList seriesList={seriesByType['type5']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>{billionaires()}</h3>
      <PopularList seriesList={seriesByType['type6']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>{action()}</h3>
      <PopularList seriesList={seriesByType['type7']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>{love()}</h3>
      <PopularList seriesList={seriesByType['type9']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>{short()}</h3>
      <SeriesRows seriesList={[
        ...seriesByType['type1'],
        ...seriesByType['type2'],
        ...seriesByType['type4'],
        ...seriesByType['type8'],
      ]} handleSeriesClick={handleSeriesClick} />

      <div style={{ height: '8vh' }}></div>
    </div>
  );
}
