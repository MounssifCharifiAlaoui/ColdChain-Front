import api from "./api";

export async function fetchAlertes() {
  const res = await api.get("/alertes/");
  return res.data;
}

export async function ackAlerte(incidentId, comment = "") {
  const res = await api.post(`/alertes/${incidentId}/ack/`, { comment });
  return res.data;
}
