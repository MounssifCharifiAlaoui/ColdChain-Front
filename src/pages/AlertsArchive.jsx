import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AlertsArchive() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⚠️ TEMPORAIRE : données mock
  // Tu remplaceras par un fetch API plus tard
  useEffect(() => {
    setTimeout(() => {
      setAlerts([
        {
          id: 1,
          title: "Température élevée",
          description: "Dépassement du seuil max",
          value: "28.5°C",
          threshold: "25°C",
          resolved_at: "Il y a 2 jours",
        },
        {
          id: 2,
          title: "Température basse",
          description: "Température sous le seuil min",
          value: "1.2°C",
          threshold: "2°C",
          resolved_at: "Il y a 5 jours",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="p-5 text-center text-secondary">
        Chargement des archives...
      </div>
    );
  }

  return (
    <div className="px-4 py-5" style={{ backgroundColor: "#f4f8fd" }}>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Archive des alertes</h3>
          <p className="text-muted mb-0">
            Historique des incidents résolus
          </p>
        </div>

        <Link to="/alerts" className="btn btn-outline-primary">
          ← Retour aux alertes
        </Link>
      </div>

      {/* Liste des alertes */}
      {alerts.length === 0 ? (
        <div className="text-center text-muted p-5">
          Aucune alerte archivée
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="card shadow-sm border-0"
              style={{ backgroundColor: "#ecfdf5" }}
            >
              <div className="card-body">

                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="fw-semibold mb-1">
                      {alert.title}
                    </h6>
                    <p className="text-muted mb-2">
                      {alert.description}
                    </p>
                  </div>

                  <span className="badge bg-success">
                    Résolue
                  </span>
                </div>

                <div className="row mt-3 small text-muted">
                  <div className="col-md-3">
                    <strong>Valeur :</strong> {alert.value}
                  </div>
                  <div className="col-md-3">
                    <strong>Seuil :</strong> {alert.threshold}
                  </div>
                  <div className="col-md-4">
                    <strong>Résolue :</strong> {alert.resolved_at}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
