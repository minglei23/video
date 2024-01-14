import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Modal, Box, Button } from '@mui/material';
import VipButton from './VipButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CoinIcon from '@mui/icons-material/MonetizationOn';
import { GetEpisode, GetUser, SetEpisode } from "./cache";
import { GetPoints, unlockEpisode } from './service.js';

const VipEpisodeModal = ({ videoId, episode, open, onClose, bottom = 0 }) => {
  const navigate = useNavigate()
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const user = GetUser()
      if (user) {
        const point = await GetPoints(user.ID);
        setPoints(point)
      }
    };

    loadData();
  }, []);

  const getCoins = () => {
    navigate('/profile')
  }

  const unlock = async () => {
    const user = GetUser()
    if (user) {
      try {
        const response = await unlockEpisode(user.ID, videoId, episode)
        const list = GetEpisode(videoId) || []
        const newList = [...list, episode]
        SetEpisode(videoId, newList)
        navigate(`/player/${videoId}/${episode}`)
        onClose()
      } catch (error) {
        console.error('Error Unlock:', error);
      }
    }
  }

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
        borderRadius: '10px 10px 0 0',
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
          {`Next: Episode ${episode}`}
        </h5>
        <h5 style={{ margin: '3px 20px' }}>
          Balance: {points} Coins
        </h5>
        {points < 2 && <VipButton click={getCoins} words={'Get More Coins'} />}
        {points >= 2 && <VipButton click={unlock} words={'Buy this Episode'} />}
      </Box>
    </Modal>
  );
};

export default VipEpisodeModal;
