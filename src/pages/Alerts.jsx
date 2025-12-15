import { useState } from "react";
import IncidentStatsCards from "../components/incidents/IncidentStatsCards";
import IncidentList from "../components/incidents/IncidentList";
import ArchiveLink from "../components/incidents/ArchiveLink";
import AckModal from "../components/alertes/AckModal";

export default function Alerts() {

  // 🔧 MOCK DATA
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

  // 🔑 ACK MODAL STATE
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [comment, setComment] = useState("");
  const [ackLoading, setAckLoading] = useState(false);

  const handleAck = (id) => {
    setSelectedIncident(id);
  };

  const handleConfirmAck = async () => {
    try {
      setAckLoading(true);
      console.log("ACK confirmé pour incident", selectedIncident, comment);
      setSelectedIncident(null);
    } finally {
      setAckLoading(false);
      setComment("");
    }
  };

  const handleResolve = (id) => {
    console.log("RESOLVE incident", id);
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="mb-4">
        <h3 className="fw-bold mb-1">Alertes</h3>
        <p className="text-muted mb-0">
          Gestion des alertes et notifications
        </p>
      </div>

      {/* STATS */}
      <IncidentStatsCards stats={stats} />

      {/* LIST */}
      <IncidentList
        incidents={incidents}
        onAck={handleAck}
        onResolve={handleResolve}
      />

      {/* ARCHIVE LINK */}
      <ArchiveLink />

      {/* ACK MODAL */}
      <AckModal
        show={Boolean(selectedIncident)}
        incidentId={selectedIncident}
        comment={comment}
        setComment={setComment}
        loading={ackLoading}
        onClose={() => setSelectedIncident(null)}
        onConfirm={handleConfirmAck}
      />

    </div>
  );
}
