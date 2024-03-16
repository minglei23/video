import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetSeriesList } from './service';
import { GetHistory } from './cache';
import Carousel from './Carousel';
import SeriesRows from './SeriesRows';
import PopularList from './PopularList';
import TrendingList from './TrendingList';
import { SetLanguage, action, ancient, billionaires, love, popular, revenge, short, trending } from './word';

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
      return data.country_code;
    } catch (error) {
      console.error('Error fetching user country code:', error);
      return null;
    }
  };

  const setLanguage = async () => {
    const getCookie = (name) => {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    };

    let language = localStorage.getItem("language");
    if (language) {
      return
    }

    language = getCookie("language");
    if (language) {
      localStorage.setItem("language", language);
      return
    }
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
    SetLanguage(language);
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
    <div style={{ overflowY: 'auto', backgroundColor: '#101015', color: 'white' }}>

      <Carousel seriesList={seriesByType['type5']} handleSeriesClick={handleSeriesClick} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `linear-gradient(rgba(16, 16, 21, 0) 0%, #101015 100%), url("/image/popular.png")`,
        backgroundSize: 'cover',
        padding: '10px',
        marginTop: '10px'
      }}>
        <img src="/image/cup.png" style={{ maxHeight: '17px', paddingLeft: '5px' }} />
        <h3 style={{ fontWeight: 'bold', margin: '0 10px' }}>{trending()}</h3>
      </div>
      <TrendingList seriesList={seriesByType['type9']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', padding: '10px' }}>{popular()}</h3>
      <PopularList seriesList={seriesByType['type6']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', padding: '10px' }}>{revenge()}</h3>
      <PopularList seriesList={seriesByType['type3']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', padding: '10px' }}>{ancient()}</h3>
      <PopularList seriesList={seriesByType['type5']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', padding: '10px' }}>{billionaires()}</h3>
      <PopularList seriesList={seriesByType['type6']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', padding: '10px' }}>{action()}</h3>
      <PopularList seriesList={seriesByType['type7']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', padding: '10px' }}>{love()}</h3>
      <PopularList seriesList={seriesByType['type9']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', padding: '10px' }}>{short()}</h3>
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
