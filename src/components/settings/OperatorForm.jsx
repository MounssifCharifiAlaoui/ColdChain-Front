// src/components/settings/OperatorForm.jsx
import { useState } from "react";
import { createOperator } from "../../utils/operatorsApi";

export default function OperatorForm({ onCreated }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    escalation_level: 1,
    notify_whatsapp: true,
    notify_telegram: false,
    notify_call: false,
    is_active: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await createOperator(form);

      if (res.status === 200 || res.status === 201) {
        setSuccess("Opérateur créé avec succès. Les accès ont été envoyés par email.");
      }


      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        escalation_level: 1,
        notify_whatsapp: true,
        notify_telegram: false,
        notify_call: false,
        is_active: true,
      });

      onCreated && onCreated();
    } catch (err) {
      setError("Erreur lors de la création de l’opérateur.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      {/* Titre principal */}
      <div className="d-flex align-items-center gap-2 mb-4">
        <div
          className="rounded-4 fw-bolder text-white d-flex align-items-center justify-content-center"
          style={{ width: 40, height: 40, backgroundColor: "#00c1d2" }}
        >
          <i className="bi bi-person-plus"></i>
        </div>
        <h5 className="fw-bold mb-0" style={{color: '#00c1d2'}}>
          Gestion des opérateurs
        </h5>
      </div>

      {/* Sous-card formulaire */}
      <div className="border border-1 rounded p-2" style={{ background: "#effdfb", borderColor : "#96f7e4" }}>
        <h6 className="fw-semibold mb-4">
          Ajouter un opérateur
        </h6>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}

        <form onSubmit={handleSubmit} className="row g-4">

          {/* Nom */}
          <div className="col-md-3">
            <label className="form-label">Nom</label>
            <input
              className="form-control"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Prénom */}
          <div className="col-md-3">
            <label className="form-label">Prénom</label>
            <input
              className="form-control"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="col-md-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Téléphone */}
          <div className="col-md-3">
            <label className="form-label">Téléphone</label>
            <input
              className="form-control"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Rôle */}
          <div className="col-md-6">
            <label className="form-label">Rôle</label>
            <select
              className="form-select"
              name="escalation_level"
              value={form.escalation_level}
              onChange={handleChange}
            >
              <option value={1}>Opérateur — Technical Fridge Manager</option>
              <option value={2}>Superviseur — Site Pharma Manager</option>
              <option value={3}>Manager — Site Manager</option>
            </select>
          </div>

          {/* Statut */}
          <div className="col-md-6 d-flex align-items-center gap-2">
            <div className="form-check mt-4">
              <input
                className="form-check-input"
                type="checkbox"
                name="is_active"
                checked={form.is_active}
                onChange={handleChange}
              />
              <label className="form-check-label fw-semibold">
                Actif
              </label>
            </div>
          </div>

          {/* Canaux */}
          <div className="col-12">
            <label className="form-label mb-2">
              Canaux de notification
            </label>

            <div className="d-flex gap-3 flex-wrap">
              {/* WhatsApp */}
              <label className="border rounded p-3 d-flex align-items-center gap-2 bg-white">
                <input
                  type="checkbox"
                  name="notify_whatsapp"
                  checked={form.notify_whatsapp}
                  onChange={handleChange}
                />
                <i className="bi bi-whatsapp text-success"></i>
                WhatsApp
              </label>

              {/* Telegram */}
              <label className="border rounded p-3 d-flex align-items-center gap-2 bg-white">
                <input
                  type="checkbox"
                  name="notify_telegram"
                  checked={form.notify_telegram}
                  onChange={handleChange}
                />
                <i className="bi bi-telegram text-primary"></i>
                Telegram
              </label>

              {/* Appel */}
              <label className="border rounded p-3 d-flex align-items-center gap-2 bg-white">
                <input
                  type="checkbox"
                  name="notify_call"
                  checked={form.notify_call}
                  onChange={handleChange}
                />
                <i className="bi bi-telephone text-danger"></i>
                Appel
              </label>
            </div>
          </div>

          {/* Bouton */}
          <div className="col-12 text-end">
            <button
              className="btn px-4"
              disabled={loading}
              style={{backgroundColor : "#00c1d2", color : "white"}}
            >
              <i className="bi bi-person-plus me-2"></i>
              {loading ? "Création..." : "Ajouter l’opérateur"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );

}
