import md5 from 'js-md5'
import React from 'react';
React.Component.prototype.$md5 = md5

  const BASE_URL = 'http://127.0.0.1:8080';

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
      console.error('Get Series List failed:', error);
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
      console.error('Get Series failed:', error);
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
      console.error('Login failed:', error);
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
      console.error('Register failed:', error);
      throw error;
    }
  };

  export const RecordLike = async (userID, videoID) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/user-video`, {
        method: 'POST',
        body: JSON.stringify({
          'token': token,
          'userID': userID,
          'videoID': videoID,
          'code': 1,
        })
      })
      return await response.json()
    } catch (error) {
      console.error('Record Like Failed:', error);
      throw error;
    }
  };

  export const RecordWatch = async (userID, videoID) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/user-video`, {
        method: 'POST',
        body: JSON.stringify({
          'token': token,
          'userID': userID,
          'videoID': videoID,
          'code': 2,
        })
      })
      return await response.json()
    } catch (error) {
      console.error('Record Watch Failed:', error);
      throw error;
    }
  };

  export const GetLikeList = async (userID) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/user-video-list`, {
        method: 'POST',
        body: JSON.stringify({
          'token': token,
          'userID': userID,
          'code': 1,
        })
      })
      return await response.json()
    } catch (error) {
      console.error('Get Favorit Failed:', error);
      throw error;
    }
  };
   
  export const GetWatchList = async (userID) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/user-video-list`, {
        method: 'POST',
        body: JSON.stringify({
          'token': token,
          'userID': userID,
          'code': 2,
        })
      })
      return await response.json()
    } catch (error) {
      console.error('Get History Failed:', error);
      throw error;
    }
  };