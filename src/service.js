import md5 from 'js-md5';
import { SetToken, GetToken, SetCache, GetCache, SetFavorites, SetHistory, SetEpisode, SetDiToken, GetDiToken, SetPaToken, GetPaToken, SetAdminToken } from './cache';
import { GetLanguage, languageName } from './word';

const BASE_URL = 'https://apidev.realshort.tv';

const parseVideo = (video) => {
  const language = GetLanguage();
  const namesParts = video.Name.split(',');
  namesParts.map(part => {
    const [type, name] = part.split('|');
    if (type === "EN") {
      video.Name = name;
    }
    if (type === language && type !== "CN") {
      video.Name = name;
    }
    return name
  });
  if (video.Subtitle) {
    const subtitlesParts = video.Subtitle.split(',');
    const subtitles = subtitlesParts.map(part => {
      return { Type: part, Name: languageName(part) };
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
    const seriesByType = { type1: [], type2: [], type3: [], type4: [], type5: [], type6: [], type7: [], type8: [], type9: [], type10: [] };
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

export const sendVerification = async (email) => {
  try {
    const data = await postRequest(`${BASE_URL}/send-code`, { email });
    return data;
  } catch (error) {
    handleError(error, 'Send Verification Failed:');
  }
};

export const register = async (email, password, verification, referral) => {
  try {
    const hashedPassword = md5(password);
    const data = await postRequest(`${BASE_URL}/register`, { email, password: hashedPassword, verification, referral });
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

export const GetDistribution = async (userID) => {
  try {
    const token = GetDiToken();
    const response = await postRequest(`${BASE_URL}/distribution`, { token, userID });
    return response.DistributionList
  } catch (error) {
    handleError(error, 'Get Distribution Failed:');
  }
};

export const InviteDistributor = async (email, userID) => {
  try {
    const token = GetPaToken();
    const response = await postRequest(`${BASE_URL}/partner-invite`, { email, token, userID });
    return response.Code
  } catch (error) {
    handleError(error, 'Invite Partner Failed:');
  }
};

export const GetPartnerList = async (userID) => {
  try {
    const token = GetPaToken();
    const response = await postRequest(`${BASE_URL}/partner`, { token, userID });
    return response.DistributionList
  } catch (error) {
    handleError(error, 'Get Partner Failed:');
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

export const dilogin = async (email, password) => {
  try {
    const hashedPassword = md5(password);
    const data = await postRequest(`${BASE_URL}/di-login`, { email, password: hashedPassword });
    SetDiToken(data.Token);
    return data;
  } catch (error) {
    handleError(error, 'DiLogin Failed:');
  }
};

export const palogin = async (email, password) => {
  try {
    const hashedPassword = md5(password);
    const data = await postRequest(`${BASE_URL}/pa-login`, { email, password: hashedPassword });
    SetPaToken(data.Token);
    return data;
  } catch (error) {
    handleError(error, 'PaLogin Failed:');
  }
};

export const adminlogin = async (admin) => {
  try {
    const data = await postRequest(`${BASE_URL}/admin-login`, { admin });
    SetAdminToken(data.Token);
    return data;
  } catch (error) {
    handleError(error, 'AdminLogin Failed:');
  }
};

export const diregister = async (email, password, paypal, telegram, verification, partner) => {
  try {
    const hashedPassword = md5(password);
    const data = await postRequest(`${BASE_URL}/di-register`, { email, password: hashedPassword, paypal, telegram, verification, partner });
    SetDiToken(data.Token);
    return data;
  } catch (error) {
    handleError(error, 'DiRegister Failed:');
  }
};

function inEncrypt(data) {
  const sortedKeys = Object.keys(data).sort();
  const queryString = sortedKeys.map(key => `${key}=${data[key]}`).join('&');
  const stringSignTemp = `${queryString}&key=2bb798dfd8b34978b0f518897de00f8c`;
  const sign = md5(stringSignTemp).toLowerCase();
  return sign;
}

function encrypt(data, key) {
  const stringSignTemp = data['merchant_no'] + data['params'] + 'MD5' + data['timestamp'] + key;
  const sign = md5(stringSignTemp).toLowerCase();
  return sign;
}

export const getInPayLink = async (userID, productID, amount) => {
  const timestamp = Date.now();
  const data = {
    'version': '1.0',
    'mch_id': '200888029',
    'notify_url': 'https://apidev.realshort.tv/in-webhook',
    'mch_order_no': `${userID}-${productID}-${timestamp}`,
    'pay_type': '203',
    'trade_amount': amount.toString(),
    'order_date': new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    'goods_name': 'RealShort VIP'
  };
  const sign = inEncrypt(data);
  data['sign_type'] = 'MD5';
  data['sign'] = sign;
  const formData = new URLSearchParams(data).toString();
  const response = await fetch('https://api.ffpays.com/pay/web', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData,
  });
  if (!response.ok) throw new Error('Network response was not ok.');
  const responseJson = await response.json();
  console.log('test', responseJson)
  return responseJson.payInfo
};

export const getMaPayLink = async (userID, productID, amount) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const data = {
    'merchant_no': `3110017`,
    'timestamp': timestamp,
    'params': `{"merchant_ref":"${userID}-${productID}-${timestamp}","product":"TNG","amount":"${Math.floor(amount)}","extra":{"user_id":"${userID}"},"extend_params":"${productID}"}`,
  };
  const sign = encrypt(data, "2006b99ba7567f451b1b952146e26f45");
  data['sign_type'] = 'MD5';
  data['sign'] = sign;
  const formData = new URLSearchParams(data).toString();
  const response = await fetch('https://api.66pays.com/api/gateway/pay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData,
  });
  if (!response.ok) throw new Error('Network response was not ok.');
  const responseJson = await response.json();
  const responseParams = JSON.parse(responseJson.params);
  return responseParams.payurl;
};

export const getThPayLink = async (userID, productID, amount) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const data = {
    'merchant_no': `130117`,
    'timestamp': timestamp,
    'params': `{"merchant_ref":"${userID}-${productID}-${timestamp}","product":"ThaiQR","amount":"${Math.floor(amount)}","extra":{"user_id":"${userID}"},"extend_params":"${productID}"}`,
  };
  const sign = encrypt(data, "a7670921b7392170b81481b777a0dddf");
  data['sign_type'] = 'MD5';
  data['sign'] = sign;
  const formData = new URLSearchParams(data).toString();
  const response = await fetch('https://api.sringpay.com/api/gateway/pay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData,
  });
  if (!response.ok) throw new Error('Network response was not ok.');
  const responseJson = await response.json();
  const responseParams = JSON.parse(responseJson.params);
  return responseParams.payurl;
};
