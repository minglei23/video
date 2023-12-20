import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';

// Test public key
const stripePromise = loadStripe("pk_test_51OFXw4Lvs8YNyX8swQOIbwVtntvw5BaZ36VFC6mIOMqk8jZdnl6DuhdiQn87b8BvP04UfqNzjI00KIwGV4scCZEk00IdJ7Htan");

const VipButton = ({ border, color, content1, content2, content3 }) => {
  const [open, setOpen] = useState(false);

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const response = await fetch('http://18.188.120.153:8080/create-checkout-session', { method: 'POST' });

      if (!response.ok) {
        throw new Error('Network response was not OK');
      }

      const { sessionId } = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalStyle = {
    fontFamily: 'Poppins',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#222',
    border: '1px solid #555',
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
    color: '#fff',
    width: '70%',
    textAlign: 'center',
  };

  return (
    <>
      <Button onClick={handleOpen}
        style={{
          margin: '10px 20px',
          display: 'flex',
          alignItems: 'stretch',
          border: border,
          borderRadius: '10px',
          padding: 0,
        }}
      >
        <div
          style={{
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <h4 style={{ margin: '8px 0 0 0', color: '#fff', lineHeight: '1.2' }}>
            {content1}
          </h4>
          <h5 style={{ margin: '0', color: color, lineHeight: '1.2' }}>
            {content2}
          </h5>
        </div>
        <div
          style={{
            width: '30%',
            backgroundColor: color,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '0 5px 5px 0',
            height: '45px',
          }}
        >
          <h3 style={{ margin: '0', color: '#fff' }}>
            {content3}
          </h3>
        </div>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <h5>{`${content1} ${content2}`}</h5>
          <h5>{`${content3} pay by`}</h5>
          <Button onClick={handleCheckout} style={{ background: '#6772e5', borderRadius: '10px', color: '#fff', margin: '5px 20px 20px 0', width: '90px' }}>Stripe</Button>
          <Button style={{ background: '#009cde', borderRadius: '10px', color: '#fff', margin: '5px 0 20px 0', width: '90px' }}>Paypal</Button>
        </Box>
      </Modal>
    </>
  );
};

export default VipButton;
