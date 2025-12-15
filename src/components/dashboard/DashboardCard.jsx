import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DashboardCard({
  title,
  icon,
  color,
  gradientFrom,
  gradiantMiddle,
  gradientTo,
  value,
  avgValue,
  unit,
  variation
}) {
  return (
<div
  className="card rounded-4 p-3"
  style={{
    background: `linear-gradient(135deg, ${gradientFrom}, ${gradiantMiddle}, ${gradientTo})`,
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
    border: "1px solid #E5E7EB"
  }}
>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-3 px-3 py-2 text-white"
            style={{ backgroundColor: color }}
          >
            <i className={`${icon} fs-4`}></i>
          </div>

          <div className="lh-sm">
            <p className="fw-semibold text-secondary mb-0">{title}</p>
            <p className="fw-bold mb-0" style={{ color }}>
              Actuelle
            </p>
          </div>
        </div>

        {/* Variation */}
        <span
          className="badge px-3 py-2"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: variation.startsWith("-") ? "#d9534f" : "#5cb85c",
            fontSize: "0.9rem"
          }}
        >
          <i className="bi bi-graph-up-arrow me-1"></i>
          {variation}
        </span>
      </div>

      {/* BODY */}
      <div className="d-flex justify-content-around text-center">
        
        {/* Current */}
        <div>
          <div style={{ width: 80, height: 80, margin: "0 auto" }}>
            <CircularProgressbar
              value={value}
              maxValue={unit === "°C" ? 50 : 100}
              text={`${value}${unit}`}
              styles={buildStyles({
                textColor: "#444",
                pathColor: color,
                trailColor: "#eee"
              })}
            />
          </div>
          <p className="small text-secondary mt-2">Actuelle</p>
        </div>

        {/* Average */}
        <div>
          <div style={{ width: 80, height: 80, margin: "0 auto" }}>
            <CircularProgressbar
              value={avgValue}
              maxValue={unit === "°C" ? 50 : 100}
              text={`${avgValue}${unit}`}
              styles={buildStyles({
                textColor: "#444",
                pathColor: "#999",
                trailColor: "#eee"
              })}
            />
          </div>
          <p className="small text-secondary mt-2">Moyenne 24h</p>
        </div>

      </div>
    </div>
  );
}
