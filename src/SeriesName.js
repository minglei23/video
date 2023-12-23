import React from 'react';

const SeriesName = ({ name }) => {
  return (
    <div style={{
      position: 'absolute',
      left: 20,
      top: 5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h3>
        {name}
      </h3>
    </div>
  );
};

export default SeriesName;
