import api from "./api";

// 🔴 Alertes actives
export async function fetchActiveIncidents() {
  const res = await api.get("/alertes/actives/");
  return res.data;
}

// 📦 Historique
export async function fetchArchivedIncidents() {
  const res = await api.get("/alertes/");
  return res.data;
}

// export async function ackIncident(id) {
//   const res = await api.post(`/alertes/${id}/ack/`);
//   return res.data;
// }
export async function ackIncident(id, payload) {
  const res = await api.post(
    `/alertes/${id}/ack/`,
    {
      comment: payload.comment,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}


// ✔️ Résoudre
export async function resolveIncident(id) {
  const res = await api.post(`/alertes/${id}/resolve/`);
  return res.data;
}
