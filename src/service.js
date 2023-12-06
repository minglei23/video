import md5 from 'js-md5';
import { SetToken, GetToken, SetCache, GetCache } from './cache';

const BASE_URL = 'http://18.188.120.153:8080';

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
    const seriesByType = { type1: [], type2: [], type3: [] };
    data.VideoList.forEach(video => {
      const typeKey = `type${video.Type}`;
      if (seriesByType[typeKey]) {
        seriesByType[typeKey].push(video);
      }
    });
    return seriesByType;
  } catch (error) {
    handleError(error, 'Get Series List Failed:');
  }
};

export const GetSeries = async (id) => {
  try {
    const data = await fetchDataWithCache(`${BASE_URL}/video-list`, 'seriesListCache');
    return data.VideoList.find(video => String(id) === String(video.ID)) || null;
  } catch (error) {
    handleError(error, 'Get Series Failed:');
  }
};

export const GetRecommendSeries = async () => {
  try {
    const data = await fetchDataWithCache(`${BASE_URL}/video-list`, 'seriesListCache');
    if (data.VideoList && data.VideoList.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.VideoList.length);
      return data.VideoList[randomIndex];
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
    return data;
  } catch (error) {
    handleError(error, 'Login Failed:');
  }
};

export const register = async (email, password) => {
  try {
    const hashedPassword = md5(password);
    const data = await postRequest(`${BASE_URL}/register`, { email, password: hashedPassword });
    SetToken(data.Token);
  } catch (error) {
    handleError(error, 'Register Failed:');
  }
};

export const RecordFavorites = async (userID, videoID) => {
  try {
    const token = GetToken();
    return await postRequest(`${BASE_URL}/record-favorites`, { token, userID, videoID });
  } catch (error) {
    handleError(error, 'Record Favorites Failed:');
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

export const GetFavorites = async (userID) => {
  try {
    const token = GetToken();
    return await postRequest(`${BASE_URL}/favorites`, { token, userID });
  } catch (error) {
    handleError(error, 'Favorites Failed:');
  }
};

export const GetHistory = async (userID) => {
  try {
    const token = GetToken();
    return await postRequest(`${BASE_URL}/history`, { token, userID });
  } catch (error) {
    handleError(error, 'History Failed:');
  }
};

export const GetPoints = async (userID) => {
  try {
    const cached = GetCache("points");
    if (cached) {
      return cached.Points;
    }
    const token = GetToken();
    const points = await postRequest(`${BASE_URL}/points`, { token, userID });
    SetCache("points", points);
    return points.Points
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

