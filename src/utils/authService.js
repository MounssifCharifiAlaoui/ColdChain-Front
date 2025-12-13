import axios from "axios";

const API_URL = "http://10.40.14.18:8000/api/";

export async function login(username, password) {
  try {
    const res = await axios.post(`${API_URL}token/`, {
      username,
      password,
    });

    const { access, refresh } = res.data;

    // Décoder le payload JWT pour récupérer username / role
    const payload = JSON.parse(atob(access.split(".")[1]));

    // Stockage tokens
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    // Stockage user info
    localStorage.setItem("username", payload.username);
    localStorage.setItem("email", payload.email);
    // localStorage.setItem("role", payload.role); // après

    return true;
  } catch (e) {
    console.error("Erreur Login:", e);
    return false;
  }
}


export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

export function getAccessToken() {
  return localStorage.getItem("access");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh");
}

export function isLogged() {
  const token = localStorage.getItem("access");
  return token !== null; // simple check
}

