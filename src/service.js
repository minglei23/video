// Mock data for series list
const mockSeriesList = [
    {
      id: 0,
      name: 'Test 1',
      total_number: 3,
      image: 'https://dc4ef1i295q51.cloudfront.net/image_0.jpg'
    },
    {
      id: 1,
      name: 'Test 2',
      total_number: 3,
      image: 'https://dc4ef1i295q51.cloudfront.net/image_1.jpg'
    },
  ];

  export const GetSeriesList = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockSeriesList);
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
  
  