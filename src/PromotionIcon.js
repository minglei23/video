import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PromotionIcon() {
  const navigate = useNavigate();

  const handlePromotionClick = () => {
    navigate(`/promotion`);
  };

  return (
    <div
      onClick={handlePromotionClick}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        backgroundImage: 'linear-gradient(to right, #502, #205)',
      }}
    >
      <h1 style={{ margin: '10px', fontWeight: 'bold', fontSize: '18px' }}>First Time Promotion</h1>
      <div style={{
        position: 'absolute',
        top: -5,
        right: 10,
        backgroundColor: '#f35',
        color: 'white',
        padding: '3px 6px',
        fontSize: '12px',
        fontWeight: 'bold',
        zIndex: 100,
        borderRadius: '5px'
      }}>
        Up to 88% Off
      </div>
    </div>
  );
}
