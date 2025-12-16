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
      <h5 className="fw-bold mb-3">
        <i className="bi bi-thermometer-half me-2"></i>
        Seuils de température
      </h5>

      {success && <div className="alert alert-success py-2">{success}</div>}

      <div className="row g-3">

        <div className="col-md-6">
          <label>Température MIN normale (°C)</label>
          <input
            type="number"
            className="form-control"
            name="min_normal"
            value={rules.min_normal}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label>Température MAX normale (°C)</label>
          <input
            type="number"
            className="form-control"
            name="max_normal"
            value={rules.max_normal}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label>Seuil critique bas (°C)</label>
          <input
            type="number"
            className="form-control"
            name="critical_min"
            value={rules.critical_min}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label>Seuil critique haut (°C)</label>
          <input
            type="number"
            className="form-control"
            name="critical_max"
            value={rules.critical_max}
            onChange={handleChange}
          />
        </div>

      </div>

      <div className="text-end mt-4">
        <button
          className="btn btn-primary"
          onClick={saveRules}
          disabled={saving}
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}
