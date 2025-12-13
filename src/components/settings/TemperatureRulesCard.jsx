// src/components/settings/TemperatureRulesCard.jsx
import { useEffect, useState } from "react";
import {
  getTemperatureRules,
  updateTemperatureRules,
} from "../../utils/settingsApi";

export default function TemperatureRulesCard() {
  const [rules, setRules] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getTemperatureRules().then(setRules);
  }, []);

  const handleChange = (e) => {
    setRules({ ...rules, [e.target.name]: e.target.value });
  };

  const saveRules = async () => {
    setSaving(true);
    await updateTemperatureRules(rules);
    setSaving(false);
  };

  if (!rules) return <div className="card p-4">Chargement…</div>;

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h5 className="fw-bold mb-3">
        <i className="bi bi-thermometer-half me-2"></i>
        Règles de température
      </h5>

      <div className="row g-3">
        <div className="col-md-6">
          <label>Température normale min (°C)</label>
          <input
            className="form-control"
            name="min_normal"
            value={rules.min_normal}
            onChange={handleChange}
            type="number"
          />
        </div>

        <div className="col-md-6">
          <label>Température normale max (°C)</label>
          <input
            className="form-control"
            name="max_normal"
            value={rules.max_normal}
            onChange={handleChange}
            type="number"
          />
        </div>

        <div className="col-md-6">
          <label>Seuil critique bas (°C)</label>
          <input
            className="form-control"
            name="critical_min"
            value={rules.critical_min}
            onChange={handleChange}
            type="number"
          />
        </div>

        <div className="col-md-6">
          <label>Seuil critique haut (°C)</label>
          <input
            className="form-control"
            name="critical_max"
            value={rules.critical_max}
            onChange={handleChange}
            type="number"
          />
        </div>
      </div>

      <button
        className="btn btn-primary mt-4"
        onClick={saveRules}
        disabled={saving}
      >
        {saving ? "Enregistrement…" : "Enregistrer"}
      </button>
    </div>
  );
}
