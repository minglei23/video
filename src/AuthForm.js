import React, { useState, useContext, useEffect } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { login, register, sendVerification } from './service';
import { UserContext } from './index.js';
import { SetUser } from './cache';
import { emailWord, loginword, passwordWord, signupWord } from './word.js';

const AuthForm = ({ isLogin, setError, referral }) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verification, setVerification] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const validateForm = () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return false;
    }
    if (!email.includes('@')) {
      setError('Invalid email format');
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and it must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const sendCode = async (event) => {
    event.preventDefault();
    if (!validateForm() || countdown > 0) return;
    setCountdown(60);
    try {
      await sendVerification(email);
    } catch (error) {
      setError(error.message);
      console.error('send verification code failed.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      const userData = isLogin ? await login(email, password) : await register(email, password, verification, referral);
      setUser(userData);
      SetUser(userData);
    } catch (error) {
      setError(error.message);
      console.error(isLogin ? 'login failed:' : 'register failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
      <TextField
        label={emailWord()}
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ style: { color: '#fff' } }}
        InputProps={{ style: { color: '#fff' } }}
        style={{ width: '94%', height: '45px', backgroundColor: 'rgba(100, 100, 100, 0.5)', borderRadius: '6px' }}
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
        style={{ width: '94%', height: '45px', backgroundColor: 'rgba(100, 100, 100, 0.5)', borderRadius: '6px' }}
      />
      {!isLogin && (
        <Grid container spacing={1} alignItems="center" style={{ width: '94%', margin: '8px 0' }}>
          <Grid item xs={7}>
            <TextField
              label="verification code"
              type="text"
              fullWidth
              value={verification}
              onChange={(e) => setVerification(e.target.value)}
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
              style={{  width: '100%', height: '45px', backgroundColor: 'rgba(100, 100, 100, 0.5)', borderRadius: '6px' }}
            />
          </Grid>
          <Grid item xs={5}>
            <Button
              variant="outlined"
              onClick={sendCode}
              disabled={countdown > 0}
              style={{ color: '#f35', borderColor: '#f35', width: '100%', height: '40px', borderRadius: '12px' }}
            >
              {countdown > 0 ? `${countdown}s` : 'Send Code'}
            </Button>
          </Grid>
        </Grid>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{
          marginTop: 25,
          color: '#fff',
          width: '94%',
          backgroundColor: '#f35',
          borderRadius: '12px'
        }}
      >
        {isLogin ? loginword() : signupWord()}
      </Button>
    </form>
  );
};

export default AuthForm;
