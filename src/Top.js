import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Button, InputBase } from '@mui/material';
import { GetLanguage, search } from './word';
import LanguageModal from './LanguageModal';

export default function Top() {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid container alignItems="center" spacing={0.5} style={{ width: '100%' }}>
      <Grid item style={{ flexBasis: '25%', flexGrow: 0, flexShrink: 0 }}>
        <img src="/image/RealShort.png" alt="RealShort" style={{ maxHeight: '30px', borderRadius: '5px', paddingLeft: '5px' }} />
      </Grid>
      <Grid item style={{ flexBasis: '55%', flexGrow: 0, flexShrink: 0 }}>
        <InputBase
          fullWidth
          placeholder={search()}
          onClick={() => navigate('/search')}
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: '2px', paddingRight: '10px', borderRadius: '20px', color: '#fff', height: '26px', fontSize: '13px' }}
          endAdornment={<SearchIcon style={{ color: '#ddd', cursor: 'pointer' }} />}
        />
      </Grid>
      <Grid item style={{ flexBasis: '10%', flexGrow: 0, flexShrink: 0 }}>
        <Button onClick={handleOpen} style={{ minWidth: 0, padding: 0, color: '#fff', paddingLeft: '5px' }}>
          {GetLanguage()}
        </Button>
      </Grid>
      <Grid item style={{ flexBasis: '10%', flexGrow: 0, flexShrink: 0 }}>
        <Button onClick={() => navigate('/profile')} style={{ minWidth: 0, padding: 0 }}>
          <img src="/image/coin.gif" alt="Coin" style={{ maxHeight: '24px' }} />
        </Button>
      </Grid>
      <LanguageModal open={open} onClose={handleClose} />
    </Grid>
  );
}
