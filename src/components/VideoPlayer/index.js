import React, { useState, useEffect, useRef } from "react";
import { RecordHistory } from "../../service";
import { GetUser, SetHistory } from "../../cache";
import { useNavigate } from "react-router-dom";
import PlayerIcons from "../../PlayerIcons.js";
import SeriesName from "../../SeriesName.js";
import StopIcons from "../../StopIcons.js";
import PlayerSlider from "../../PlayerSlider.js";
import VipEpisodeModal from "../../VipEpisodeModal.js";

const VideoPlayer = (props) => {
  const { videoInfo, isActive } = props;
  const navigate = useNavigate();
  const url = videoInfo.videoUrl;
  const video = videoInfo;
  const [showPlayerIcons, setShowPlayerIcons] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef(null);
  const [play, setPlay] = useState(true);
  const [vipEpisodeModal, setVipEpisodeModal] = useState(false);

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
    }
  }, [isActive, videoRef]);

  //   添加历史记录
  const addHistoryRecord = () => {
    // SetHistory(video.ID, 1);
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

  return (
    <div
      className="recommend"
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
        />
      )}
      {video && <StopIcons stop={play} click={onVideo} />}
      {video && showPlayerIcons && (
        <SeriesName isShowBack name={video.Name} onBack={() => navigate(-1)} />
      )}
      {video && showPlayerIcons && (
        <PlayerIcons
          seriesId={video.ID}
          seriesInfoBottom="68px"
          showVipMotal={() => setVipEpisodeModal(true)}
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
    </div>
  );
};

export default VideoPlayer;
