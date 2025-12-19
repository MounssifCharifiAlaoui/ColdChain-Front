import { useState } from "react";
import api from "../utils/api";
import "./TestTemperatureForm.css";

export default function TestTemperatureForm() {
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await api.post("/post", {
        temp: parseFloat(temperature),
        hum: parseFloat(humidity || 0),
      });

      setMessage("success");
      setTemperature("");
      setHumidity("");
    } catch (error) {
      console.error(error);
      setMessage("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="test-form-card">

      {/* Header */}
      <div className="test-form-header">
        <h3>Test Envoi Capteur</h3>
        <p>Simulation manuelle des données de température et d’humidité</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="test-form">

        <div className="form-field">
          <label>Température (°C)</label>
          <input
            type="number"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="Ex: 3.5"
            required
          />
        </div>

        <div className="form-field">
          <label>Humidité (%)</label>
          <input
            type="number"
            step="1"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            placeholder="Ex: 45"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Envoi en cours…" : "Envoyer les données"}
        </button>
      </form>

      {/* Message */}
      {message === "success" && (
        <div className="form-message success">
          Données envoyées avec succès
        </div>
      )}

      {message === "error" && (
        <div className="form-message error">
          Erreur lors de l’envoi des données
        </div>
      )}

      {/* Help */}
      <div className="test-form-help">
        <strong>Tests rapides :</strong>
        <ul>
          <li><span className="badge normal">3°C</span> → Normal</li>
          <li><span className="badge warning">1°C / 9°C</span> → Critique</li>
          <li><span className="badge danger">-2°C / 12°C</span> → Sévère</li>
        </ul>
      </div>

    </div>
  );
}
