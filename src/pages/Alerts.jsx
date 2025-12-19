import { useEffect, useState } from "react";
import IncidentStatsCards from "../components/incidents/IncidentStatsCards";
import IncidentList from "../components/incidents/IncidentList";
import ArchiveLink from "../components/incidents/ArchiveLink";
import {fetchActiveIncidents,ackIncident,resolveIncident,} from "../utils/incidentApi";

export default function Alerts() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Charger les incidents
  const loadIncidents = async () => {
    setLoading(true);
    const data = await fetchActiveIncidents();
    setIncidents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const stats = {
    active: incidents.filter(i => i.status === "open").length,
    ack: incidents.filter(i => i.acknowledged).length,
    resolved: 0, // ici seulement les actives
  };

  // ✅ ACK
  const handleAck = async (id) => {
    await ackIncident(id);
    loadIncidents();
  };

  // ✔️ RESOLVE
  const handleResolve = async (id) => {
    await resolveIncident(id);
    loadIncidents();
  };

  if (loading) {
    return <p>Chargement des alertes...</p>;
  }

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-1">Alertes</h3>
      <p className="text-muted mb-4">
        Gestion des alertes et notifications
      </p>

      <ArchiveLink />

      <IncidentStatsCards stats={stats} />

      <IncidentList
        incidents={incidents}
        onAck={handleAck}
        onResolve={handleResolve}
      />
    </div>
  );
}
