import React from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const StopIcons = ({ stop, click }) => {
  return (
    <div onClick={click} style={{
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {stop ? <PauseCircleIcon style={{ fontSize: '15em', color: 'rgba(255, 255, 255, 0)' }} /> : <PlayCircleIcon style={{ fontSize: '5em', color: '#fff' }} />}
    </div>
  );
};

export default StopIcons;
