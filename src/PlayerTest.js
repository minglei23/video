import React, { useRef } from 'react';

const PlayerTest = () => {
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div style={{ position: "fixed", height: "100%", width: "100%", backgroundColor: "#111" }}>
      <video
        ref={videoRef}
        src="https://series-store.obs.ap-southeast-1.myhuaweicloud.com/13002/1.mp4"
        loop
        playsInline
        onClick={togglePlay}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        crossOrigin="anonymous"
      >
        <track
          default
          kind="subtitles"
          src="https://series-store.obs.ap-southeast-1.myhuaweicloud.com/13002/CN/1.vtt"
          srclang="zh-CN"
          label="简体中文"
        />
      </video>
    </div>
  );
};

export default PlayerTest;
