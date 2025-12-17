import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchOperatorById,
  updateOperator
} from "../utils/operatorsApi";

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


  if (!operator) return <p className="p-4">Chargement…</p>;

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Profil du technicien</h3>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/settings")}
        >
          ← Retour à la liste
        </button>
      </div>

      <div className="card p-4 shadow-sm">

        <div className="row g-3">

          <div className="col-md-6">
            <label>Prénom</label>
            <input
              className="form-control"
              name="first_name"
              value={operator.first_name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>Nom</label>
            <input
              className="form-control"
              name="last_name"
              value={operator.last_name}
              onChange={handleChange}
            />
          </div>

          {/* <div className="col-md-6">
            <label>Email</label>
            <input
              className="form-control"
              name="email"
              value={operator.email}
              onChange={handleChange}
            />
          </div> */}
          <div className="col-md-6">
  <label>Email</label>
  <input
    className="form-control"
    value={operator.email}
    disabled
  />
</div>


          <div className="col-md-6">
            <label>Téléphone</label>
            <input
              className="form-control"
              name="phone"
              value={operator.phone}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>Niveau d’escalade</label>
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
          </div>

          <div className="col-md-6">
            <label className="me-2">Actif</label>
            <input
              type="checkbox"
              className="form-check-input"
              name="is_active"
              checked={operator.is_active}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="text-end mt-4">
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
  );
}
