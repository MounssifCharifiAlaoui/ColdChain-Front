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
      await createOperator(form);

      setSuccess("Opérateur créé avec succès. Les accès ont été envoyés par email.");

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
      <h5 className="fw-bold mb-3">
        <i className="bi bi-person-plus me-2"></i>
        Créer un opérateur
      </h5>

      {error && <div className="alert alert-danger py-2">{error}</div>}
      {success && <div className="alert alert-success py-2">{success}</div>}

      <form onSubmit={handleSubmit} className="row g-3">

        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Prénom"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Nom"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            type="email"
            placeholder="Email (servira de login)"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Téléphone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            name="escalation_level"
            value={form.escalation_level}
            onChange={handleChange}
          >
            <option value={1}>Niveau 1 — Technical Fridge Manager</option>
            <option value={2}>Niveau 2 — Site Pharma Manager</option>
            <option value={3}>Niveau 3 — Site Manager</option>
          </select>
        </div>

        <div className="col-md-6 d-flex align-items-center gap-3">
          <label className="form-check-label">
            <input
              type="checkbox"
              name="notify_whatsapp"
              checked={form.notify_whatsapp}
              onChange={handleChange}
              className="form-check-input me-1"
            />
            WhatsApp
          </label>

          <label className="form-check-label">
            <input
              type="checkbox"
              name="notify_telegram"
              checked={form.notify_telegram}
              onChange={handleChange}
              className="form-check-input me-1"
            />
            Telegram
          </label>

          <label className="form-check-label">
            <input
              type="checkbox"
              name="notify_call"
              checked={form.notify_call}
              onChange={handleChange}
              className="form-check-input me-1"
            />
            Appel
          </label>
        </div>

        <div className="col-md-6">
          <label className="form-check-label">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
              className="form-check-input me-1"
            />
            Opérateur actif
          </label>
        </div>

        <div className="col-12 text-end">
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Création..." : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
}
