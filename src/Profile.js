import React, { useState, useEffect, useContext } from 'react';
import { Typography, Container, Box, Button, Modal, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Points from './Points';
import { UserContext } from './index.js'
import { GetUser } from './cache';

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  useEffect(() => {
    const storedUser = GetUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  const handleOpenVerifyModal = () => {
    setOpenVerifyModal(true);
  };

  const handleCloseVerifyModal = () => {
    setOpenVerifyModal(false);
  };

  const navigateToHistory = () => {
    navigate('/history');
  };

  const navigateToFavorites = () => {
    navigate('/favorites');
  };

  const renderVerifyEmailModal = () => (
    <Modal
      open={openVerifyModal}
      onClose={handleCloseVerifyModal}
      aria-labelledby="verify-email-modal-title"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 250, maxHeight: '100vh', overflowY: 'auto', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography id="verify-email-modal-title" variant="h6" component="h2">
          Please Verify Your Email
        </Typography>
        <Button onClick={handleOpenVerifyModal} style={{ marginTop: 20 }}>
          Verify Email
        </Button>
      </Box>
    </Modal>
  );

  const renderUserProfile = () => (
    <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
      <Points user={user} />
      <Grid container direction="column" alignItems="center" spacing={2}>
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
        {
          <Grid item>
            <Button variant="outlined" onClick={navigateToHistory} style={{ width: '200px' }}>
              History
            </Button>
          </Grid>
        }
        {
          <Grid item>
            <Button variant="outlined" onClick={navigateToFavorites} style={{ width: '200px' }}>
              Favorites
            </Button>
          </Grid>
        }
      </Grid>
      {renderVerifyEmailModal()}
    </Container>
  );

  return <div>{user ? renderUserProfile() : <Login />}</div>;
};

export default Profile;
