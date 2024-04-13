
export const SetUser = (value) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 24 * 60 * 60 * 1000,
  };
  localStorage.setItem("user", JSON.stringify(item));
};

export const SetUserVIP = () => {
  const itemStr = localStorage.getItem("user");
  if (itemStr) {
    const item = JSON.parse(itemStr);
    item.value.VIP = true;
    localStorage.setItem("user", JSON.stringify(item));
  }
};

export const GetUser = () => {
  const itemStr = localStorage.getItem("user");
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("user");
    return null;
  }
  return item.value;
};

export const SetToken = (value) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 24 * 60 * 60 * 1000,
  };
  localStorage.setItem("token", JSON.stringify(item));
};

export const GetToken = () => {
  const itemStr = localStorage.getItem("token");
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("token");
    return null;
  }
  return item.value;
};

export const SetHistory = (key, value) => {
  const item = {
    value: value
  };
  localStorage.setItem("history" + key, JSON.stringify(item));
};

export const GetHistory = (key) => {
  const itemStr = localStorage.getItem("history" + key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  return item.value;
};

export const SetEpisode = (key, value) => {
  const item = {
    value: value
  };
  localStorage.setItem("episode" + key, JSON.stringify(item));
};

export const GetEpisode = (key) => {
  const itemStr = localStorage.getItem("episode" + key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  return item.value;
};

export const SetFavorites = (key) => {
  const item = {
    value: true
  };
  localStorage.setItem("favorites" + key, JSON.stringify(item));
};

export const RemoveFavorites = (key) => {
  localStorage.removeItem("favorites" + key);
};

export const GetFavorites = (key) => {
  const itemStr = localStorage.getItem("favorites" + key);
  if (!itemStr) {
    return false;
  }
  const item = JSON.parse(itemStr);
  return item.value;
};

export const SetCache = (key, value) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 60 * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const GetCache = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const FetchAndCacheVideo = async (series, episode) => {
  const videoUrl = `${series.BaseURL}/${episode}.mp4`;
  fetch(videoUrl)
    .then(response => response.blob())
    .then(blob => {
      const localUrl = URL.createObjectURL(blob);
      localStorage.setItem('cache-url', localUrl);
      localStorage.setItem('cache-video', JSON.stringify(series));
      localStorage.setItem('cache-episode', episode);
      localStorage.setItem('download-complete', 'true');
    })
    .catch(error => {
      console.error('Error caching video:', error);
      localStorage.setItem('download-complete', 'false');
    });
};

export const SetDistributor = (value) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 24 * 60 * 60 * 1000,
  };
  localStorage.setItem("distributor", JSON.stringify(item));
};

export const GetDistributor = () => {
  const itemStr = localStorage.getItem("distributor");
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("distributor");
    return null;
  }
  return item.value;
};

export const SetPartner = (value) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 24 * 60 * 60 * 1000,
  };
  localStorage.setItem("partner", JSON.stringify(item));
};

export const GetPartner = () => {
  const itemStr = localStorage.getItem("partner");
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("partner");
    return null;
  }
  return item.value;
};

export const SetAdmin = (value) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 24 * 60 * 60 * 1000,
  };
  localStorage.setItem("admin", JSON.stringify(item));
};

export const GetAdmin = () => {
  const itemStr = localStorage.getItem("admin");
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("admin");
    return null;
  }
  return item.value;
};

export const SetDiToken = (value) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 24 * 60 * 60 * 1000,
  };
  localStorage.setItem("ditoken", JSON.stringify(item));
};

export const GetDiToken = () => {
  const itemStr = localStorage.getItem("ditoken");
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("ditoken");
    return null;
  }
  return item.value;
};

export const SetAdminToken = (value) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 24 * 60 * 60 * 1000,
  };
  localStorage.setItem("admintoken", JSON.stringify(item));
};

export const GetAdminToken = () => {
  const itemStr = localStorage.getItem("admintoken");
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("admintoken");
    return null;
  }
  return item.value;
};

export const SetPaToken = (value) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 24 * 60 * 60 * 1000,
  };
  localStorage.setItem("patoken", JSON.stringify(item));
};

export const GetPaToken = () => {
  const itemStr = localStorage.getItem("patoken");
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("patoken");
    return null;
  }
  return item.value;
};
