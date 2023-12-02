import React, { useState } from 'react';
import { Button, Typography, Container, Box, Grid, Snackbar } from '@mui/material';
import AuthForm from './AuthForm';

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState('');

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" marginTop={8}>
        <Typography variant="h4">{isLoginView ? 'Login' : 'Sign Up'}</Typography>
        <AuthForm isLogin={isLoginView} setError={setError} />
        <Grid container justifyContent="center" style={{ marginTop: 20 }}>
          <Button variant="outlined" color="primary" onClick={toggleView}>
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
      </Box>
    </Container>
  );
};

export default Login;
