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
    <div className="card p-3 shadow-sm rounded-4 mb-4">

      {/* TITRE */}
      <div className="mb-3">
        <h6 className="mb-0 fw-semibold text-secondary">
          Filtres de monitoring
        </h6>
      </div>

      {/* BOUTONS */}
      <div className="d-flex gap-2 flex-wrap">
        {[
          { key: "24h", label: "24 heures" },
          { key: "7d", label: "7 jours" },
          { key: "30d", label: "30 jours" },
          { key: "custom", label: "Personnalisé" },
        ].map((f) => (
          <button
            key={f.key}
            className={`btn btn-sm ${
              selected === f.key ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handleSelect(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* FILTRE PERSONNALISÉ */}
      {selected === "custom" && (
        <div className="mt-4">

          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label small text-muted">
                Date début
              </label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small text-muted">
                Date fin
              </label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="col-md-4 d-flex gap-2">
              <button
                className="btn btn-success btn-sm flex-fill"
                onClick={applyCustomFilter}
                disabled={!startDate || !endDate}
              >
                Appliquer
              </button>

              <button
                className="btn btn-outline-secondary btn-sm flex-fill"
                onClick={resetCustomFilter}
              >
                Reset
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
