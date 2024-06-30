import axios from "axios";

import config from "./config.json";
import { SECURE_STORAGE_KEY, ROUTES, STORAGE_KEY } from "./constants";

const SERVER = config.SERVER;

const getUpdatedUrl = (url, body = {}) => {
  let newUrl = url;
  const keys = Object.keys(body);
  if (keys.length > 0) {
    newUrl = newUrl + "?";
    for (let i = 0; i < keys.length; i++) {
      newUrl =
        newUrl +
        encodeURIComponent(keys[i]) +
        "=" +
        encodeURIComponent(body[keys[i]]) +
        "&";
    }
    newUrl = newUrl.slice(0, -1);
  }
  return newUrl;
};

const httpRequest = async (method, url, body, config) => {
  try {
    if (method === "get" || method === "delete") {
      url = getUpdatedUrl(url, body);
      body = config;
    }
    const { data: response } = await axios[method](url, body, config);
    return response;
  } catch (err) {
    console.log(err);
    const errCode = err?.code;
    const request = {
      method: err?.config?.method,
      url: err?.config?.url,
      body: err?.config?.data,
      headers: err?.config?.headers?.toJSON?.(),
    };
    if (errCode === "ERR_NETWORK" || errCode === "ECONNREFUSED") {
      throw {
        message: "Network Error",
        request,
      };
    } else if (errCode === "ERR_CANCELED") {
      throw {
        message: "Request Cancelled",
        request,
      };
    } else if (err?.response?.data) {
      throw {
        message: "Bad Request",
        error: err?.response?.data,
        status: err?.response?.status,
        request,
      };
    }
    throw err;
  }
};

const refreshAccessToken = async (navigate) => {
  const refreshToken = localStorage.getItem(SECURE_STORAGE_KEY.REFRESH_TOKEN);
  const userId = localStorage.getItem(STORAGE_KEY.USER_ID);
  try {
    const data = await httpRequest(
      "post",
      `${SERVER}/api/auth/admin/newAccessToken`,
      {
        userId,
        refreshToken,
      },
      {}
    );
    localStorage.setItem(SECURE_STORAGE_KEY.ACCESS_TOKEN, data.accessToken);
    return true;
  } catch (_e) {
    navigate(ROUTES.LOGIN);
    return false;
  }
};

export const requestWithAccessToken =
  (navigate) =>
  async (method, route, body, replayed = false) => {
    const token = localStorage.getItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);
    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const data = await httpRequest(method, `${SERVER}${route}`, body, config);
      return data;
    } catch (err) {
      if (replayed) {
        navigate(ROUTES.LOGIN);
        throw err;
      }
      await refreshAccessToken(navigate);
      const res = await requestWithAccessToken(navigate)(
        method,
        route,
        body,
        true
      );
      return res;
    }
  };

export const request = (navigate) => async (method, route, body) => {
  try {
    const res = await httpRequest(method, `${SERVER}${route}`, body, {});
    return res;
  } catch (err) {
    console.log(err);
    return { error: true };
  }
};

export const requestFileServer =
  (navigation) =>
  async (method, url, body, formData = true, replayed = false) => {
    const token = localStorage.getItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);
    const config = {
      headers: {
        Authorization: token,
        ...(formData && { "content-type": "multipart/form-data" }),
      },
    };
    try {
      const data = await httpRequest(method, url, body, config);
      return data;
    } catch (err) {
      if (err?.status !== 401) {
        throw err;
      }
      if (replayed) {
        navigation.navigate(ROUTES.LOGIN);
        throw err;
      }
      await refreshAccessToken(navigation);
      const res = await requestFileServer(navigation)(
        method,
        url,
        body,
        formData,
        true
      );
      return res;
    }
  };
