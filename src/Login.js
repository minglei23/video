import React, { useState, useContext } from 'react';
import { Button, Typography, Container, Box, TextField, Grid, Snackbar } from '@mui/material';
import { login, register } from './service';
import { UserContext } from './index.js';

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState('');

  const handleSubmit = async (event, email, password) => {
    event.preventDefault();
    try {
      const userData = isLoginView ? await login(email, password) : await register(email, password);
      setUser(userData);
    } catch (error) {
      setError(error.message);
      console.error(isLoginView ? 'login failed:' : 'register failed:', error);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
  };

  const AuthForm = ({ isLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <form onSubmit={(e) => handleSubmit(e, email, password)}>
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
          fullWidth
          style={{ marginTop: 20 }}
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </form>
    );
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" marginTop={8}>
        <Typography variant="h4">{isLoginView ? 'Login' : 'Sign Up'}</Typography>
        <AuthForm isLogin={isLoginView} />
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
