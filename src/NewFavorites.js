import React, { useState, useEffect } from 'react';
import { Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GetFavorites } from './service.js';
import { GetUser } from './cache';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const NewFavorites = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteList = async () => {
      const user = GetUser()
      if (user) {
        try {
          const response = await GetFavorites(user.ID);
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
            <Button
              style={{
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
              }}
              onClick={() => navigate(`/series/${item.ID}`)}
            >
              <img src={`${item.BaseURL}/image.jpg`} alt={item.Name} style={{ maxWidth: '50px', height: 'auto' }} />
              <ListItemText primary={item.Name} style={{ textAlign: 'center', flex: 1 }} />
              <ArrowForwardIosIcon />
            </Button>
          </ListItem>
        ))}
      </List>
      <div style={{ height: '8vh' }}></div>
    </div>
  );
};

export default NewFavorites;
