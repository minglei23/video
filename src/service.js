import md5 from 'js-md5';
import { SetToken, GetToken, SetCache, GetCache, SetFavorites, SetHistory, SetEpisode } from './cache';
import { GetLanguage } from './word';

const BASE_URL = 'https://api.realshort.tv';

const parseVideo = (video) => {
  const language = GetLanguage();
  const namesParts = video.Name.split(',');
  namesParts.map(part => {
    const [type, name] = part.split('|');
    if (type == language) {
      video.Name = name;
    }
  });
  if (video.Subtitle) {
    const subtitlesParts = video.Subtitle.split(',');
    const subtitles = subtitlesParts.map(part => {
      const [type, name] = part.split('|');
      return { Type: type, Name: name };
    });
    video.Subtitle = subtitles;
  }
}

const parseVideoList = (videoList) => {
  if (videoList) {
    videoList.forEach(video => {
      parseVideo(video);
    });
  }
}

// Utility function to fetch data with caching
const fetchDataWithCache = async (url, cacheKey, expiryTime = 3600000) => {
  let data = {};
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    if (new Date().getTime() - parsedData.timestamp < expiryTime) {
      return parsedData.data;
    }
  }

  const response = await fetch(url, { method: 'GET' });
  if (!response.ok) throw new Error('Network response was not ok.');

  data = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: new Date().getTime() }));
  return data;
};

// Error handling function
const handleError = (error, message) => {
  console.error(message, error);
  throw error;
};

export const GetSeriesList = async () => {
  try {
    const data = await fetchDataWithCache(`${BASE_URL}/video-list`, 'seriesListCache');
    const seriesByType = { type1: [], type2: [], type3: [], type4: [], type5: [], type6: [], type7: [], type8: [], type9: [] };
    if (data.VideoList) {
      data.VideoList.forEach(video => {
        parseVideo(video);
        const typeKey = `type${video.Type}`;
        if (seriesByType[typeKey]) {
          seriesByType[typeKey].push(video);
        }
      });
    }
    return seriesByType;
  } catch (error) {
    handleError(error, 'Get Series List Failed:');
  }
};

export const GetSeries = async (id) => {
  try {
    const data = await fetchDataWithCache(`${BASE_URL}/video-list`, 'seriesListCache');
    const series = data.VideoList.find(video => String(id) === String(video.ID)) || null;
    if (series) {
      parseVideo(series);
    }
    return series
  } catch (error) {
    handleError(error, 'Get Series Failed:');
  }
};

export const SearchSeries = async (name) => {
  try {
    const data = await fetchDataWithCache(`${BASE_URL}/video-list`, 'seriesListCache');
    if (data.VideoList) {
      data.VideoList.forEach(video => {
        parseVideo(video);
      });
    }
    return data.VideoList.filter(video => video.Name.toLowerCase().includes(name)) || [];
  } catch (error) {
    handleError(error, 'Search Series Failed:');
  }
};

export const GetRecommendSeries = async () => {
  try {
    const data = await fetchDataWithCache(`${BASE_URL}/video-list`, 'seriesListCache');
    if (data.VideoList && data.VideoList.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.VideoList.length);
      const series = data.VideoList[randomIndex];
      if (series) {
        parseVideo(series);
      }
      return series
    }
    return null;
  } catch (error) {
    handleError(error, 'Get Recommend Series Failed:');
  }
};

const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error('Network response was not ok.');

  return await response.json();
};

export const login = async (email, password) => {
  try {
    const hashedPassword = md5(password);
    const data = await postRequest(`${BASE_URL}/login`, { email, password: hashedPassword });
    SetToken(data.Token);
    try {
      const favorites = await postRequest(`${BASE_URL}/favorites`, { token: data.Token, userID: data.ID });
      if (favorites.FavoritesList) {
        favorites.FavoritesList.forEach(item => {
          SetFavorites(item.ID);
        });
      }
      const history = await postRequest(`${BASE_URL}/history`, { token: data.Token, userID: data.ID });
      if (history.HistoryList) {
        history.HistoryList.forEach(item => {
          SetHistory(item.ID, item.Episode);
        });
      }
      const episode = await postRequest(`${BASE_URL}/episodes`, { token: data.Token, userID: data.ID });
      if (episode.VideoEpisodeList) {
        episode.VideoEpisodeList.forEach(item => {
          SetEpisode(item.VideoID, item.Episode);
        });
      }
    } catch (error) {
      console.log(error, 'Login Failed:');
    }
    return data;
  } catch (error) {
    handleError(error, 'Login Failed:');
  }
};

