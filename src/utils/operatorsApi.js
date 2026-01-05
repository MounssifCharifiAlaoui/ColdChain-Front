import api from "./api";

export async function fetchOperators() {
  const res = await api.get("/settings/operators/");
  return res.data;
}

export async function createOperator(payload) {
  return api.post("/settings/operators/create/", payload);
}


export async function updateOperator(id, payload) {
  const res = await api.put(`/settings/operators/${id}/`, payload);
  return res.data;
}

export async function fetchOperatorById(id) {
  const res = await api.get(`/settings/operators/${id}/detail/`);
  return res.data;
}

