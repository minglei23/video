import React, { useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { createStripePayment } from './service';
import { GetUser } from './cache';

// Test public key
const stripePromise = loadStripe("pk_test_51OFXw4Lvs8YNyX8swQOIbwVtntvw5BaZ36VFC6mIOMqk8jZdnl6DuhdiQn87b8BvP04UfqNzjI00KIwGV4scCZEk00IdJ7Htan");
const product = "price_1OQqxYLvs8YNyX8sRMRaBbcN";
const url = "https://realshort.tv/store"

const CheckoutBox = ({ coins, bonus, price }) => {

  const handleStripeCheckout = async () => {
    try {
      const id = GetUser().ID;
      const stripe = await stripePromise;
      const response = await createStripePayment(id, coins, product, url, url);
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
              value: price
            },
            custom_id: GetUser().ID
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
  }, [price]);

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
      <h5>{`${coins} coins + ${bonus} bonus`}</h5>
      <h5>{`$${price}.00 pay by`}</h5>
      <Button onClick={handleStripeCheckout} style={buttonStyle}>Stripe</Button>
      <div id="paypal-button-container"></div>
    </Box>
  );
};

export default CheckoutBox;
