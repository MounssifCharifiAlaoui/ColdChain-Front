import api from "./api";

export async function fetchEscalationRules() {
  const res = await api.get("/settings/escalation-rules/");
  return res.data;
}

export async function updateEscalationRules(payload) {
  const res = await api.put("/settings/escalation-rules/update/", payload);
  return res.data;
}