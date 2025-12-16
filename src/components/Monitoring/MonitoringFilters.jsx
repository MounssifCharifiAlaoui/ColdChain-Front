import React, { useState } from "react";

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
    <div className="card p-3 shadow-sm rounded-3 mb-4">

      {/* Barre des filtres */}
      <div className="d-flex gap-3 flex-wrap">

        <button
          className={`btn btn-sm ${selected === "24h" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => handleSelect("24h")}
        >
          24 heures
        </button>

        <button
          className={`btn btn-sm ${selected === "7d" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => handleSelect("7d")}
        >
          7 jours
        </button>

        <button
          className={`btn btn-sm ${selected === "30d" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => handleSelect("30d")}
        >
          30 jours
        </button>

        <button
          className={`btn btn-sm ${selected === "custom" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => handleSelect("custom")}
        >
          Personnalisé
        </button>

      </div>

      {/* Champs personnalisés */}
      {selected === "custom" && (
        <div className="mt-3">

          <div className="row g-3">
            <div className="col-md-5">
              <label className="form-label">Date début</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="col-md-5">
              <label className="form-label">Date fin</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="col-md-2 d-flex align-items-end gap-2">
              <button className="btn btn-success btn-sm w-100" onClick={applyCustomFilter}>
                Filtrer
              </button>

              <button className="btn btn-outline-secondary btn-sm w-100" onClick={resetCustomFilter}>
                Réinitialiser
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
