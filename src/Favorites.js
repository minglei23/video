import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getFavorites } from './service.js';
import { GetUser, GetHistory } from './cache';
import FavoritesRows from './FavoritesRows';

const Favorites = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteList = async () => {
      const user = GetUser()
      if (user) {
        try {
          const response = await getFavorites(user.ID);
          setList(response.FavoritesList);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };
    fetchFavoriteList();
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
    <div style={{ position: 'absolute', height: '92vh', overflowY: 'auto', backgroundColor: '#111', padding: '20px'}}>
      <Typography id="list-modal-title" variant="h6" component="h2" align="center" marginBottom={"10px"}>
        Favorites
      </Typography>
      {list && <FavoritesRows seriesList={list} handleSeriesClick={handleSeriesClick} />}
    </div>
  );
};

export default Favorites;
