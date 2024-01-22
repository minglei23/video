import React, { useState, useEffect, useRef } from "react";
import { RecordHistory, GetRecommendSeries } from "./service";
import { parseVTT } from "./vtt";
import { SetHistory, FetchAndCacheVideo } from "./cache";
import { useSwipeable } from "react-swipeable";
import { GetUser } from "./cache";
import PlayerIcons from "./PlayerIcons.js";
import PlayerSlider from "./PlayerSlider.js";
import SeriesName from "./SeriesName.js";
import StopIcons from "./StopIcons.js";
import SubtitlesModal from "./SubtitlesModal.js";

const Recommend = () => {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [showPlayerIcons, setShowPlayerIcons] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [vttList, setVttList] = useState([]);
  const [vttType, setVttType] = useState("");
  const [subtitles, setSubtitles] = useState([])
  const [subtitlesModal, setSubtitlesModal] = useState(false);
  const videoRef = useRef(null);
  const [play, setPlay] = useState(true);

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

  const checkAndSetVideo = async () => {
    const recommendUrl = localStorage.getItem('cache-url');
    const recommendVideo = localStorage.getItem('cache-video');
    const isDownloadComplete = localStorage.getItem('download-complete');
    try {
      if (recommendUrl && isDownloadComplete === 'true') {
        setUrl(recommendUrl);
        const series = JSON.parse(recommendVideo)
        setVideo(series);
        setSubtitlesIcon(series)
      } else {
        const series = await GetRecommendSeries();
        if (series) {
          setUrl(`${series.BaseURL}/1.mp4`);
          setVideo(series);
          setSubtitlesIcon(series)
        }
      }
    } catch (error) {
      console.error('Error processing recommend:', error);
    }
  };

  const cacheNextVideo = async () => {
    localStorage.setItem('download-complete', 'false');
    try {
      const series = await GetRecommendSeries();
      if (series) {
        FetchAndCacheVideo(series, 1);
      }
    } catch (error) {
      console.error('Error fetching next recommend:', error);
    }
  };

  const setSubtitlesIcon = (series) => {
    const tempVttList = (series.Subtitle || []).map((item) => {
      return {
        ...item,
        url: `${series.BaseURL}/${item.Type}/1.vtt`,
      };
    })
    setVttList([{ Type: '', Name: 'No Subtitles', url: '' }, ...tempVttList])
  }

  const fetchRecommend = async () => {
    setVttType('')
    setSubtitles([])
    try {
      await checkAndSetVideo();
      cacheNextVideo();
      videoRef.current.play().then(() => {
        setPlay(true);
      }).catch(() => {
        setPlay(false);
      });
      if (video) {
        setShowPlayerIcons(true);
        SetHistory(video.ID, 1);
        const user = GetUser();
        if (user) {
          RecordHistory(user.ID, parseInt(video.ID), 1);
        }
      }
    } catch (error) {
      console.error('Error fetching recommend:', error);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  useEffect(() => {
    fetchRecommend();
  }, []);

  const handlers = useSwipeable({
    onSwiped: () => setShowPlayerIcons(false),
    onSwipedDown: fetchRecommend,
    onSwipedUp: fetchRecommend,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleOnChangeTime = (value) => {
    videoRef.current.currentTime = value;
  };

  const handleSubtitlesChange = async (e) => {
    let value = e.target.value;
    setVttType(value);
    const vtt = vttList.find(item => item.Type === value)
    if (vtt) {
      try {
        const vttUrl = vtt.url;
        const response = await fetch(vttUrl);
        const vttText = await response.text();
        const parsedSubtitles = parseVTT(vttText);
        setSubtitles(parsedSubtitles);
      } catch (error) {
        console.error('Error fetching or parsing VTT file:', error);
        setSubtitles([]);
      }
    }
  };

  return (
    <div
      {...handlers}
      className="Player"
      style={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        zIndex: 20,
        backgroundColor: "#111",
      }}
    >
      {url && (<video
        src={url}
        loop
        playsInline
        onClick={onIcons}
        onTimeUpdate={handleTimeUpdate}
        ref={videoRef}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          flex: "1",
        }}
      />)}
      {video && <StopIcons stop={play} click={onVideo} />}
      {video && showPlayerIcons && (
        <SeriesName
          isShowBack={false}
          name={`${video.Name}`}
        />
      )}
      {video && showPlayerIcons && (
        <PlayerIcons
          seriesId={video.ID}
          clickCaptions={() => setSubtitlesModal(true)}
        />
      )}
      {video && (
        <div style={{ display: showPlayerIcons ? "block" : "none" }}>
          <PlayerSlider
            currentTime={currentTime}
            backgroundColor="transparent"
            bottom="0.5rem"
            allTime={video.TotalNumber}
            onChangeTime={handleOnChangeTime}
            subtitles={subtitles}
          />
        </div>
      )}
      <SubtitlesModal
        open={subtitlesModal}
        onClose={() => setSubtitlesModal(false)}
        vttType={vttType}
        vttList={vttList}
        handleSubtitlesChange={handleSubtitlesChange}
      />
    </div>
  );
};

export default Recommend;
