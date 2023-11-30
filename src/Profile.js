import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Button, Modal, Grid } from '@mui/material';
import Login from './Login';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleOpenVerifyModal = () => {
    setOpenVerifyModal(true);
  };

  const handleCloseVerifyModal = () => {
    setOpenVerifyModal(false);
  };

  const renderVerifyEmailModal = () => {
    return (
      <Modal
        open={openVerifyModal}
        onClose={handleCloseVerifyModal}
        aria-labelledby="verify-email-modal-title"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 250, bgcolor: 'background.paper', boxShadow: 24, p: 4, }}>
          <Typography id="verify-email-modal-title" variant="h6" component="h2">
            Please Verify Your Email
          </Typography>
          <Button onClick={handleOpenVerifyModal} style={{ marginTop: 20 }}>
            Verify Email
          </Button>
        </Box>
      </Modal>
    );
  };

  const renderUserProfile = () => {
    return (
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h5">Welcome, {user.Email}</Typography>
          </Grid>
          {!user.Activated && (
            <Grid item>
              <Button variant="contained" style={{ width: '200px' }}>
                Verify Email
              </Button>
            </Grid>
          )}
          {!user.VIP && (
            <Grid item>
              <Button variant="contained" onClick={handleOpenVerifyModal} style={{ width: '200px' }}>
                Become VIP
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button variant="outlined" onClick={handleOpenVerifyModal} style={{ width: '200px' }}>
              History
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleOpenVerifyModal} style={{ width: '200px' }}>
              Favorites
            </Button>
          </Grid>
        </Grid>
        {renderVerifyEmailModal()}
      </Container>
    );
  };

  return (
    <div>
      {user ? renderUserProfile() : <Login />}
    </div>
  );
};

export default Profile;
