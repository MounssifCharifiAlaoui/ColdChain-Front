// src/components/alertes/AlerteStatusBadge.jsx
import React from "react";

export default function AlerteStatusBadge({ status }) {
  const colors = {
    anormal: "warning",
    critique: "danger",
    severe: "dark",
  };

  return (
    <span className={`badge bg-${colors[status] || "secondary"}`}>
      {status.toUpperCase()}
    </span>
  );
}
