import md5 from 'js-md5'
import React from 'react';
React.Component.prototype.$md5 = md5

const BASE_URL = 'http://18.188.120.153:8080';

export const GetSeriesList = async () => {
  try {
    let data = {};
    const cachedData = localStorage.getItem('seriesListCache');
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      if (new Date().getTime() - parsedData.timestamp < 3600000) {
        data = parsedData.data;
      }
    }
    if (!cachedData || Object.keys(data).length === 0) {
      const response = await fetch(`${BASE_URL}/video-list`, {
        method: 'GET',
      });
      data = await response.json();
      localStorage.setItem('seriesListCache', JSON.stringify({
        data: data,
        timestamp: new Date().getTime()
      }));
    }
    const seriesByType = {
      type1: [],
      type2: [],
      type3: []
    };

    data.VideoList.forEach(video => {
      const typeKey = `type${video.Type}`;
      if (seriesByType[typeKey]) {
        seriesByType[typeKey].push(video);
      }
    });
    return seriesByType;
  } catch (error) {
    console.error('Get Series List Failed:', error);
    throw error;
  }
};

export const GetSeries = async (id) => {
  try {
    let data = {};
    const cachedData = localStorage.getItem('seriesListCache');
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      if (new Date().getTime() - parsedData.timestamp < 3600000) {
        data = parsedData.data;
      }
    }
    if (!cachedData || Object.keys(data).length === 0) {
      const response = await fetch(`${BASE_URL}/video-list`, {
        method: 'GET',
      });
      data = await response.json();
      localStorage.setItem('seriesListCache', JSON.stringify({
        data: data,
        timestamp: new Date().getTime()
      }));
    }
    for (const video of data.VideoList) {
      if (String(id) === String(video.ID)) {
        return video;
      }
    }
    return null;
  } catch (error) {
    console.error('Get Series Failed:', error);
    throw error;
  }
};


export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({
        'email': email,
        'password': md5(password)
      })
    })
    const data = await response.json()
    localStorage.setItem('token', data.Token)
    return data
  } catch (error) {
    console.error('Login Failed:', error);
    throw error;
  }
};

export const register = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({
        'email': email,
        'password': md5(password)
      })
    })
    const data = await response.json()
    localStorage.setItem('token', data.Token)
    return data
  } catch (error) {
    console.error('Register Failed:', error);
    throw error;
  }
};

export const RecordFavorites = async (userID, videoID) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/record-avorites`, {
      method: 'POST',
      body: JSON.stringify({
        'token': token,
        'userID': userID,
        'videoID': videoID
      })
    })
    return await response.json()
  } catch (error) {
    console.error('Record Favorites Failed:', error);
    throw error;
  }
};

export const RecordHistory = async (userID, videoID, episode) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/record-history`, {
      method: 'POST',
      body: JSON.stringify({
        'token': token,
        'userID': userID,
        'videoID': videoID,
        'episode': episode,
      })
    })
    return await response.json()
  } catch (error) {
    console.error('Record History Failed:', error);
    throw error;
  }
};

export const Favorites = async (userID) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/favorites`, {
      method: 'POST',
      body: JSON.stringify({
        'token': token,
        'userID': userID,
      })
    })
    return await response.json()
  } catch (error) {
    console.error('Favorites Failed:', error);
    throw error;
  }
};

export const History = async (userID) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/history`, {
      method: 'POST',
      body: JSON.stringify({
        'token': token,
        'userID': userID,
      })
    })
    return await response.json()
  } catch (error) {
    console.error('History Failed:', error);
    throw error;
  }
};