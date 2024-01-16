import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { SearchSeries } from './service';
import { GetHistory } from './cache';
import SeriesRows from './SeriesRows';
import SearchBar from './SearchBar';

const Search = () => {
  const navigate = useNavigate();

  const { searchTerm } = useParams();
  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    const performSearch = async () => {
      const results = await SearchSeries(searchTerm);
      setSeriesList(results);
    };

    performSearch();
  }, [searchTerm]);

  const handleSeriesClick = (seriesItem) => {
    const history = GetHistory(seriesItem.ID);
    if (history) {
      navigate(`/player/${seriesItem.ID}/${history}`);
    } else {
      navigate(`/player/${seriesItem.ID}/1`);
    }
  };

  const onBack = () => {
    navigate('/home')
  }

  return (
    <div className='flex flex-col' style={{ height: '100%', overflowY: 'auto', backgroundColor: '#111', color: 'white' }}>
      <div className='h-[44px] flex items-center px-4'>
        <ArrowBackIosIcon onClick={onBack} fontSize="small" />
        <div className='flex-1'><SearchBar /></div>
      </div>
      <main className='flex-1 pb-4'>
        <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>Search Results</h3>
        <SeriesRows seriesList={seriesList} handleSeriesClick={handleSeriesClick} />
      </main>
    </div>
  );
}

export default Search;
