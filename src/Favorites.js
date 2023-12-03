import React, { useState, useContext, useEffect } from 'react';
import { Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { UserContext } from './index.js';
import { useNavigate } from 'react-router-dom';
import { GetFavorites } from './service.js';

const Favorites = () => {
  const { user } = useContext(UserContext);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteList = async () => {
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
  }, [user]);

  return (
    <div style={{ height: '90vh', overflowY: 'auto', padding: '20px' }}>
      <Typography id="list-modal-title" variant="h6" component="h2" align="center">
        Favorites
      </Typography>
      <List>
        {list.map((item) => (
          <ListItem key={item.ID}>
            <img src={`${item.BaseURL}/image.jpg`} alt={item.Name} style={{maxWidth: '50px', height: 'auto'}} />
            <ListItemText primary={item.Name} primaryTypographyProps={{ align: 'center' }} />
            <Button onClick={() => navigate(`/player/${item.ID}/0`)}>
              Play
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Favorites;
