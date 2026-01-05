import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOperatorById, updateOperator } from "../utils/operatorsApi";

export default function OperatorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [operator, setOperator] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchOperatorById(id).then(setOperator);
  }, [id]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    setOperator((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        first_name: operator.first_name,
        last_name: operator.last_name,
        phone: operator.phone,
        escalation_level: operator.escalation_level,
        is_active: operator.is_active,
      };

      await updateOperator(id, payload);

      alert("Profil mis à jour avec succès");
    } catch (e) {
      console.error("Erreur mise à jour opérateur", e.response?.data);
      alert(JSON.stringify(e.response?.data, null, 2));
    } finally {
      setSaving(false);
    }
  };

  if (!operator)
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <div className="spinner-border" role="status" />
          <div className="text-muted mt-3">Chargement…</div>
        </div>
      </div>
    );

  return (
    <div className="container py-4 py-md-5">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h3 className="fw-bold mb-1">Profil du technicien</h3>
          <div className="text-muted">
            Modifier les informations et le niveau d’escalade
          </div>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/settings")}
          >
            ← Retour à la liste
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
                Enregistrement…
              </>
            ) : (
              "Enregistrer"
            )}
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4 p-md-5">
          {/* Mini badges */}
          <div className="d-flex flex-wrap gap-2 mb-4">
            <span className="badge text-bg-light border">
              ID: {operator.id ?? id}
            </span>
            <span
              className={`badge rounded-pill px-3 py-2 ${
                operator.is_active ? "text-bg-success" : "text-bg-secondary"
              }`}
            >
              {operator.is_active ? "Actif" : "Inactif"}
            </span>
            <span className="badge text-bg-light border">
              Niveau: {operator.escalation_level ?? "—"}
            </span>
          </div>

          {/* Form */}
          <div className="row g-4">
            {/* Prénom */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Prénom</label>
              <input
                className="form-control"
                name="first_name"
                value={operator.first_name ?? ""}
                onChange={handleChange}
                placeholder="Ex: Sara"
              />
            </div>

            {/* Nom */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Nom</label>
              <input
                className="form-control"
                name="last_name"
                value={operator.last_name ?? ""}
                onChange={handleChange}
                placeholder="Ex: El Amrani"
              />
            </div>

            {/* Email (readonly) */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Email</label>
              <input
                className="form-control bg-light"
                value={operator.email ?? "—"}
                readOnly
              />
              <div className="form-text">
                L’email n’est pas modifiable ici.
              </div>
            </div>

            {/* Téléphone */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Téléphone</label>
              <input
                className="form-control"
                name="phone"
                value={operator.phone ?? ""}
                onChange={handleChange}
                placeholder="Ex: +212 6xx xx xx xx"
              />
            </div>

            {/* Niveau d’escalade */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Niveau d’escalade</label>
              <select
                className="form-select"
                name="escalation_level"
                value={operator.escalation_level}
                onChange={handleChange}
              >
                <option value={1}>Niveau 1</option>
                <option value={2}>Niveau 2</option>
                <option value={3}>Niveau 3</option>
              </select>
              <div className="form-text">
                Définit l’ordre de notification en cas d’alerte.
              </div>
            </div>

            {/* Actif (switch) */}
            <div className="col-12 col-md-6 d-flex align-items-end">
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="is_active"
                  name="is_active"
                  checked={!!operator.is_active}
                  onChange={handleChange}
                />
                <label className="form-check-label fw-semibold" htmlFor="is_active">
                  Compte actif
                </label>
                <div className="text-muted small mt-1">
                  Désactive pour empêcher la réception des escalades.
                </div>
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <hr className="my-4" />

          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
            <div className="text-muted small">
              Pense à enregistrer après modification.
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/settings")}
              >
                Annuler
              </button>

              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
