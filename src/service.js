import md5 from 'js-md5'
import React from 'react';
React.Component.prototype.$md5 = md5

// Mock data for series list
const mockSeriesList = [
    {
      id: 0,
      name: 'Test 1',
      total_number: 5,
      image: 'https://dc4ef1i295q51.cloudfront.net/image_0.jpg'
    },
    {
      id: 1,
      name: 'Test 2',
      total_number: 5,
      image: 'https://dc4ef1i295q51.cloudfront.net/image_1.jpg'
    },
    {
      id: 2,
      name: 'Test 3',
      total_number: 10,
      image: 'https://dc4ef1i295q51.cloudfront.net/image_0.jpg'
    },
    {
      id: 3,
      name: 'Test 4',
      total_number: 10,
      image: 'https://dc4ef1i295q51.cloudfront.net/image_1.jpg'
    },
  ];

  export const GetSeriesList = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          popular: mockSeriesList, 
          type1: mockSeriesList, 
          type2: mockSeriesList, 
          type3: mockSeriesList});
      }, 1000);
    });
  };

  export const GetSeries = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockSeriesList[0]);
      }, 1000);
    });
  };
  
  export const GetVideo = (series_id, n) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://dc4ef1i295q51.cloudfront.net/m_${n}.mp4`);
      }, 1000);
    });
  };

  const BASE_URL = 'http://18.188.120.153:8080';

  export const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({
          'email': email,
          'password': md5(password)
        })
      })
      return await response.json();
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
      return await response.json();
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  };
   