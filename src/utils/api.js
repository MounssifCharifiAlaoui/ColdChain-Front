import axios from "axios";
import { getAccessToken, getRefreshToken, logout } from "./authService";

const api = axios.create({
  baseURL: "http://10.40.14.18:8000/api", // ✅ UNE SEULE IP
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = getRefreshToken();
      if (!refresh) {
        logout();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          "http://10.40.14.18:8000/api/token/refresh/",
          { refresh }
        );

        localStorage.setItem("access", res.data.access);
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return api(originalRequest);

      } catch {
        logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
