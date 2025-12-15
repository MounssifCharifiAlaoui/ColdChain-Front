import React, { useState } from "react";
import "./MonitoringFilters.css";

export default function MonitoringFilters({ onFilter }) {
  const [selected, setSelected] = useState("24h");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSelect = (filter) => {
    setSelected(filter);
    if (filter !== "custom") {
      onFilter(filter);
    }
  };

  const applyCustomFilter = () => {
    if (!startDate || !endDate) return;
    onFilter({
      type: "custom",
      start: startDate,
      end: endDate,
    });
  };

  const resetCustomFilter = () => {
    setStartDate("");
    setEndDate("");
    setSelected("24h");
    onFilter("24h");
  };

  return (
    <div className="card monitoring-filter-card p-4 mb-4 rounded-4">

      {/* Titre */}
      <h6 className="filter-title mb-3">Filtrer les données</h6>

      {/* Barre des filtres */}
      <div className="d-flex gap-3 flex-wrap mb-3">
        {[
          { key: "24h", label: "24 heures" },
          { key: "7d", label: "7 jours" },
          { key: "30d", label: "30 jours" },
          { key: "custom", label: "Personnalisé" },
        ].map((item) => (
          <button
            key={item.key}
            className={`btn filter-pill ${
              selected === item.key ? "active" : ""
            }`}
            onClick={() => handleSelect(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Champs personnalisés */}
      {selected === "custom" && (
        <div className="custom-filter-box mt-3">
          <div className="row g-3 align-items-end">

            <div className="col-md-4">
              <label className="form-label">Date début</label>
              <input
                type="date"
                className="form-control filter-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Date fin</label>
              <input
                type="date"
                className="form-control filter-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="col-md-4 d-flex gap-2">
              <button
                className="btn btn-primary w-100"
                onClick={applyCustomFilter}
              >
                Filtrer
              </button>

              <button
                className="btn btn-outline-dark w-100"
                onClick={resetCustomFilter}
              >
                Réinitialiser
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
