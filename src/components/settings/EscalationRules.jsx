import { useEffect, useState } from "react";
import {
  fetchEscalationRules,
  updateEscalationRules
} from "../../utils/escalationRulesApi";

export default function EscalationRules() {
  const [rules, setRules] = useState({
    level_1: 1,
    level_2: 4,
    level_3: 7,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEscalationRules().then(setRules);
  }, []);

  const handleChange = (e) => {
    setRules({ ...rules, [e.target.name]: Number(e.target.value) });
  };

  const handleSave = async () => {
    setSaving(true);
    await updateEscalationRules(rules);
    setSaving(false);
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h5 className="fw-bold mb-3">
        <i className="bi bi-diagram-3 me-2"></i>
        Règles d’escalade
      </h5>

      <div className="row g-3">

        <div className="col-md-4">
          <label className="form-label">Niveau 1</label>
          <input
            type="number"
            className="form-control"
            name="level_1"
            value={rules.level_1}
            onChange={handleChange}
          />
          <small className="text-muted">
            Notifier l’opérateur niveau 1
          </small>
        </div>

        <div className="col-md-4">
          <label className="form-label">Niveau 2</label>
          <input
            type="number"
            className="form-control"
            name="level_2"
            value={rules.level_2}
            onChange={handleChange}
          />
          <small className="text-muted">
            Notifier niveaux 1 + 2
          </small>
        </div>

        <div className="col-md-4">
          <label className="form-label">Niveau 3</label>
          <input
            type="number"
            className="form-control"
            name="level_3"
            value={rules.level_3}
            onChange={handleChange}
          />
          <small className="text-muted">
            Notifier niveaux 1 + 2 + 3
          </small>
        </div>

      </div>

      <div className="text-end mt-4">
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving}
        >
          <i className="bi bi-save me-1"></i>
          Enregistrer
        </button>
      </div>
    </div>
  );
}
