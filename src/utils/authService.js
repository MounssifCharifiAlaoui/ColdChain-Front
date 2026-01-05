import api from "./api"; 
import { fetchMyProfile } from "./profileApi";

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
 // 🧠 Récupération du profil
    try {
      const profile = await fetchMyProfile();
      localStorage.setItem("profile", JSON.stringify(profile));

      // ✅ Nom à afficher
      const displayName = profile.operator
        ? `${profile.operator.first_name} ${profile.operator.last_name}`
        : payload.username;

      localStorage.setItem("display_name", displayName);

    } catch {
      // fallback sécurité
      localStorage.setItem("display_name", payload.username);
    }
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
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("profile");
  localStorage.removeItem("display_name");
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
