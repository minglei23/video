import React, { useState, useEffect } from 'react';
import { IconButton, Modal, Box } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import StorageIcon from '@mui/icons-material/Storage';
import { GetSeries } from './service';
import { GetUser } from './cache';
import SeriesInfo from './SeriesInfo';
import FavoritesIcon from './FavoritesIcon';
import copy from 'copy-to-clipboard';

const PlayerIcons = ({ seriesId, showVipMotal, seriesInfoBottom = 0 }) => {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);
  const [series, setSeries] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const user = GetUser();
        setUser(user);
        const fetchedSeries = await GetSeries(seriesId);
        setSeries(fetchedSeries);
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };
    fetchSeries();
  }, [seriesId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleShareClick = () => {
    const linkToCopy = `Click to watch the exciting series!\n${series?.Name}\nLink: http://18.188.120.153/player/${seriesId}/1`;
    copy(linkToCopy);
    alert('Link copied to clipboard!');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <div style={{
        position: 'absolute',
        right: 10,
        bottom: 240,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <IconButton onClick={handleShareClick}>
          <ShareIcon style={{ fontSize: '1.5em', color: '#fff' }} />
        </IconButton>
        <FavoritesIcon seriesId={seriesId} user={user} />
        <IconButton onClick={handleOpenModal}>
          <StorageIcon style={{ fontSize: '1.5em', color: '#fff' }} />
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
          bottom: seriesInfoBottom,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxHeight: '50vh',
          // overflowY: 'auto',
          bgcolor: '#333',
          p: 3,
          borderRadius: '50px 50px 0 0',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div className='flex-1 overflow-y-auto overflow-x-hidden'>
          <SeriesInfo user={user} series={series} showVipMotal={showVipMotal} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PlayerIcons;
