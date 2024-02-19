import React, { useState, useContext } from 'react';
import { Button, TextField } from '@mui/material';
import { login, register } from './service';
import { UserContext } from './index.js'
import { SetUser } from './cache';
import { emailWord, loginword, passwordWord, signupWord } from './word.js';

const AuthForm = ({ isLogin, setError, referral }) => {
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
      const userData = isLogin ? await login(email, password) : await register(email, password, referral);
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
        label={emailWord()}
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ style: { color: '#fff' } }}
        InputProps={{ style: { color: '#fff' } }}
      />
      <TextField
        label={passwordWord()}
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
          marginTop: 30,
          color: '#fff',
          width: '90%',
          backgroundColor: '#f35',
        }}
      >
        {isLogin ? loginword() : signupWord()}
      </Button>
    </form>
  );
};

export default AuthForm;
