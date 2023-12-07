import React, { useState, useContext } from 'react';
import { Button, TextField } from '@mui/material';
import { login, register } from './service';
import { UserContext } from './index.js'
import { SetUser } from './cache';

const AuthForm = ({ isLogin, setError }) => {
  const [email, setEmail] = useState('');
  const { setUser } = useContext(UserContext);
  const [password, setPassword] = useState('');

  const validateForm = () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return false;
    }
    if (!email.includes('@')) {
      setError('Invalid email format');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const userData = isLogin ? await login(email, password) : await register(email, password);
      setUser(userData);
      SetUser(userData);
    } catch (error) {
      setError(error.message);
      console.error(isLogin ? 'login failed:' : 'register failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ style: { color: '#fff' } }}
        InputProps={{ style: { color: '#fff' } }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{ style: { color: '#fff' } }}
        InputProps={{ style: { color: '#fff' } }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{
          marginTop: 20,
          color: '#fff',
          width: '200px',
          backgroundColor: '#a70',
        }}
      >
        {isLogin ? 'Login' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default AuthForm;
