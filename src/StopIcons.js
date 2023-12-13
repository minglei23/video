import React from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const setShowPlayerIcons = ({ stop, click }) => {
  return (
    <div onClick={click} style={{
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#fff',
    }}>
      {stop ? <PauseCircleIcon style={{ fontSize: '5em' }} /> : <PlayCircleIcon style={{ fontSize: '5em' }} />}
    </div>
  );
};

export default setShowPlayerIcons;
