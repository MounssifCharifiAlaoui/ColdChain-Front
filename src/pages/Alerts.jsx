import IncidentStatsCards from "../components/incidents/IncidentStatsCards";
import IncidentList from "../components/incidents/IncidentList";
import ArchiveLink from "../components/incidents/ArchiveLink";

export default function Alerts() {
  // 🔧 MOCK DATA (API plus tard)
  const stats = {
    active: 1,
    ack: 1,
    resolved: 2,
  };

  const incidents = [
    {
      id: 1,
      severity: "élevée",
      status: "open",
      peak_temp: 26.5,
      escalation_count: 1,
      created_at: new Date(),
    },
  ];

  const handleAck = (id) => {
    console.log("ACK incident", id);
  };

  const handleResolve = (id) => {
    console.log("RESOLVE incident", id);
  };

  return (
    <div className="container py-4">

      {/* Header */}
      <h3 className="fw-bold mb-1">Alertes</h3>
      <p className="text-muted mb-4">
        Gestion des alertes et notifications
      </p>

      {/* Stats */}
      <IncidentStatsCards stats={stats} />

      {/* List */}
      <IncidentList
        incidents={incidents}
        onAck={handleAck}
        onResolve={handleResolve}
      />

      {/* Archive */}
      <ArchiveLink />

    </div>
  );
}
