import React, { useState, useEffect } from 'react';
import { IconButton, Modal, Box } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StorageIcon from '@mui/icons-material/Storage';
import { RecordFavorites, GetSeries } from './service';
import { useNavigate } from 'react-router-dom';
import { GetUser } from './cache';

const PlayerIcons = ({ seriesId }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    setIsFavorited(false);
    const fetchSeries = async () => {
      try {
        const fetchedSeries = await GetSeries(seriesId);
        setSeries(fetchedSeries);
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    fetchSeries();
  }, [seriesId]);

  const clickFavorites = async () => {
    const user = GetUser();
    if (user) {
      try {
        await RecordFavorites(user.ID, parseInt(seriesId));
        setIsFavorited(!isFavorited);
      } catch (error) {
        console.error('Error recording favorite:', error);
      }
    }
  }

  const handleEpisodeClick = (user, episodeNumber) => {
    if (user?.VIP || episodeNumber < 5) {
      navigate(`/player/${seriesId}/${episodeNumber+1}`);
    }
  };

  const episodeList = series ? Array.from({ length: series.TotalNumber }).map((_, index) => {
    const user = GetUser();
    const isAccessible = user?.VIP || index < 5;
    return (
      <p
        key={index}
        style={{ cursor: isAccessible ? 'pointer' : 'not-allowed' }}
        onClick={() => isAccessible && handleEpisodeClick(user, index)}
      >
        Episode {index + 1} {index >= 5 && !user?.VIP && <span style={{ color: 'red' }}>VIP</span>}
      </p>
    );
  }) : null;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
        <IconButton style={{ fontSize: '2em' }}>
          <ShareIcon style={{ fontSize: 'inherit' }} />
        </IconButton>
        <IconButton onClick={clickFavorites} style={{ fontSize: '2em' }}>
          <FavoriteIcon style={{ fontSize: 'inherit', color: isFavorited ? 'red' : 'inherit' }} />
        </IconButton>
        <IconButton onClick={handleOpenModal} style={{ fontSize: '2em' }}>
          <StorageIcon style={{ fontSize: 'inherit' }} />
        </IconButton>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 250, maxHeight: '92vh', overflowY: 'auto', bgcolor: 'background.paper', boxShadow: 24, p: 4, }}>
          <div id="modal-modal-description">
            {episodeList}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PlayerIcons;
