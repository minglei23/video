import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { recordFavorites, removeFavorites } from './service';
import { SetFavorites, RemoveFavorites, GetFavorites } from './cache';

const FavoritesIcons = ({ seriesId, user }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const favorite = GetFavorites(seriesId)
      setIsFavorited(favorite)
    };
    fetch();
  }, [seriesId]);

  const clickFavorites = async () => {
    setIsFavorited(!isFavorited);
    if (isFavorited) {
      RemoveFavorites(seriesId)
      if (user) {
        try {
          await removeFavorites(user.ID, parseInt(seriesId));
        } catch (error) {
          console.error('Error removing favorite:', error);
        }
      }
    } else {
      SetFavorites(seriesId)
      if (user) {
        try {
          await recordFavorites(user.ID, parseInt(seriesId));
        } catch (error) {
          console.error('Error recording favorite:', error);
        }
      }
    }
  };

  return (
    <IconButton onClick={clickFavorites} >
      <StarIcon style={{ fontSize: '1.5em', color: isFavorited ? '#fa0' : '#fff' }} />
    </IconButton>
  );
};

export default FavoritesIcons;
