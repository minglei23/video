import React, { useState, useEffect } from 'react';
import { IconButton, Modal, Box } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StorageIcon from '@mui/icons-material/Storage';
import { RecordFavorites, GetSeries } from './service';
import { GetUser } from './cache';
import SeriesInfo from './SeriesInfo';

const PlayerIcons = ({ seriesId }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);
  const [series, setSeries] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const fetchedSeries = await GetSeries(seriesId);
        setSeries(fetchedSeries);
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };
    fetchSeries();
    setTimeout(() => {
      setIsVisible(true);
    }, 500);

  }, [seriesId]);

  if (!isVisible) return null;

  const clickFavorites = async () => {
    const user = GetUser();
    if (user) {
      try {
        setUser(user)
        await RecordFavorites(user.ID, parseInt(seriesId));
        setIsFavorited(!isFavorited);
      } catch (error) {
        console.error('Error recording favorite:', error);
      }
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div>
      <div style={{
        position: 'absolute',
        right: 10,
        bottom: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <IconButton style={{ fontSize: '2em', color: '#fff' }}>
          <ShareIcon />
        </IconButton>
        <IconButton onClick={clickFavorites} style={{ fontSize: '2em', color: '#fff' }}>
          <FavoriteIcon style={{ color: isFavorited ? 'red' : '#fff' }} />
        </IconButton>
        <IconButton onClick={handleOpenModal} style={{ fontSize: '2em', color: '#fff' }}>
          <StorageIcon />
        </IconButton>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxHeight: '50vh',
          overflowY: 'auto',
          bgcolor: '#333',
          p: 3,
          borderRadius: '50px 50px 0 0',
        }}>
          <SeriesInfo user={user} series={series} />
        </Box>
      </Modal>
    </div>
  );
};

export default PlayerIcons;
