import { useEffect, useState } from "react";
import {
  getTemperatureRules,
  updateTemperatureRules,
} from "../../utils/settingsApi";

export default function TemperatureRulesCard() {
  const [rules, setRules] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getTemperatureRules().then(setRules);
  }, []);

  const handleChange = (e) => {
    setRules({ ...rules, [e.target.name]: Number(e.target.value) });
  };

  const saveRules = async () => {
    setSaving(true);
    await updateTemperatureRules(rules);
    setSaving(false);
    setSuccess("Seuils mis à jour avec succès");
    setTimeout(() => setSuccess(""), 3000);
  };

  if (!rules) return <div className="card p-4">Chargement…</div>;

  return (
    <div className="card shadow-sm p-4 mb-4">

      {/* Titre */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <div
          className="rounded-circle text-white d-flex align-items-center justify-content-center"
          style={{
            width: 42,
            height: 42,
            background: "linear-gradient(135deg, #5b8cff, #7aa2ff)",
          }}
        >
          <i className="bi bi-thermometer-half"></i>
        </div>
        <div>
          <h5 className="fw-bold mb-0 text-primary">
            Seuils de température
          </h5>
          <small className="text-muted">
            Paramétrez les seuils normaux et critiques
          </small>
        </div>
      </div>

      {success && (
        <div className="alert alert-success py-2">{success}</div>
      )}

      {/* Inputs */}
      <div className="row g-3 mb-4">

        {/* Min normal */}
        <div className="col-md-6 col-lg-3">
          <label className="form-label fw-semibold">
            Température minimale (°C)
          </label>
          <input
            type="number"
            className="form-control"
            name="min_normal"
            value={rules.min_normal}
            onChange={handleChange}
          />
          <small className="text-muted">
            Alerte si la température descend en dessous
          </small>
        </div>

        {/* Max normal */}
        <div className="col-md-6 col-lg-3">
          <label className="form-label fw-semibold">
            Température maximale (°C)
          </label>
          <input
            type="number"
            className="form-control"
            name="max_normal"
            value={rules.max_normal}
            onChange={handleChange}
          />
          <small className="text-muted">
            Alerte si la température dépasse
          </small>
        </div>

        {/* Critique bas */}
        <div className="col-md-6 col-lg-3">
          <label className="form-label fw-semibold text-danger">
            Seuil critique bas (°C)
          </label>
          <input
            type="number"
            className="form-control border-danger"
            name="critical_min"
            value={rules.critical_min}
            onChange={handleChange}
          />
          <small className="text-muted">
            Alerte critique immédiate
          </small>
        </div>

        {/* Critique haut */}
        <div className="col-md-6 col-lg-3">
          <label className="form-label fw-semibold text-danger">
            Seuil critique haut (°C)
          </label>
          <input
            type="number"
            className="form-control border-danger"
            name="critical_max"
            value={rules.critical_max}
            onChange={handleChange}
          />
          <small className="text-muted">
            Alerte critique immédiate
          </small>
        </div>

      </div>

      {/* Bouton */}
      <div className="text-end">
        <button
          className="btn btn-primary"
          onClick={saveRules}
          disabled={saving}
        >
          <i className="bi bi-save me-1"></i>
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>

    </div>
  );
}
