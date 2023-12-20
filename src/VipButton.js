import React, { useState } from 'react';
import { Button, Modal } from '@mui/material';
import CheckoutBox from './CheckoutBox';

const VipButton = ({ border, color, content1, content2, content3 }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}
        style={{
          margin: '10px 20px',
          display: 'flex',
          alignItems: 'stretch',
          border: border,
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
            {content1}
          </h4>
          <h5 style={{ margin: '0', color: color, lineHeight: '1.2' }}>
            {content2}
          </h5>
        </div>
        <div
          style={{
            width: '30%',
            backgroundColor: color,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '0 5px 5px 0',
            height: '45px',
          }}
        >
          <h3 style={{ margin: '0', color: '#fff' }}>
            {content3}
          </h3>
        </div>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CheckoutBox content1={content1} content2={content2} content3={content3} />
      </Modal>
    </>
  );
};

export default VipButton;
