import React, { useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';

// Test public key
const stripePromise = loadStripe("pk_test_51OFXw4Lvs8YNyX8swQOIbwVtntvw5BaZ36VFC6mIOMqk8jZdnl6DuhdiQn87b8BvP04UfqNzjI00KIwGV4scCZEk00IdJ7Htan");

const CheckoutBox = ({ content1, content2, content3 }) => {

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

  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '1.99'
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then((details) => {
          alert('Transaction completed by ' + details.payer.name.given_name);
          // Handle post-transaction logic here
        });
      }
    }).render('#paypal-button-container');
  }, []);

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
    top: '0',
    left: '0',
    width: '100%',
    height: '35px',
    marginBottom: '15px',
    fontStyle: 'italic',
    fontWeight: 'bold',
  }

  return (
    <Box sx={modalStyle}>
      <h5>{`${content1} ${content2}`}</h5>
      <h5>{`${content3} pay by`}</h5>
      <Button onClick={handleCheckout} style={buttonStyle}>Stripe</Button>
      <div id="paypal-button-container"></div>
    </Box>
  );
};

export default CheckoutBox;
