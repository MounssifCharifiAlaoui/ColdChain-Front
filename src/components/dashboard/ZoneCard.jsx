import React from "react";

export default function ZoneCard({
  zone = "Salon",
  temp = null,
  hum = null,
  status = "online" // "online" | "warning" | "offline"
}) {

  const STATUS = {
    online: { color: "#28a745", label: "En ligne" },
    warning: { color: "#fd7e14", label: "Attention" },
    offline: { color: "#dc3545", label: "Hors ligne" },
  };

  const currentStatus = STATUS[status] || STATUS.online;

  const formatValue = (value, unit) =>
    value !== null && value !== undefined ? `${value}${unit}` : "--";

  return (
    <div className="card shadow-sm rounded-4 p-4 w-100" style={{border : "solid 1px #e8e8e4"}}>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="text-secondary fw-semibold mb-0">{zone}</h5>

        <span
          title={currentStatus.label}
          className="rounded-circle"
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: currentStatus.color,
            display: "inline-block",
          }}
        />
      </div>

      {/* TEMP */}
      <div className="d-flex justify-content-between align-items-center mb-1">
        <div className="d-flex align-items-center gap-2 text-muted">
          <i className="bi bi-thermometer-half text-warning"></i>
          <span className="small">Température</span>
        </div>
        <span className="fw-bold text-secondary">
          {formatValue(temp, "°C")}
        </span>
      </div>

      {/* HUMIDITY */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2 text-muted">
          <i className="bi bi-droplet text-primary"></i>
          <span className="small">Humidité</span>
        </div>
        <span className="fw-bold text-secondary">
          {formatValue(hum, "%")}
        </span>
      </div>

    </div>
  );
}
