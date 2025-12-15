// src/components/alertes/AlerteStatusBadge.jsx
import React from "react";
import "./AlerteStatusBadge.css";

export default function AlerteStatusBadge({ status }) {
  const statusClass = {
    anormal: "status-warning",
    critique: "status-danger",
    severe: "status-severe",
  };

  return (
    <span className={`alerte-status-badge ${statusClass[status] || "status-default"}`}>
      {status.toUpperCase()}
    </span>
  );
}
