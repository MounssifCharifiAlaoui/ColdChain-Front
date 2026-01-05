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

      {/* Titre */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <div
          className="rounded-3 text-white d-flex align-items-center justify-content-center"
          style={{ width: 42, height: 42, backgroundColor : "#ff7d00" }}
        >
          <i className="bi bi-exclamation-triangle"></i>
        </div>
        <div>
          <h5 className="fw-bold mb-0" style={{color : "#ff7d00"}}>
            Règles d'escalade
          </h5>
          <small className="text-muted">
            Définissez les délais avant l'escalade des alertes non traitées
          </small>
        </div>
      </div>

      {/* Cartes niveaux */}
      <div className="row g-3 mb-4">

        {/* Niveau 1 */}
        <div className="col-md-4">
          <div className="rounded p-3 h-100" style={{ background: "#fffbea", border: "1px solid #fff085" }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge text-white p-2" style={{backgroundColor : "#f0b100"}}>1</span>
              <strong>Niveau 1</strong>
            </div>

            <input
              type="number"
              className="form-control text-center"
              name="level_1"
              value={rules.level_1}
              onChange={handleChange}
              style={{border: "1px solid #fff085" }}
            />

            <small className="text-muted d-block mt-2">
              minutes avant escalade
            </small>
          </div>
        </div>
        {/* Niveau 2 */}
        <div className="col-md-4">
          <div className="rounded p-3 h-100" style={{ background: "#fffbea", border: "1px solid #ffd6a7" }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge text-white p-2" style={{ background: "#ff6900" }}>
                2
              </span>
              <strong>Niveau 2</strong>
            </div>

            <input
              type="number"
              className="form-control text-center"
              name="level_2"
              value={rules.level_2}
              onChange={handleChange}
              style={{border: "1px solid #ffd6a7" }}
            />

            <small className="text-muted d-block mt-2">
              minutes avant escalade
            </small>
          </div>
        </div>

        {/* Niveau 3 */}
        <div className="col-md-4">
          <div className="rounded p-3 h-100" style={{ background: "#fffbea", border :"solid 1px #ffc9c9" }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge text-white p-2" style={{backgroundColor : "#fb2c36"}}>3</span>
              <strong>Niveau 3</strong>
            </div>

            <input
              type="number"
              className="form-control text-center"
              name="level_3"
              value={rules.level_3}
              onChange={handleChange}
               style={{border :"solid 1px #ffc9c9" }}
            />

            <small className="text-muted d-block mt-2">
              minutes avant alerte critique
            </small>
          </div>
        </div>

      </div>

      {/* Info */}
      <div className="alert d-flex gap-2 align-items-start"
      style={{border :"solid 1px #bedbff", backgroundColor :"#eff6ff", color : "#1447e6"}}>
        <i className="bi bi-info-circle mt-1"></i>
        <div>
          <strong>Comment fonctionne l'escalade ?</strong>
          <div className="small">
            Lorsqu'une alerte n'est pas traitée dans le délai défini pour le
            niveau 1, elle est escaladée au niveau 2, puis au niveau 3.
            Chaque niveau peut déclencher des notifications vers des opérateurs
            différents selon leur configuration.
          </div>
        </div>
      </div>

      {/* Bouton sauvegarde */}
      <div className="text-end">
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving}
        >
          <i className="bi bi-save me-1"></i>
          {saving ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>

    </div>
  );
}
