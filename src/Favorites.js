import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavorites } from './service.js';
import { GetUser, GetHistory } from './cache';
import FavoritesRows from './FavoritesRows';
import NavBar from "./components/NavBar";

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
  const handleOnBack = () => {
    navigate(-1);
  };
  return (
    <div className='h-full flex flex-col'>
      <NavBar title="Favorites" onBack={handleOnBack} />
      <div className='flex-1 overflow-y-auto overflow-x-hidden'>
        {list && <FavoritesRows seriesList={list} handleSeriesClick={handleSeriesClick} />}
      </div>
      <div style={{ height: '4vh'}}></div>
    </div>
  );
};

export default Favorites;
