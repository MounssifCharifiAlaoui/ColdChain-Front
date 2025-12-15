import React, { useState } from "react";
import { ackAlerte } from "../../utils/incidentApi";
import AlerteStatusBadge from "./AlerteStatusBadge";
import AckModal from "./AckModal";
import "./AlerteCard.css";

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
      onAck?.();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’ACK.");
    } finally {
      setAckLoading(false);
    }
  };

  return (
    <div className="card alerte-card p-3 mb-3 rounded-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <span className="alerte-id">Incident #{incident.id}</span>
          <span className="alerte-subtitle">
            Détection automatique
          </span>
        </div>

        <AlerteStatusBadge status={incident.incident_type} />
      </div>

      {/* BODY */}
      <div className="alerte-details mt-3">
        <div>
          Température initiale :
          <span className="fw-semibold ms-1">
            {incident.first_temp}°C
          </span>
        </div>
        <div>
          Escalades :
          <span className="fw-semibold ms-1">
            {incident.escalation_count}
          </span>
        </div>
      </div>

      {/* ACTION */}
      <div className="mt-4 d-flex align-items-center gap-2">
        {!isAcked ? (
          <button
            className="btn btn-primary btn-sm px-4 fw-semibold"
            onClick={openModal}
          >
            ✔ Accuser réception
          </button>
        ) : (
          <span className="badge ack-badge">
            ACK reçu
          </span>
        )}
      </div>

      {/* MODAL */}
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
