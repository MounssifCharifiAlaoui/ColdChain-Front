import api from "./api";

export async function fetchMyProfile() {
  const res = await api.get("/profile/");
  return res.data;
  
}

export async function changePassword(payload) {
  const res = await api.post("/profile/change-password/", payload);
  return res.data;
}



export async function updateMyProfile(payload) {
  const res = await api.put("/profile/update/", payload);
  return res.data;
}

