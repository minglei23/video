import React from 'react';
import { Container, List, ListItem, ListItemText } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const navigate = useNavigate();

  return(
    <div>
      <Container style={{ display: 'flex', flexDirection: 'column', height: '92vh'}}>
        <List>
          <ListItem onClick={() => {navigate('/termsofService')}}>
            <ListItemText primary="Terms of Service" />
            <ArrowForwardIosIcon style={{ width: '15px' }} />
          </ListItem>
          <ListItem onClick={() =>{navigate('/privacyPolicy')}}>
            <ListItemText primary="Privacy Policy" />
            <ArrowForwardIosIcon style={{ width: '15px' }} />
          </ListItem>
        </List>
      </Container>
    </div>
  );
};

export default Help;
