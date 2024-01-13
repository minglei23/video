import React, { useState, useEffect, useRef } from 'react';
// import { useSwipeable } from 'react-swipeable';
import { GetRecommendSeries, RecordHistory } from './service';
// import { GetUser, SetHistory, FetchAndCacheVideo } from './cache';
// import PlayerIcons from './PlayerIcons.js';
// import SeriesName from './SeriesName.js';
// import StopIcons from './StopIcons.js';
// import PlayerSlider from './PlayerSlider.js';
// import VipEpisodeModal from './VipEpisodeModal.js';
import VideoSwiper from './components/VideoSwiper';

const Recommend = () => {
  // const [url, setUrl] = useState("");
  // const [video, setVideo] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [recommendList, setRecommendList] = useState([]);
  // const [showPlayerIcons, setShowPlayerIcons] = useState(true);
  // const [currentTime, setCurrentTime] = useState(0);

  // const videoRef = useRef(null)
  // const [play, setPlay] = useState(true);
  // const [vipEpisodeModal, setVipEpisodeModal] = useState(false);

  // const onVideo = () => {
  //   if (play) {
  //     videoRef.current.pause();
  //     setPlay(false)
  //     setShowPlayerIcons(true);
  //   }
  //   else {
  //     videoRef.current.play();
  //     setPlay(true)
  //   }
  // }

  // const onIcons = () => {
  //   setShowPlayerIcons(!showPlayerIcons);
  // }

  useEffect(() => {
    fetchRecommend();
  }, []);
  // 获取推荐列表数据
  const getRecommendList = (data) => {
    const randomList = [];
    // 随机生成3条数据
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const element = data[randomIndex];
      randomList.push({...element})
    }
    console.log('随机推荐列表', randomList);
    return randomList;
  }
  // const checkAndSetVideo = async () => {
    // const recommendUrl = localStorage.getItem('cache-url');
    // const recommendVideo = localStorage.getItem('cache-video');
    // const isDownloadComplete = localStorage.getItem('download-complete');
    // console.log('checkAndSetVideo', recommendUrl, recommendVideo, isDownloadComplete);
    // try {
      // if (recommendUrl && isDownloadComplete === 'true') {
      //   setUrl(recommendUrl);
      //   setVideo(JSON.parse(recommendVideo));
      // } else {
        // const series = await GetRecommendSeries();
        // console.log('series', series);
        // setVideoList(series)
        // const randomIndex = Math.floor(Math.random() * series.length);
        // if (series) {
        //   setUrl(`${series.BaseURL}/1.mp4`);
        //   setVideo(series);
        // }
      // }
  //   } catch (error) {
  //     console.error('Error processing recommend:', error);
  //   }
  // };

  // const cacheNextVideo = async () => {
  //   localStorage.setItem('download-complete', 'false');
  //   try {
  //     const series = await GetRecommendSeries();
  //     if (series) {
  //       FetchAndCacheVideo(series, 1);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching next recommend:', error);
  //   }
  // };

  const fetchRecommend = async () => {
    try {
      const series = await GetRecommendSeries();
        const data = series.map(item => {
          return {
            ...item,
            videoUrl: `${item.BaseURL}/1.mp4`,
            vttList: (item.Subtitle || []).map(value => {
              return {
                ...value,
                url: `${item.BaseURL}/${value.Type}/1.vtt`
              }
            })
          }
        })
        setVideoList(data)
        console.log('series', data);
        const randomList = getRecommendList(data)
        setRecommendList([...randomList])
      // await checkAndSetVideo();
      // cacheNextVideo();
      // videoRef.current.play().then(() => {
      //   setPlay(true);
      // }).catch(() => {
      //   setPlay(false);
      // });
      // if (video) {
      //   setShowPlayerIcons(true);
      //   SetHistory(video.ID, 1);
      //   const user = GetUser();
      //   if (user) {
      //     RecordHistory(user.ID, parseInt(video.ID), 1);
      //   }
      // }
    } catch (error) {
      console.error('Error fetching recommend:', error);
    }
  };

  // const handleTimeUpdate = () => {
  //   // console.log('当前播放时间', videoRef.current.currentTime);
  //   setCurrentTime(videoRef.current.currentTime)
  // }



  const handlePreloadVideo = () => {
    const randomIndex = Math.floor(Math.random() * videoList.length);
    return videoList[randomIndex]
  }

  // const handlers = useSwipeable({
  //   onSwiped: () => setShowPlayerIcons(false),
  //   onSwipedDown: fetchRecommend,
  //   onSwipedUp: fetchRecommend,
  //   preventDefaultTouchmoveEvent: true,
  //   trackMouse: true,
  // });

  // change currenttime
  // const handleOnChangeTime = (value) => {
  //   videoRef.current.currentTime = value
  // }

  return (
    <VideoSwiper videoList={recommendList} preloadVideo={handlePreloadVideo}/>
    // <div {...handlers} className="recommend" style={{
    //   position: 'relative',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   height: '100%',
    //   width: '100%',
    //   overflowX: 'hidden',
    //   zIndex: 20,
    //   backgroundColor: '#111',
    // }}>
    //   {url && <video
    //     src={url}
    //     loop
    //     playsInline
    //     onClick={onIcons}
    //     onTimeUpdate={handleTimeUpdate}
    //     ref={videoRef}
    //     style={{
    //       width: '100%',
    //       height: '100%',
    //       objectFit: 'contain',
    //       flex: '1'
    //     }}
    //   />}
    //   {video && <StopIcons stop={play} click={onVideo} />}
    //   {video && showPlayerIcons && <SeriesName name={video.Name} />}
    //   {video && showPlayerIcons && <PlayerIcons seriesId={video.ID} seriesInfoBottom="68px" showVipMotal={() => setVipEpisodeModal(true)} />}
    //   {video && <div style={{ display: showPlayerIcons ? 'block' : 'none' }}> <PlayerSlider bottom="0" currentTime={currentTime} allTime={video.TotalNumber} onChangeTime={handleOnChangeTime} /></div>}
    //   <VipEpisodeModal open={vipEpisodeModal} bottom="68px" onClose={() => setVipEpisodeModal(false)} />
    //   {/* {showPlayerIcons && <Menu />} */}
    // </div>
  );
};

export default Recommend;
