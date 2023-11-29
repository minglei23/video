import React, { useState, useContext } from 'react';
import { Typography, Container, Box, Button, Modal } from '@mui/material';
import { UserContext } from './index.js';
import Login from './Login';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

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
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, }}>
          <Typography id="verify-email-modal-title" variant="h6" component="h2">
            Please Verify Your Email
          </Typography>
          <Button onClick={handleCloseVerifyModal} style={{ marginTop: 20 }}>
            Verify Email
          </Button>
          <Button onClick={handleCloseVerifyModal} style={{ marginTop: 20 }}>
            Close
          </Button>
        </Box>
      </Modal>
    );
  };

  const renderUserProfile = () => {
    return (
      <Container>
        <Box textAlign="center" marginTop={4}>
          <Typography variant="h5">Welcome, {user.Email}</Typography>
          {!user.Activated && (
            <Button variant="contained" onClick={handleOpenVerifyModal} style={{ margin: 2 }}>
              Verify Email
            </Button>
          )}
          {!user.VIP && (
            <Button variant="contained" onClick={handleOpenVerifyModal} style={{ margin: 2 }}>
              Become VIP
            </Button>
          )}
          <Button variant="contained" onClick={handleOpenVerifyModal} style={{ margin: 2 }}>
            History
          </Button>
          <Button variant="contained" onClick={handleOpenVerifyModal} style={{ margin: 2 }}>
            Favorites
          </Button>
        </Box>
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
