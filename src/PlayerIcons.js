import React from 'react';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StorageIcon from '@mui/icons-material/Storage';

const PlayerIcons = () => {
  return (
    <div style={{
      position: 'absolute',
      right: 10,
      bottom: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <IconButton style={{ fontSize: '2em' }}>
        <ShareIcon style={{ fontSize: 'inherit' }} />
      </IconButton>
      <IconButton style={{ fontSize: '2em' }}>
        <FavoriteIcon style={{ fontSize: 'inherit' }} />
      </IconButton>
      <IconButton style={{ fontSize: '2em' }}>
        <StorageIcon style={{ fontSize: 'inherit' }} />
      </IconButton>
    </div>
  );
};

export default PlayerIcons;

