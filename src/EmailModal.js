import React from 'react';
import { Modal, Box } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const EmailModal = ({ open, onClose, message }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={style}>
        <div className="flex flex-col items-center justify-center">
          <p style={{ color: 'black' }}>{message}</p>
        </div>
      </Box>
    </Modal>
  );
};

export default EmailModal;
