import React, { useState } from "react";

export default function Filters({ active, setActive }) {
  const items = ["1 heure", "12 heures", "24 heures", "Personnalisé"];
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleReset = () => {
    setStart("");
    setEnd("");
    setActive("1 heure"); // revenir au mode normal
  };

  return (
    <div
      className="card border-0 shadow-sm p-4 mb-4 rounded-4 bg-white"
      style={{ background: "#f9fafb" }}
    >
      <h5 className="fw-semibold text-secondary mb-3">Filtrer les données</h5>

      {/* --- Les boutons du filtre --- */}
      <div className="d-flex gap-3 mb-4 flex-wrap">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`btn rounded-3 px-4 py-2 fw-semibold ${
              active === item
                ? "btn-primary text-white"
                : "btn-light border text-secondary"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* --- Mode personnalisé : Afficher le calendrier --- */}
      {active === "Personnalisé" && (
        <div className="row g-3 align-items-end">

          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">
              Date début
            </label>
            <input
              type="datetime-local"
              className="form-control rounded-3"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">
              Date fin
            </label>
            <input
              type="datetime-local"
              className="form-control rounded-3"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>

          <div className="col-md-3 d-flex">
            <button
              className="btn btn-dark rounded-3 px-4 fw-semibold ms-auto"
              onClick={handleReset}
            >
              Réinitialiser
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
