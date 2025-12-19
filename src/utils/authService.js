import api from "./api"; // 🔥 IMPORT DE L'INSTANCE AXIOS CENTRALE

export async function login(username, password) {
  try {
    const res = await api.post("/token/", {
      username,
      password,
    });

    const { access, refresh } = res.data;

    const payload = JSON.parse(atob(access.split(".")[1]));

    // 🔐 Tokens
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    // 👤 Infos user
    localStorage.setItem("username", payload.username);
    localStorage.setItem("email", payload.email);

    // 🔥 ADMIN FLAG
    localStorage.setItem("is_admin", payload.is_staff ? "true" : "false");

    return true;
  } catch (e) {
    console.error("Erreur Login:", e);
    return false;
  }
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("is_admin");
}

export function getAccessToken() {
  return localStorage.getItem("access");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh");
}

export function isLogged() {
  return !!localStorage.getItem("access");
}

export function isAdmin() {
  return localStorage.getItem("is_admin") === "true";
}
