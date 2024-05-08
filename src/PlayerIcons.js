import React, { useState, useEffect } from "react";
import { IconButton, Modal, Box } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import StorageIcon from "@mui/icons-material/Storage";
import ArticleIcon from "@mui/icons-material/Article";
import { GetSeries } from "./service";
import { GetUser } from "./cache";
import SeriesInfo from "./SeriesInfo";
import FavoritesIcon from "./FavoritesIcon";
import copy from "copy-to-clipboard";
import { share, collect, seriesInfo, subtitles } from './word.js';

const PlayerIcons = ({ seriesId, showVipMotal, setUnlockEpisode, seriesInfoBottom = 0, clickCaptions, paid }) => {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(0);
  const [series, setSeries] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const user = GetUser();
        if (user) {
          setUser(user);
          setUserId(user.ID)
        }
        const fetchedSeries = await GetSeries(seriesId);
        setSeries(fetchedSeries);
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };
    fetchSeries();
  }, [seriesId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);


  const handleShareClick = () => {
    const linkToCopy = `Click to watch the exciting series!\n${series?.Name}\nLink: https://realshort.vip/player/${seriesId}/1`;
    copy(linkToCopy);
    alert("Link copied to clipboard!");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          position: "absolute",
          right: 10,
          bottom: 150,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleShareClick}>
          <ShareIcon style={{ fontSize: "1.5em", color: "#fff" }} />
        </IconButton>
        <div style={{ fontSize: "12px", marginBottom: "1em" }}>{share()}</div>
        <FavoritesIcon seriesId={seriesId} user={user} />
        <div style={{ fontSize: "12px", marginBottom: "1em" }}>{collect()}</div>
        <IconButton onClick={handleOpenModal}>
          <StorageIcon style={{ fontSize: "1.5em", color: "#fff" }} />
        </IconButton>
        <div style={{ fontSize: "12px", marginBottom: "1em" }}>{seriesInfo()}</div>
        <IconButton onClick={() => clickCaptions && clickCaptions()}>
          <ArticleIcon style={{ fontSize: "1.5em", color: "#fff" }} />
        </IconButton>
        <div style={{ fontSize: "12px", marginBottom: "1em" }}>{subtitles()}</div>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            bottom: seriesInfoBottom,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxHeight: "50vh",
            bgcolor: "#333",
            p: 1,
            borderRadius: "10px 10px 0 0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <SeriesInfo
              vip={user && user.VIP}
              series={series}
              showVipMotal={showVipMotal}
              setUnlockEpisode={setUnlockEpisode}
              paid={paid}
            />
          </div>
        </Box>
      </Modal>

    </div>
  );
};

export default PlayerIcons;
