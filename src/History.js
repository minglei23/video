import React, { useState, useEffect } from 'react';
import { Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GetHistory } from './service.js';
import { GetUser } from './cache';

const History = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      const user = GetUser()
      if (user) {
        try {
          const response = await GetHistory(user.ID);
          setList(response.HistoryList);
        } catch (error) {
          console.error('Error fetching history:', error);
        }
      }
    };
    fetchHistory();
  }, []);

  return (
    <div style={{ overflowY: 'auto', padding: '20px' }}>
      <Typography id="list-modal-title" variant="h6" component="h2" align="center">
        History
      </Typography>
      <List>
        {list && list.map((item) => (
          <ListItem key={item.ID}>
            <img src={`${item.BaseURL}/image.jpg`} alt={item.Name} style={{ maxWidth: '50px', height: 'auto' }} />
            <ListItemText primary={item.Name} primaryTypographyProps={{ align: 'center' }} />
            <Button style={{ color: '#fa0' }} onClick={() => navigate(`/player/${item.ID}/${item.Episode}`)}>
              {`Episode ${item.Episode}`}
            </Button>
          </ListItem>
        ))}
      </List>
      <div style={{ height: '8vh' }}></div>
    </div>
  );
};

export default History;
