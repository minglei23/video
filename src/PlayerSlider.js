import React,{useState,useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

const PlayerSlider = (props) => {
    const theme = useTheme();
    const duration = 100; // seconds
    const [position, setPosition] = useState(32);
    const [currentTime, setCurrentTime] = useState(0);
    const [allTime, setAllTime] = useState(0);
    
    const convertSecondsToTime = (seconds = 0) => {
      let minutes = Math.floor(seconds / 60);
      let remainingSeconds = Math.floor(seconds % 60);
      let timeString = minutes.toString().padStart(2, '0') + ":" + remainingSeconds.toString().padStart(2, '0');
      return timeString;
    }

    useEffect(()=>{
      console.log(props);
      setCurrentTime(props.currentTime);
      setAllTime(props.allTime);
      setPosition( Math.floor((props.currentTime / props.allTime)* duration) );
    },[props.currentTime])

    return (
      <div style={{width: '100%',position:'absolute',left:'0',bottom:'3rem',padding:'0rem 1rem',boxSizing:'border-box',backgroundColor:'rgba(0,0,0,0.4)'}}>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value)}
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
        <span style={{position:'absolute',left:'0.5rem',bottom:'0.3rem',color:'#fff',fontSize: '0.8rem'}}>{convertSecondsToTime(currentTime)}</span>
        <span style={{position:'absolute',right:'0.5rem',bottom:'0.3rem',color:'#fff',fontSize: '0.8rem'}}>{convertSecondsToTime(allTime)}</span>
        </div>
        );
};

export default PlayerSlider;