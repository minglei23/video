
export const SetUser = (value) => {
  const now = new Date();
  const item = {
      value: value,
      expiry: now.getTime() + 24 * 60 * 60 * 1000,
  };
  localStorage.setItem("user", JSON.stringify(item));
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

