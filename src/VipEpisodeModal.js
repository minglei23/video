import React from 'react';
import { Modal, Box, Button } from '@mui/material';

const VipEpisodeModal = ({ open, onClose }) => {
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
        fontFamily: 'Poppins',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h5 style={{ margin: '3px 20px' }}>
          Price: 1 Coins
        </h5>
        <h5 style={{ margin: '3px 20px' }}>
          Balance: 0 Coins
        </h5>
        <Button
          style={{
            margin: '10px 20px',
            display: 'flex',
            alignItems: 'stretch',
            border: '2px solid #c70',
            borderRadius: '10px',
            padding: 0,
          }}
        >
          <div
            style={{
              width: '70%',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <h4 style={{ margin: '8px 0 0 0', color: '#fff', lineHeight: '1.2' }}>
              100 Coins
            </h4>
            <h5 style={{ margin: '0', color: '#c70', lineHeight: '1.2' }}>
              + 20 Coins
            </h5>
          </div>
          <div
            style={{
              width: '30%',
              backgroundColor: '#c70',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '0 5px 5px 0',
              height: '45px',
            }}
          >
            <h3 style={{ margin: '0', color: '#fff' }}>
              $ 1.99
            </h3>
          </div>
        </Button>
        <Button
          style={{
            margin: '10px 20px',
            display: 'flex',
            alignItems: 'stretch',
            border: '2px solid #fa0',
            borderRadius: '10px',
            padding: 0,
          }}
        >
          <div
            style={{
              width: '70%',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <h4 style={{ margin: '8px 0 0 0', color: '#fff', lineHeight: '1.2' }}>
              Become VIP
            </h4>
            <h5 style={{ margin: '0', color: '#fa0', lineHeight: '1.2' }}>
              Free for all series
            </h5>
          </div>
          <div
            style={{
              width: '30%',
              backgroundColor: '#fa0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '0 5px 5px 0',
              height: '45px',
            }}
          >
            <h3 style={{ margin: '0', color: '#fff' }}>
              $ 9.99
            </h3>
          </div>
        </Button>
      </Box>
    </Modal>
  );
};

export default VipEpisodeModal;
