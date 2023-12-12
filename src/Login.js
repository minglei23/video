import React, { useState, useContext } from 'react';
import { Button, Typography, Container, Box, Grid, Snackbar } from '@mui/material';
import AuthForm from './AuthForm';

import { UserContext } from './index.js';
import { loginTest } from './service';
import { SetUser } from './cache';

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
  };

  const handleClick = async (event) => {
    try {
      const userData = await loginTest();
      setUser(userData);
      SetUser(userData);
    } catch (error) {
      setError(error.message);
      console.error('loginTest failed:', error);
    }
  };

  return (
    <div style={{ backgroundImage: 'url("/image/login.png")', backgroundSize: 'cover' }}>
      <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', height: '92vh' }}>
        <Box textAlign="center" marginTop={8}>
          <Typography variant="h5" margin={"25px"}>{isLoginView ? 'Login' : 'Sign Up'}</Typography>
          <AuthForm isLogin={isLoginView} setError={setError} />
          <Grid container justifyContent="center" style={{ marginTop: 20 }}>
            <Button variant="outlined" onClick={toggleView} style={{ width: '200px', color: '#fff', borderColor: '#fa0' }}>
              {isLoginView ? 'Go to Sign Up' : 'Go to Login'}
            </Button>
          </Grid>
          {error && (
            <Snackbar
              open={Boolean(error)}
              autoHideDuration={6000}
              onClose={() => setError('')}
              message={error}
            />
          )}
          <Typography variant="body2" style={{ margin: '50px 0px 0px 15px', textAlign: 'left' }}>
            or continue with
          </Typography>
          <Grid container >
            <Grid item>
              <Button onClick={handleClick}>
                <img src="/image/google.png" alt="Google" style={{ width: '40px', height: '40px' }} />
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleClick}>
                <img src="/image/facebook.png" alt="Facebook" style={{ width: '40px', height: '40px' }} />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
