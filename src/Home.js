import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardActionArea, CardContent, Modal, Box } from '@mui/material';
import { GetSeriesList } from './service';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentSeries, setCurrentSeries] = useState(null);

  const handleSeriesClick = (seriesItem) => {
    setCurrentSeries(seriesItem);
    setOpenModal(true);
  };

  const handleEpisodeClick = (seriesId, episodeNumber) => {
    navigate(`/player/${seriesId}/${episodeNumber}`);
  };

  useEffect(() => {
    GetSeriesList().then(data => {
      setSeries(data);
    });
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentSeries(null);
  };

  return (
    <div style={{ height: '90vh', overflow: 'auto' }}>
      <Grid container spacing={2}>
        {series.map((seriesItem) => (
          <Grid item xs={12} sm={6} md={4} key={seriesItem.id}>
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
          </Grid>
        ))}
      </Grid>

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
