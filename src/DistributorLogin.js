import React, { useState } from 'react';
import { Container, Box, Snackbar } from '@mui/material';
import DistributorAuthForm from './DistributorAuthForm';

const DistributorLogin = () => {
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);

  return (
    <div style={{ backgroundImage: 'url("/image/login.png")', backgroundSize: 'cover' }}>
      <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center' }}>
        <Box textAlign="center" marginTop={8}>
          <img src="/image/RealShort.png" alt="RealShort" style={{ width: '150px', display: 'block', margin: 'auto' }} />
          <DistributorAuthForm isLogin={true} setError={setError} partner={0} refresh={refresh} setRefesh={setRefresh}/>
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

export default DistributorLogin;
