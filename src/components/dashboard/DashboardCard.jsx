import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./DashboardCard.css";

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
  const isNegative = variation.startsWith("-");

  return (
    <div
      className="dashboard-card"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradiantMiddle}, ${gradientTo})`
      }}
    >
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="d-flex align-items-center gap-3">
          <div
            className="icon-wrapper"
            style={{ backgroundColor: color }}
          >
            <i className={`${icon} fs-4 text-white`}></i>
          </div>

          <div>
            <div className="dashboard-title">{title}</div>
            <div className="dashboard-subtitle">Valeur actuelle</div>
          </div>
        </div>

        {/* Variation */}
        <span
          className={`variation-badge ${isNegative ? "down" : "up"}`}
        >
          <i className={`bi ${isNegative ? "bi-graph-down-arrow" : "bi-graph-up-arrow"} me-1`}></i>
          {variation}
        </span>
      </div>

      {/* BODY */}
      <div className="dashboard-body">

        {/* Current */}
        <div className="progress-wrapper">
          <CircularProgressbar
            value={value}
            maxValue={unit === "°C" ? 50 : 100}
            text={`${value}${unit}`}
            styles={buildStyles({
              textColor: "#212529",
              pathColor: color,
              trailColor: "rgba(0,0,0,0.08)",
              textSize: "16px"
            })}
          />
          <span className="progress-label">Actuelle</span>
        </div>

        {/* Average */}
        <div className="progress-wrapper">
          <CircularProgressbar
            value={avgValue}
            maxValue={unit === "°C" ? 50 : 100}
            text={`${avgValue}${unit}`}
            styles={buildStyles({
              textColor: "#212529",
              pathColor: "#adb5bd",
              trailColor: "rgba(0,0,0,0.08)",
              textSize: "16px"
            })}
          />
          <span className="progress-label">Moyenne 24h</span>
        </div>

      </div>
    </div>
  );
}
