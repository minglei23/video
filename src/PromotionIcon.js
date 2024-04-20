import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { GetUser } from './cache';

export default function PromotionIcon() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePromotionClick = () => {
    handleClose();
    const storedUser = GetUser();
    if (storedUser) {
      navigate(`/promotion`);
    } else {
      navigate(`/profile`);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    bgcolor: 'transparent',
    border: 'none',
    boxShadow: 0,
    p: 4,
    outline: 'none',
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} onClick={e => e.stopPropagation()}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 25,
              top: 25,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backgroundImage: 'linear-gradient(to right, #205, #502)',
              borderRadius: '5px',
            }}
            onClick={handlePromotionClick}
          >
            <h1 style={{ margin: '10px', fontWeight: 'bold', fontSize: '18px', color: 'white' }}>First Time Promotion</h1>
            <Button
              variant="outlined"
              onClick={handlePromotionClick}
              style={{ color: 'white', borderColor: '#f35', width: '75%', height: '40px', borderRadius: '12px', textTransform: 'none' }}
            >
              Let's go!
            </Button>
            <div style={{
              position: 'absolute',
              top: 25,
              left: 50,
              backgroundColor: '#f35',
              color: 'white',
              padding: '3px 6px',
              fontSize: '12px',
              fontWeight: 'bold',
              zIndex: 100,
              borderRadius: '5px'
            }}>
              Up to 88% Off
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
