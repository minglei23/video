import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from './service.js';
import { GetUser } from './cache';
import HistoryRows from './HistoryRows';
import NavBar from "./components/NavBar";

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
  const handleOnBack = () => {
    navigate(-1);
  };

  return (
    <div className='h-full flex flex-col'>
      <NavBar title="History" onBack={handleOnBack} />
      <div className='flex-1 overflow-y-auto overflow-x-hidden'>
        {list && <HistoryRows seriesList={list} handleSeriesClick={handleSeriesClick} />}
      </div>
      <div style={{ height: '4vh'}}></div>
    </div>
  );
};

export default History;
