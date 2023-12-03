import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { login, register } from './service';
import { SetUser} from './cache';

const AuthForm = ({ isLogin, setError }) => {
  const [email, setEmail] = useState('');
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

export default AuthForm;
