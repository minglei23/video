import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardActionArea, CardContent, Modal, Box } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetSeriesList } from './service';
import { GetUser } from './cache';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [currentSeries, setCurrentSeries] = useState(null);
  const [user, setUser] = useState(null);

  const [seriesByType, setSeriesByType] = useState({
    type1: [],
    type2: [],
    type3: []
  });

  useEffect(() => {
    setUser(GetUser)
  }, []);

  useEffect(() => {
    GetSeriesList().then(data => {
      setSeriesByType(data);
    });
  }, []);


  const handleSeriesClick = (seriesItem) => {
    setCurrentSeries(seriesItem);
    setOpenModal(true);
  };

  const handleEpisodeClick = (seriesId, episodeNumber) => {
    if (user?.VIP || episodeNumber < 5) {
      navigate(`/player/${seriesId}/${episodeNumber + 1}`);
    }
  };

  const renderModalContent = () => {
    if (!currentSeries?.TotalNumber) return null;
    const image = currentSeries.BaseURL + '/image.jpg'

    return <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={image} alt="Series Cover" style={{ maxWidth: '100px', height: 'auto' }} />
      </div>
      {Array.from({ length: currentSeries.TotalNumber }).map((_, index) => {
        const isAccessible = user?.VIP || index < 5;
        return (
          <p
            key={index}
            style={{ cursor: isAccessible ? 'pointer' : 'not-allowed' }}
            onClick={() => isAccessible && handleEpisodeClick(currentSeries.ID, index)}
          >
            Episode {index + 1} {index >= 5 && !user?.VIP && <span style={{ color: '#fa0' }}>VIP</span>}
          </p>
        );
      })}
    </div>
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentSeries(null);
  };

  const renderSeriesByType = (type) => {
    return (
      <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {seriesByType[type].map((seriesItem) => (
          <div style={{ display: 'inline-block', width: '160px', padding: '0 10px' }} key={seriesItem.id}>
            <Card style={{ backgroundColor: 'black', color: 'white' }}>
              <CardActionArea onClick={() => handleSeriesClick(seriesItem)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={seriesItem.BaseURL + '/image.jpg'}
                  alt={seriesItem.Name}
                />
                <CardContent style={{ padding: '0px' }}>
                  <h4>{seriesItem.Name}</h4>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>
    );
  };

  const renderCarouselByType = (type) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
    };

    return (
      <Slider {...settings}>
        {seriesByType[type].map((seriesItem) => (
          <div key={seriesItem.ID} style={{ textAlign: 'center', padding: '10px' }}>
            <div onClick={() => handleSeriesClick(seriesItem)} style={{ cursor: 'pointer' }}>
              <img src={seriesItem.BaseURL + '/image.jpg'} alt={seriesItem.Name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <h5 style={{ margin: '5px 10px' }}>{seriesItem.Name}</h5>
            </div>
          </div>
        ))}
      </Slider>
    );
  };

  return (
    <div style={{ height: '100vh', overflowY: 'auto', backgroundColor: 'black', color: 'white', paddingBottom: '60px' }}>

      {renderCarouselByType('type1')}

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>Popular</h3>
      {renderSeriesByType('type1')}

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>Short Series</h3>
      {renderSeriesByType('type2')}

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>Chinese Series</h3>
      {renderSeriesByType('type3')}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 210,
          maxHeight: '80vh',
          overflowY: 'auto',
          bgcolor: 'black',
          border: '1px solid #a70',
          borderRadius: '10px',
          color: 'white',
          boxShadow: 24,
          p: 4
        }}>
          <div id="modal-modal-description">
            {renderModalContent()}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
