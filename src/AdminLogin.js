import React, { useState, useContext } from 'react';
import { Container, Box, Snackbar, Button, TextField } from '@mui/material';
import { AdminContext } from './Admin';
import { adminlogin } from './service';
import { loginword, passwordWord } from './word.js';

const AdminLogin = () => {
  const [error, setError] = useState('');
  const { setAdmin } = useContext(AdminContext);
  const [password, setPassword] = useState('');

  const validateForm = () => {
    if (!password) {
      setError('Please enter the password');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const Partner = await adminlogin(password);
      setAdmin(Partner.Token);
    } catch (error) {
      setError(error.message);
      console.error('login failed:', error);
    }
  };

  return (
    <div style={{ backgroundImage: 'url("/image/login.png")', backgroundSize: 'cover' }}>
      <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center' }}>
        <Box textAlign="center" marginTop={8}>
          <img src="/image/RealShort.png" alt="RealShort" style={{ width: '150px', display: 'block', margin: 'auto' }} />
          <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
            <TextField
              label={passwordWord()}
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
              style={{ width: '94%', height: '50px', backgroundColor: 'rgba(100, 100, 100, 0.5)', borderRadius: '6px' }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{
                marginTop: 50,
                color: '#fff',
                width: '94%',
                backgroundColor: '#f35',
                borderRadius: '12px'
              }}
            >
              {loginword()}
            </Button>
          </form>
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
    </div>
  );
};

export default AdminLogin;
