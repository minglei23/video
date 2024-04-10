import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { createStripePayment, getCoinsTest, getInPayLink, getThPayLink, getMaPayLink, getCountryCodeFromIP } from './service';
import { GetUser } from './cache';

// Test public key
const stripePromise = loadStripe("pk_live_51OFXw4Lvs8YNyX8sfVvnRljrcKEH6Mn9iDlZk9hbby4dAdNxCet4rjqIkJku2nQ6KHydOXluv1qTWyhHDPb2LJh100FDkMQqVf");
const product = "price_1OW6LHLvs8YNyX8svyQwfJas";
const url = "https://dev.realshort.tv/profile"

const CheckoutBox = ({ coins, bonus, price }) => {
  const navigate = useNavigate()
  const [country, setCountry] = useState("");
  const [half, setHalf] = useState("0");

  const handleInPay = async () => {
    try {
      const id = GetUser().ID;
      const link = await getInPayLink(id, 0, price * 7500);
      window.open(link, '_self');
    } catch (error) {
      console.error('Get Coins:', error);
    }
    navigate('/profile')
  };

  const handleThPay = async () => {
    try {
      const id = GetUser().ID;
      const link = await getThPayLink(id, 0, price * 18);
      window.open(link, '_self');
    } catch (error) {
      console.error('Get Coins:', error);
    }
    navigate('/profile')
  };

  const handleMaPay = async () => {
    try {
      const id = GetUser().ID;
      const link = await getMaPayLink(id, 0, price * 2.3);
      window.open(link, '_self');
    } catch (error) {
      console.error('Get Coins:', error);
    }
    navigate('/profile')
  };

  useEffect(() => {
    const getCountry = async () => {
      try {
        const countryCode = await getCountryCodeFromIP() || "EN";
        if (countryCode === "ID" || countryCode === "MY" || countryCode === "TH") {
          setHalf("1");
        }
        setCountry(countryCode);
      } catch (error) {
        console.error('Error get country:', error);
      }
    };
    getCountry();
  }, []);

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
            custom_id: `${GetUser().ID}+0+${half}`
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
      {!half && <h5>{`$${price}.00 pay by`}</h5>}
      {half && <h5>{`$${price / 2} pay by`}</h5>}
      {country === "ID" && <Button onClick={handleInPay} style={buttonStyle}>Indonesia Pay </Button>}
      {price > 7 && country === "MY" && <Button onClick={handleMaPay} style={buttonStyle}>Malaysia Pay </Button>}
      {country === "TH" && <Button onClick={handleThPay} style={buttonStyle}>Thailand Pay </Button>}
      {!half && <Button onClick={handleStripeCheckout} style={buttonStyle}>Stripe</Button>}
      <div id="paypal-button-container"></div>
    </Box>
  );
};

export default CheckoutBox;
