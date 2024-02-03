import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

export default function Notice({ open, onClose, word }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: '#222',
          color: '#fa0',
          opacity: 0.8
        },
      }}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{ color: '#fff' }}>
          {word}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}
