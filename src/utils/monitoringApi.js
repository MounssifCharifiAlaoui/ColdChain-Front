// src/utils/monitoringApi.js
import api from "./api";

export async function fetchMonitoringData() {
  const res = await api.get("/");
  return res.data;
}
