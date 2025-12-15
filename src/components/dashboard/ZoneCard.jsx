import React from "react";

export default function ZoneCard({
  zone = "Salon",
  temp = 22.5,
  hum = 58,
  status = "online" // "online", "warning", "offline"
}) {
  
  const statusColor = {
    online: "#28a745",
    warning: "#fd7e14",
    offline: "#dc3545",
  }[status];

  return (
    <div className="card shadow-sm border-1 rounded-4 p-4 w-100">
      
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="text-secondary mb-0">{zone}</h5>

        <span
          className="rounded-circle"
          style={{width: "10px", height: "10px", backgroundColor: statusColor, display: "inline-block",}}>
        </span>
      </div>

      {/* TEMP */}
      <div className="d-flex justify-content-between align-items-center mb-1">
        <div className="d-flex align-items-center gap-2 text-muted">
          <i className="bi bi-thermometer-half text-warning"></i>
          <span className="small">Temp</span>
        </div>
        <span className="fw-bold text-secondary">{temp}°C</span>
      </div>

      {/* HUMIDITY */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2 text-muted">
          <i className="bi bi-droplet text-primary"></i>
          <span className="small">Humid</span>
        </div>
        <span className="fw-bold text-secondary">{hum}%</span>
      </div>

    </div>
  );
}
