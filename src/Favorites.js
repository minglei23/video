import React, { useState, useEffect } from 'react';
import { Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getFavorites } from './service.js';
import { GetUser } from './cache';

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

  return (
    <div style={{ height: '92vh', overflowY: 'auto', padding: '20px' }}>
      <Typography id="list-modal-title" variant="h6" component="h2" align="center">
        Favorites
      </Typography>
      <List>
        {list && list.map((item) => (
          <ListItem key={item.ID}>
            <img src={`${item.BaseURL}/image.jpg`} alt={item.Name} style={{ maxWidth: '50px', height: 'auto' }} />
            <ListItemText primary={item.Name} primaryTypographyProps={{ align: 'center' }} />
            <Button style={{ color: '#d80' }} onClick={() => navigate(`/player/${item.ID}/1`)}>
              Play
            </Button>
          </ListItem>
        ))}
      </List>
      <div style={{ height: '8vh' }}></div>
    </div>
  );
};

export default Favorites;
