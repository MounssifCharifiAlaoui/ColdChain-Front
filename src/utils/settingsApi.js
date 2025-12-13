import api from "./api";

export async function getTemperatureRules() {
  const res = await api.get("/settings/temperature-rules/");
  return res.data;
}

export async function updateTemperatureRules(data) {
  const res = await api.put("/settings/temperature-rules/", data);
  return res.data;
}
