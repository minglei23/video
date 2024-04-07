import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Box, Snackbar } from '@mui/material';
import { GetPartner } from './cache.js';
import PartnerRegisterForm from './PartnerRegisterForm.js';

const PartnerRegister = () => {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const { referralId } = useParams();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const storedUser = GetPartner();
    if (storedUser) {
      navigate('/partner')
    }
  }, [referralId, refresh, setRefresh]);

  return (
    <div style={{ backgroundImage: 'url("/image/login.png")', backgroundSize: 'cover' }}>
      <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center' }}>
        <Box textAlign="center" marginTop={8}>
          <img src="/image/RealShort.png" alt="RealShort" style={{ width: '150px', display: 'block', margin: 'auto' }} />
          <PartnerRegisterForm setError={setError} refresh={refresh} setRefresh={setRefresh}/>
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

export default PartnerRegister;
