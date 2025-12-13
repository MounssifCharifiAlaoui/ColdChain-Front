import React, { useState } from "react";
import { ackAlerte } from "../../utils/incidentApi";
import AlerteStatusBadge from "./AlerteStatusBadge";
import AckModal from "./AckModal";

export default function AlerteCard({ incident, onAck }) {
  const [showAck, setShowAck] = useState(false);
  const [comment, setComment] = useState("");
  const [ackLoading, setAckLoading] = useState(false);
  const isAcked = Boolean(incident.acknowledged);

  const openModal = () => {
    setComment("");
    setShowAck(true);
  };

  const closeModal = () => {
    if (!ackLoading) setShowAck(false);
  };

  const confirmAck = async () => {
    try {
      setAckLoading(true);
      await ackAlerte(incident.id, comment);
      setShowAck(false);
      onAck?.(); // refresh liste
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’ACK.");
    } finally {
      setAckLoading(false);
    }
  };

  return (
    <div className="card shadow-sm mb-3 p-3">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Incident #{incident.id}</h5>
        <AlerteStatusBadge status={incident.incident_type} />
      </div>

      <div className="mt-2 text-muted">
        <div>Température initiale : <b>{incident.first_temp}°C</b></div>
        <div>Escalades : <b>{incident.escalation_count}</b></div>
      </div>

      <div className="mt-3 d-flex align-items-center gap-2">
        {!isAcked ? (
          <button className="btn btn-sm btn-primary" onClick={openModal}>
            ✔ Accuser réception
          </button>
        ) : (
          <span className="badge bg-success">ACK reçu</span>
        )}
      </div>

      {/* Modal ACK */}
      <AckModal
        show={showAck}
        onClose={closeModal}
        onConfirm={confirmAck}
        loading={ackLoading}
        incidentId={incident.id}
        comment={comment}
        setComment={setComment}
      />
    </div>
  );
}
