import React, { useState } from 'react';
import { Container, Box, Snackbar } from '@mui/material';
import AdminAuthForm from './AdminAuthForm';

const AdminLogin = () => {
  const [error, setError] = useState('');

  return (
    <div style={{ backgroundImage: 'url("/image/login.png")', backgroundSize: 'cover' }}>
      <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center' }}>
        <Box textAlign="center" marginTop={8}>
          <img src="/image/RealShort.png" alt="RealShort" style={{ width: '150px', display: 'block', margin: 'auto' }} />
          <AdminAuthForm setError={setError} />
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
