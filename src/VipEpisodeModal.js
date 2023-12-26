import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Modal, Box, Button } from '@mui/material';
import VipButton from './VipButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CoinIcon from '@mui/icons-material/MonetizationOn';

const VipEpisodeModal = ({ open, onClose, bottom = 0 }) => {
  const navigate = useNavigate()
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="last-episode-modal-title"
      aria-describedby="last-episode-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        bottom: bottom,
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
        <Button sx={{
          position: 'absolute',
          top: 30,
          right: 35,
          color: '#fff',
        }}
        onClick={() => {
          navigate('/store')
        }}
        >
          <CoinIcon style={{ color: '#fa0', width: '20px', marginRight: '5px' }} />
          Store
          <ArrowForwardIosIcon style={{ width: '15px', marginLeft: '5px' }} />
        </Button>
        <h5 style={{ margin: '3px 20px' }}>
          Price: 1 Coins
        </h5>
        <h5 style={{ margin: '3px 20px' }}>
          Balance: 0 Coins
        </h5>
        <VipButton border={'2px solid #c70'} color={'#c70'} content1={'100 Coins'} content2={'+ 20 Coins'} content3={'$ 1.99'} />
        <VipButton border={'2px solid #fa0'} color={'#fa0'} content1={'200 Coins'} content2={'+ 50 Coins'} content3={'$ 3.99'} />
      </Box>
    </Modal>
  );
};

export default VipEpisodeModal;
