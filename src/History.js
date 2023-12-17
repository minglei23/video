import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getHistory } from './service.js';
import { GetUser } from './cache';
import HistoryRows from './HistoryRows';

const History = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      const user = GetUser()
      if (user) {
        try {
          const response = await getHistory(user.ID);
          setList(response.HistoryList);
        } catch (error) {
          console.error('Error fetching history:', error);
        }
      }
    };
    fetchHistory();
  }, []);

  const handleSeriesClick = (seriesItem) => {
    navigate(`/player/${seriesItem.ID}/${seriesItem.Episode}`);
  };

  return (
    <div style={{ position: 'absolute', height: '92vh', width: '100%', overflowY: 'auto', backgroundColor: '#111' }}>
      <Typography id="list-modal-title" variant="h6" component="h2" align="center" margin={"10px"}>
        History
      </Typography>
      {list && <HistoryRows seriesList={list} handleSeriesClick={handleSeriesClick} />}
      <div style={{ height: '8vh' }}></div>
    </div>
  );
};

export default History;
