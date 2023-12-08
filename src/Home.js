import React, { useState, useEffect } from 'react';
import { Modal, Box } from '@mui/material';
import { GetSeriesList } from './service';
import { GetUser } from './cache';
import SeriesInfo from './SeriesInfo';
import Carousel from './Carousel';
import SeriesList from './SeriesList';
import SearchBar from './SearchBar';
import PopularList from './PopularList';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [currentSeries, setCurrentSeries] = useState(null);
  const [user, setUser] = useState(null);

  const [seriesByType, setSeriesByType] = useState({
    type1: [],
    type2: [],
    type3: []
  });

  useEffect(() => {
    setUser(GetUser)
  }, []);

  useEffect(() => {
    GetSeriesList().then(data => {
      setSeriesByType(data);
    });
  }, []);

  const handleSeriesClick = (seriesItem) => {
    setCurrentSeries(seriesItem);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentSeries(null);
  };

  return (
    <div style={{ height: '92vh', overflowY: 'auto', backgroundColor: '#111', color: 'white', paddingBottom: '60px' }}>

      <SearchBar />

      <Carousel seriesList={seriesByType['type1']} handleSeriesClick={handleSeriesClick} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(#431, #111)',
        padding: '10px',
        margin: '10px 0'
      }}>
        <EmojiEventsIcon style={{ color: '#fc5' }} />
        <h3 style={{ fontWeight: 'bold', color: '#fc5', margin: '0 10px' }}>Popular</h3>
      </div>
      <PopularList seriesList={seriesByType['type1']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>Short Series</h3>
      <SeriesList seriesList={seriesByType['type2']} handleSeriesClick={handleSeriesClick} />

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>Chinese Series</h3>
      <SeriesList seriesList={seriesByType['type3']} handleSeriesClick={handleSeriesClick} />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 210,
          maxHeight: '80vh',
          overflowY: 'auto',
          bgcolor: '#111',
          border: '1px solid #a70',
          borderRadius: '10px',
          color: 'white',
          boxShadow: 24,
          p: 4
        }}>
          <div id="modal-modal-description">
            <SeriesInfo user={user} series={currentSeries} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
