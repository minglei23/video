import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Snackbar } from '@mui/material';
import DistributorAuthForm from './DistributorAuthForm.js';

const PartnerReferral = () => {

  const [error, setError] = useState('');
  const { referralId } = useParams();
  const [referral, setReferral] = useState(0);

  useEffect(() => {
    setReferral(parseInt(referralId))
  }, [referralId]);

  return (
    <div style={{ backgroundImage: 'url("/image/login.png")', backgroundSize: 'cover' }}>
      <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center' }}>
        <Box textAlign="center" marginTop={8}>
          <img src="/image/RealShort.png" alt="RealShort" style={{ width: '150px', display: 'block', margin: 'auto' }} />
          <DistributorAuthForm isLogin={false} setError={setError} partner={referral}/>
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

export default PartnerReferral;
