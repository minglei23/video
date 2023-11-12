import React, { useState } from 'react';
import { Button, Typography, Container, Box, TextField } from '@mui/material';

const Profile = () => {
  const isLoggedIn = false;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("login ", email, password);
  };

  const renderLoginForm = () => {
    return (
      <Container>
        <Box textAlign="center" marginTop={4}>
          <Typography variant="h5">To Your Account</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ margin: '20px' }}
            >
              login
            </Button>
            <Button
              variant="outlined"
              color="primary">
              signin
            </Button>
          </form>
        </Box>
      </Container>
    );
  };

  const renderUserProfile = () => {
    return (
      <Container>
        <Box textAlign="center" marginTop={4}>
          <Typography variant="h5">Welcome</Typography>
        </Box>
      </Container>
    );
  };

  return (
    <div>
      {isLoggedIn ? renderUserProfile() : renderLoginForm()}
    </div>
  );
};

export default Profile;
