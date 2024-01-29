import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { createStripePayment, vipTest } from './service';
import { GetUser } from './cache';

// Test public key
const stripePromise = loadStripe("pk_live_51OFXw4Lvs8YNyX8sfVvnRljrcKEH6Mn9iDlZk9hbby4dAdNxCet4rjqIkJku2nQ6KHydOXluv1qTWyhHDPb2LJh100FDkMQqVf");
const url = "https://realshort.tv/profile"

const VIPCheckoutBox = ({ product, amount, day, word }) => {
  const navigate = useNavigate()

  const handleTest = async () => {
    try {
      const id = GetUser().ID;
      const response = await vipTest(id, 1);
    } catch (error) {
      console.error('Become VIP:', error);
    }
    navigate('/profile')
  };

  const handleStripeCheckout = async () => {
    try {
      const id = GetUser().ID;
      const stripe = await stripePromise;
      const response = await createStripePayment(id, 1, product, url, url);
      const sessionId = response.SessionId;
      const result = await stripe.redirectToCheckout({
        sessionId,
      });
      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Stripe Payment Error:', error);
    }
  };

  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount
            },
            custom_id: `${GetUser().ID}+${day}`
          }],
          application_context: {
            return_url: url,
            cancel_url: url
          }
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then((details) => {
          alert('Payment successful! Thank you for your purchase.');
        });
      }
    }).render('#paypal-button-container');
  }, [amount]);

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
    maxWidth: '280px',
    textAlign: 'center',
  };

  const buttonStyle = {
    background: '#6772e5',
    borderRadius: '4px',
    color: '#fff',
    top: '5px',
    left: '0',
    width: '100%',
    height: '35px',
    marginBottom: '15px',
    fontStyle: 'italic',
    fontWeight: 'bold',
  }

  return (
    <Box sx={modalStyle}>
      <h5>{word}</h5>
      <h5>{`$${amount}.00 pay by`}</h5>
      <Button onClick={handleTest} style={buttonStyle}>1 Day VIP Test</Button>
      <Button onClick={handleStripeCheckout} style={buttonStyle}>Stripe</Button>
      <div id="paypal-button-container"></div>
    </Box>
  );
};

export default VIPCheckoutBox;
