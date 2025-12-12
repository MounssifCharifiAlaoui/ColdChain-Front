import axios from "axios";
import { getAccessToken, getRefreshToken, logout } from "./authService";

const api = axios.create({
    baseURL: "http://10.223.133.18:8000/api",
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

// Interceptor pour refresh automatique
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Token expiré ?
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refresh = getRefreshToken();
            if (!refresh) {
                logout();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {
                const res = await axios.post("http://10.40.14.18:8000/api/token/refresh/", {
                    refresh,
                });

                localStorage.setItem("access", res.data.access);

                // Recommencer la requête initiale
                originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
                return api(originalRequest);
            } catch (e) {
                console.error("Erreur lors du refresh token :", e);
                logout();
                window.location.href = "/login";
            }

        }

        return Promise.reject(error);
    }
);

export default api;
