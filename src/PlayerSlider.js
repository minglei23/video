import React,{useState,useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

const PlayerSlider = (props) => {
  const {currentTime = 0, allTime = 0, onChangeTime} = props
    const theme = useTheme();
    const duration = 100; // seconds
    const [position, setPosition] = useState(0);
    
    const convertSecondsToTime = (seconds = 0) => {
      let minutes = Math.floor(seconds / 60);
      let remainingSeconds = Math.floor(seconds % 60);
      let timeString = minutes.toString().padStart(2, '0') + ":" + remainingSeconds.toString().padStart(2, '0');
      return timeString;
    }

    useEffect(()=>{
      setPosition( Math.floor((currentTime / allTime)* duration) );
    },[currentTime, allTime])

    const handleChange = (value) => {
      console.log('进度条', value);
      const slideTimer = value / duration * allTime
      onChangeTime(slideTimer)
      setPosition(value)
    }
    return (
      <div style={{width: '100%',height:'3rem',position:'absolute',padding:'0 1rem',left:'0',bottom:'4rem',boxSizing:'border-box',backgroundColor:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'space-around'}}>
        <span style={{width:'4rem',color:'#fff',fontSize: '0.8rem'}}>{convertSecondsToTime(currentTime)}</span>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          // getAriaValueText={valuetext}
          onChange={(_, value) => handleChange(value)}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(255,255,255,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <span style={{width:'4rem',color:'#fff',fontSize: '0.8rem',textAlign:'right'}}>{convertSecondsToTime(allTime)}</span>
        </div>
        );
};

export default PlayerSlider;