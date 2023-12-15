import React from 'react';
import { Modal, Box } from '@mui/material';

const LastEpisodeModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="last-episode-modal-title"
      aria-describedby="last-episode-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxHeight: '50vh',
        bgcolor: '#333',
        p: 3,
        borderRadius: '50px 50px 0 0',
      }}>
        <h5 style={{ fontFamily: 'Poppins', color: '#fff', textAlign: 'center' }}>
          This is the last episode of the series.
        </h5>
      </Box>
    </Modal>
  );
};

export default LastEpisodeModal;
