import React, { useState } from "react";

export default function MonitoringFilters({ onFilter }) {
  const [selected, setSelected] = useState("all");
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
    setSelected("all");
    onFilter("all");

  };

  const activeLabel = {
    all: "Tous les données",
    "7d": "7 derniers jours",
    "30d": "30 derniers jours",
    "custom": "Période personnalisée",
  };

  return (
    <div className="card p-3 shadow-sm rounded-4 mb-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0 fw-semibold text-secondary">
          Filtres de monitoring
        </h6>
        <span className="badge bg-light text-secondary">
          {activeLabel[selected]}
        </span>
      </div>

      {/* QUICK FILTERS */}
      <div className="d-flex gap-2 flex-wrap">
        {[
          { key: "all", label: "Tous" },
          { key: "7d", label: "7j" },
          { key: "30d", label: "30j" },
          { key: "custom", label: "Personnalisé" },
        ].map((f) => (
          <button
            key={f.key}
            className={`btn btn-sm ${selected === f.key ? "btn-primary" : "btn-outline-primary"
              }`}
            onClick={() => handleSelect(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* CUSTOM FILTER */}
      {selected === "custom" && (
        <div className="mt-4 border-top pt-3">

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
                className="btn btn-outline-dark btn-sm flex-fill"
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
