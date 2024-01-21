import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Radio,
  RadioGroup,
  Modal,
  FormControlLabel,
  FormControl,
  Box,
} from "@mui/material";
import { GetSeries, RecordHistory } from "./service";
import { SetHistory, FetchAndCacheVideo, GetEpisode } from "./cache";
import { useSwipeable } from "react-swipeable";
import { GetUser } from "./cache";
import PlayerIcons from "./PlayerIcons.js";
import PlayerSlider from "./PlayerSlider.js";
import SeriesName from "./SeriesName.js";
import StopIcons from "./StopIcons.js";
import LastEpisodeModal from "./LastEpisodeModal.js";
import VipEpisodeModal from "./VipEpisodeModal.js";

const Player = () => {
  const navigate = useNavigate();
  const { seriesId, episode } = useParams();
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [showPlayerIcons, setShowPlayerIcons] = useState(true);
  const [lastEpisodeModal, setLastEpisodeModal] = useState(false);
  const [vipEpisodeModal, setVipEpisodeModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [vttList, setVttList] = useState([]);
  const [vttType, setVttType] = useState("");
  const [subtitles, setSubtitles] = useState([])
  const [captionsModalVisible, setCaptionsModalVisible] = useState(false);
  const [paid, setPaid] = useState([]);

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
    const cacheUrl = localStorage.getItem("cache-url");
    const cacheVideo = localStorage.getItem("cache-video");
    const cacheEpisode = localStorage.getItem("cache-episode");
    const isDownloadComplete = localStorage.getItem("download-complete");
    try {
      if (cacheUrl && isDownloadComplete === "true") {
        const cache = JSON.parse(cacheVideo);
        if (
          parseInt(cache.ID) === parseInt(seriesId) &&
          parseInt(cacheEpisode) === parseInt(episode)
        ) {
          setUrl(cacheUrl);
        }
      }
    } catch (error) {
      console.error("Error processing cache video:", error);
    }
  };

  const cacheNextVideo = async (series) => {
    localStorage.setItem("download-complete", "false");
    try {
      if (series) {
        FetchAndCacheVideo(series, parseInt(episode) + 1);
      }
    } catch (error) {
      console.error("Error fetching next video:", error);
    }
  };

  const fetchVideo = useCallback(async () => {
    try {
      const user = GetUser();
      const series = await GetSeries(seriesId);
      if (series) {
        console.log("series", series);
        setUrl(`${series.BaseURL}/${episode}.mp4`);
        setTotalEpisodes(series.TotalNumber);
        setVideo(series);
        const tempVttList = (series.Subtitle || []).map((item) => {
          return {
            ...item,
            url: `${series.BaseURL}/${item.Type}/${episode}.vtt`,
          };
        })
        setVttList([{ Type: '', Name: '无字幕', url: '' }, ...tempVttList])
        await checkAndSetVideo();
        cacheNextVideo(series);
        setShowPlayerIcons(true);
        SetHistory(series.ID, episode);
        if (user) {
          RecordHistory(user.ID, parseInt(series.ID), parseInt(episode));
        }
        videoRef.current
          .play()
          .then(() => {
            setPlay(true);
          })
          .catch(() => {
            setPlay(false);
          });
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  }, [seriesId, episode]);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  useEffect(() => {
    setVttType('')
    setSubtitles([])
    const paidEpisode = GetEpisode(parseInt(seriesId))
    if (paidEpisode) {
      setPaid(paidEpisode)
    }
    if (parseInt(episode) <= 5 || paidEpisode.includes(parseInt(episode))) {
      fetchVideo();
    } else {
      navigate("/profile");
    }
  }, [seriesId, episode, navigate, fetchVideo]);

  const navigateToEpisode = useCallback(
    (newEpisode) => {
      navigate(`/player/${seriesId}/${newEpisode}`);
    },
    [seriesId, navigate]
  );

  const handlers = useSwipeable({
    onSwiped: () => setShowPlayerIcons(false),
    onSwipedDown: () => {
      const episodeNumber = parseInt(episode);
      if (episodeNumber > 1) {
        navigateToEpisode(episodeNumber - 1);
      }
    },
    onSwipedUp: () => {
      const episodeNumber = parseInt(episode);
      if (episodeNumber < totalEpisodes) {
        if (episodeNumber < 5) {
          navigateToEpisode(episodeNumber + 1);
        } else {
          const user = GetUser();
          if (user && paid.includes(episodeNumber + 1)) {
            navigateToEpisode(episodeNumber + 1);
          } else {
            setVipEpisodeModal(true);
          }
        }
      } else {
        setLastEpisodeModal(true);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleOnChangeTime = (value) => {
    videoRef.current.currentTime = value;
  };

  function parseVTT(vttString) {
    const lines = vttString.split('\n');
    const subtitles = [];
    let currentSubtitle = null;

    lines.forEach(line => {
      if (line.includes('-->')) {
        const times = line.split(' --> ');
        if (times.length === 2) {
          currentSubtitle = {
            start: timeStringToSeconds(times[0].trim()),
            end: timeStringToSeconds(times[1].trim()),
            text: ''
          };
          subtitles.push(currentSubtitle);
        }
      } else if (currentSubtitle && line.trim()) {
        if (currentSubtitle.text) {
          currentSubtitle.text += '\n';
        }
        currentSubtitle.text += line.trim();
      }
    });

    return subtitles;
  }

  function timeStringToSeconds(timeString) {
    const parts = timeString.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseFloat(parts[2].replace(',', '.'));
    return (hours * 3600) + (minutes * 60) + seconds;
  }

  const handleCaptionsChange = async (e) => {
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
      {url && (
        <video
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
          crossOrigin="anonymous"
        >
        </video>
      )}
      {video && <StopIcons stop={play} click={onVideo} />}
      {video && showPlayerIcons && (
        <SeriesName
          isShowBack
          name={`${video.Name} - ${episode}`}
          onBack={() => navigate("/home")}
        />
      )}
      {video && showPlayerIcons && (
        <PlayerIcons
          seriesId={video.ID}
          showVipMotal={() => setVipEpisodeModal(true)}
          clickCaptions={() => setCaptionsModalVisible(true)}
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
      <LastEpisodeModal
        open={lastEpisodeModal}
        onClose={() => setLastEpisodeModal(false)}
      />
      <VipEpisodeModal
        videoId={parseInt(seriesId)}
        episode={parseInt(episode) + 1}
        open={vipEpisodeModal}
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
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxHeight: "50vh",
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
                {vttList.map((item) => {
                  return (
                    <FormControlLabel
                      className="text-[#fff]"
                      key={item.Type}
                      value={item.Type}
                      control={<Radio classes={{ root: 'vtt-radio' }} />}
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

export default Player;
