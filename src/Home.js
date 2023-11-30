import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardActionArea, CardContent, Modal, Box } from '@mui/material';
import { GetSeriesList } from './service';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [currentSeries, setCurrentSeries] = useState(null);

  const [seriesByType, setSeriesByType] = useState({
    popular: [],
    type1: [],
    type2: [],
    type3: []
  });
  
  useEffect(() => {
    GetSeriesList().then(data => {
      setSeriesByType(data);
    });
  }, []);
  

  const handleSeriesClick = (seriesItem) => {
    setCurrentSeries(seriesItem);
    setOpenModal(true);
  };

  const handleEpisodeClick = (seriesId, episodeNumber) => {
    navigate(`/player/${seriesId}/${episodeNumber}`);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentSeries(null);
  };

  const renderSeriesByType = (type) => {
    return (
      <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: '20px 0' }}>
        {seriesByType[type].map((seriesItem) => (
          <div style={{ display: 'inline-block', width: '250px', padding: '0 5px' }} key={seriesItem.id}>
            <Card>
              <CardActionArea onClick={() => handleSeriesClick(seriesItem)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={seriesItem.image}
                  alt={seriesItem.name}
                />
                <CardContent>
                  <h3>{seriesItem.name}</h3>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div style={{ height: '90vh', overflowY: 'auto', padding: '20px'}}>
      <h3>Popular</h3>
      {renderSeriesByType('popular')}
  
      <h3>Type 1</h3>
      {renderSeriesByType('type1')}
  
      <h3>Type 2</h3>
      {renderSeriesByType('type2')}
  
      <h3>Type 3</h3>
      {renderSeriesByType('type3')}
  

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 250, maxHeight: '90vh', overflowY: 'auto', bgcolor: 'background.paper', boxShadow: 24, p: 4, }}>
          <div id="modal-modal-description">
            {currentSeries?.total_number && Array.from({ length: currentSeries.total_number }).map((_, index) => (
              <p key={index} style={{ cursor: index < 3 ? 'pointer' : 'not-allowed' }} onClick={() => index < 3 && handleEpisodeClick(currentSeries.id, index)}>
                Episode {index + 1} {index >= 3 && <span style={{color: 'red'}}>VIP</span>}
              </p>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
