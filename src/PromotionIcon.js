import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { GetUser } from './cache';

export default function PromotionIcon() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1000);
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
    width: 350,
    height: 50,
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              backgroundImage: 'linear-gradient(to right, #502, #205)',
              borderRadius: '5px'
            }}
            onClick={handlePromotionClick}
          >
            <h1 style={{ margin: '10px', fontWeight: 'bold', fontSize: '18px', color: 'white' }}>First Time Promotion</h1>
            <div style={{
              position: 'absolute',
              top: 20,
              right: 50,
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
