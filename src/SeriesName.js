import React from 'react';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const SeriesName = ({ name, isShowBack = false, onBack }) => {
  return (
    <div style={{
      position: 'absolute',
      left: 20,
      width: '100%',
      top: '16px',
      display: 'flex',
      // flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div onClick={() => onBack && onBack()}>
      {isShowBack && <ArrowBackIosIcon fontSize="small"/>}
      </div>
      <h3 className='max-w-80 flex-1 overflow-hidden whitespace-nowrap text-ellipsis'>
        {name}
      </h3>
    </div>
  );
};

export default SeriesName;