export const cologin = async (id, token, type, email, referral) => {
  try {
    const data = await postRequest(`${BASE_URL}/co-login`, { id, token, type, email, referral });
    SetToken(data.Token);
    try {
      const favorites = await postRequest(`${BASE_URL}/favorites`, { token: data.Token, userID: data.ID });
      if (favorites.FavoritesList) {
        favorites.FavoritesList.forEach(item => {
          SetFavorites(item.ID);
        });
      }
      const history = await postRequest(`${BASE_URL}/history`, { token: data.Token, userID: data.ID });
      if (history.HistoryList) {
        history.HistoryList.forEach(item => {
          SetHistory(item.ID, item.Episode);
        });
      }
      const episode = await postRequest(`${BASE_URL}/episodes`, { token: data.Token, userID: data.ID });
      if (episode.VideoEpisodeList) {
        episode.VideoEpisodeList.forEach(item => {
          SetEpisode(item.VideoID, item.Episode);
        });
      }
    } catch (error) {
      console.log(error, 'CoLogin Failed:');
    }
    return data;
  } catch (error) {
    handleError(error, 'CoLogin Failed:');
  }
};

export const register = async (email, password, referral) => {
  try {
    const hashedPassword = md5(password);
    const data = await postRequest(`${BASE_URL}/register`, { email, password: hashedPassword, referral });
    SetToken(data.Token);
    return data;
  } catch (error) {
    handleError(error, 'Register Failed:');
  }
};

export const createStripePayment = async (id, amount, productID, successURL, cancelURL) => {
  try {
    return await postRequest(`${BASE_URL}/create-stripe-payment`, { id, amount, productID, successURL, cancelURL });
  } catch (error) {
    handleError(error, 'Stripe Failed:');
  }
};

export const recordFavorites = async (userID, videoID) => {
  try {
    const token = GetToken();
    return await postRequest(`${BASE_URL}/record-favorites`, { token, userID, videoID });
  } catch (error) {
    handleError(error, 'Record Favorites Failed:');
  }
};

export const getCoinsTest = async (userID, number) => {
  try {
    const token = GetToken();
    return await postRequest(`${BASE_URL}/get-coins-test`, { token, userID, number });
  } catch (error) {
    handleError('Get Coins Test Failed:', error);
  }
};

export const vipTest = async (userID, number) => {
  try {
    const token = GetToken();
    return await postRequest(`${BASE_URL}/vip-test`, { token, userID, number });
  } catch (error) {
    handleError('VIP Test Failed:', error);
  }
};

export const unlockEpisode = async (userID, videoID, episode) => {
  try {
    const token = GetToken();
    return await postRequest(`${BASE_URL}/unlock-episode`, { token, userID, videoID, episode });
  } catch (error) {
    handleError('Unlock Episode Failed:', error);
  }
};

export const removeFavorites = async (userID, videoID) => {
  try {
    const token = GetToken();
    return await postRequest(`${BASE_URL}/remove-favorites`, { token, userID, videoID });
  } catch (error) {
    handleError(error, 'Remove Favorites Failed:');
  }
};

export const RecordHistory = async (userID, videoID, episode) => {
  try {
    const token = GetToken();
    return await postRequest(`${BASE_URL}/record-history`, { token, userID, videoID, episode });
  } catch (error) {
    handleError(error, 'Record History Failed:');
  }
};

export const getFavorites = async (userID) => {
  try {
    const token = GetToken();
    const response = await postRequest(`${BASE_URL}/favorites`, { token, userID });
    parseVideoList(response.FavoritesList)
    return response.FavoritesList
  } catch (error) {
    handleError(error, 'Favorites Failed:');
  }
};

export const getHistory = async (userID) => {
  try {
    const token = GetToken();
    const response = await postRequest(`${BASE_URL}/history`, { token, userID });
    parseVideoList(response.HistoryList)
    return response.HistoryList
  } catch (error) {
    handleError(error, 'History Failed:');
  }
};

export const GetPoints = async (userID) => {
  try {
    const token = GetToken();
    const points = await postRequest(`${BASE_URL}/points`, { token, userID });
    return points
  } catch (error) {
    handleError(error, 'Get Points Failed:');
  }
};

export const GetIfChecked = async (userID) => {
  try {
    const cached = GetCache("ifChecked");
    if (cached) {
      return cached.Checked;
    }
    const token = GetToken();
    const points = await postRequest(`${BASE_URL}/already-checkin`, { token, userID });
    SetCache("ifChecked", points);
    return points.Checked
  } catch (error) {
    handleError(error, 'GetIfChecked Failed:');
  }
};

export const Checkin = async (userID) => {
  try {
    const token = GetToken();
    const points = await postRequest(`${BASE_URL}/checkin`, { token, userID });
    SetCache("points", points);
    SetCache("ifChecked", points);
    return points.Points;
  } catch (error) {
    handleError(error, 'Checkin Failed:');
  }
};

