import React, { useState, useEffect, useRef } from "react";
import {
  Radio,
  RadioGroup,
  Modal,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
} from "@mui/material";

import { RecordHistory } from "../../service";
import { GetUser } from "../../cache";
import { useNavigate } from "react-router-dom";
import PlayerIcons from "../../PlayerIcons.js";
import SeriesName from "../../SeriesName.js";
import StopIcons from "../../StopIcons.js";
import PlayerSlider from "../../PlayerSlider.js";
import VipEpisodeModal from "../../VipEpisodeModal.js";
import "./index.css";

const VideoPlayer = (props) => {
  const { videoInfo, isActive, isShowBack, onBack } = props;
//   console.log('视频信息',isActive );
//   const navigate = useNavigate();
  let url = videoInfo.videoUrl;
  const video = videoInfo;
//   const subtitle = videoInfo.Subtitle || [];
  const [showPlayerIcons, setShowPlayerIcons] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef(null);
  const [play, setPlay] = useState(true);
  const [vipEpisodeModal, setVipEpisodeModal] = useState(false);
  const [captionsModalVisible, setCaptionsModalVisible] = useState(false);
  const vttList = [{Type: '', Name: '无字幕', url: ''}, ...videoInfo.vttList]
  const [vttType, setVttType] = useState('');
  const [currentVtt, setCurrentVtt] = useState(null)

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setPlay(true);
        })
        .catch(() => {
          setPlay(false);
        });
      addHistoryRecord();
      return
    } 
    // 隐藏时停止播放
    if(!isActive && videoRef.current) {
        videoRef.current.pause()
        setPlay(false);
      setShowPlayerIcons(true);
      setVttType('')
      setCurrentVtt(null)
    }

    return () => {
      url = "";
      setVttType('')
      setCurrentVtt(null)
    }
  }, [isActive, videoRef]);

  //   添加历史记录
  const addHistoryRecord = () => {
    const user = GetUser();
    if (user) {
      RecordHistory(user.ID, parseInt(video.ID), 1);
    }
  };

  const onVideo = () => {
    if (play) {
      videoRef.current.pause();
      setPlay(false);
      setShowPlayerIcons(true);
    } else {
      videoRef.current.play();
      setPlay(true);
    }
  };

  const onIcons = () => {
    setShowPlayerIcons(!showPlayerIcons);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleOnChangeTime = (value) => {
    videoRef.current.currentTime = value;
  };
  const handleCaptionsChange = (e) => {
    const value = e.target.value
    setVttType(value)
    setCurrentVtt(vttList.find(item => item.Type === value))
  };

  return (
    <div
      className="video-player__content"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        overflowX: "hidden",
        zIndex: 20,
        backgroundColor: "#111",
      }}
    >
      {url && (
        <video
          className="video-player__video"
          src={url}
          loop
          playsInline
          onClick={onIcons}
          onTimeUpdate={handleTimeUpdate}
          //   onLoadedData={handleLoadedData}
          ref={videoRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            flex: "1",
          }}
          crossOrigin="anonymous"
        >
           {currentVtt && <track
                default
                kind="captions"
                src={currentVtt.url}
              />}
        </video>
      )}
      {video && <StopIcons stop={play} click={onVideo} />}
      {video && showPlayerIcons && (
        <SeriesName isShowBack={isShowBack} name={`${video.Name} - ${video.episode}`} onBack={() => onBack && onBack()} />
      )}
      {video && showPlayerIcons && (
        <PlayerIcons
          seriesId={video.ID}
          seriesInfoBottom="68px"
          showVipMotal={() => setVipEpisodeModal(true)}
          clickCaptions={() => setCaptionsModalVisible(true)}
        />
      )}
      {video && (
        <div style={{ display: showPlayerIcons ? "block" : "none" }}>
          {" "}
          <PlayerSlider
            bottom="0"
            currentTime={currentTime}
            allTime={video.TotalNumber}
            onChangeTime={handleOnChangeTime}
          />
        </div>
      )}
      <VipEpisodeModal
        open={vipEpisodeModal}
        bottom="68px"
        onClose={() => setVipEpisodeModal(false)}
      />
      <Modal
        open={captionsModalVisible}
        onClose={() => setCaptionsModalVisible(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "68px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxHeight: "50vh",
            // overflowY: 'auto',
            bgcolor: "#333",
            p: 3,
            borderRadius: "50px 50px 0 0",
          }}
        >
          <div className="h-[40vh] overflow-y-auto overflow-x-hidden">
            <FormControl component="fieldset">
              <div className="text-[#fff]">Captions</div>
              <RadioGroup
                row
                value={vttType}
                aria-label="gender"
                name="row-radio-buttons-group"
                onChange={handleCaptionsChange}
              >
                {(vttList || []).map((item) => {
                  return (
                    <FormControlLabel
                      classes={{root: 'text-[#fff]'}}
                      key={item.Type}
                      value={item.Type}
                      control={<Radio classes={{root: 'vtt-radio'}}/>}
                      label={item.Name}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default VideoPlayer;
