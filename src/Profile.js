import React, { useContext } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { UserContext } from './index.js';
import Login from './Login';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  // user has ID (int), Email (string), Activated (bool), VIP (bool)

  const renderUserProfile = () => {
    return (
      <Container>
        <Box textAlign="center" marginTop={4}>
          <Typography variant="h5">Welcome, {user.Email}</Typography>
        </Box>
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
