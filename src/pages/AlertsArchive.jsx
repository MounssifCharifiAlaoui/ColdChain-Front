import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AlertsArchive.css";

export default function AlertsArchive() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="p-5 text-center text-muted">
        Chargement des archives...
      </div>
    );
  }

  return (
    <div className="alerts-archive px-4 py-5">

      {/* HEADER */}
      <div className="archive-header mb-4">
        <div>
          <h3 className="fw-bold mb-1">Archive des alertes</h3>
          <p className="text-muted mb-0">
            Historique des incidents résolus
          </p>
        </div>

        <Link to="/alerts" className="btn btn-outline-primary btn-sm px-3">
          ← Retour aux alertes
        </Link>
      </div>

      {/* CONTENT */}
      {alerts.length === 0 ? (
        <div className="archive-empty">
          Aucune alerte archivée
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="card archive-card p-4 rounded-4">
              <div className="d-flex justify-content-between align-items-start">

                <div>
                  <h6 className="archive-title">
                    {alert.title}
                  </h6>
                  <p className="archive-description">
                    {alert.description}
                  </p>
                </div>

                <span className="archive-badge">
                  Résolue
                </span>
              </div>

              <div className="row archive-meta mt-3">
                <div className="col-md-3">
                  <span>Valeur</span>
                  <strong>{alert.value}</strong>
                </div>
                <div className="col-md-3">
                  <span>Seuil</span>
                  <strong>{alert.threshold}</strong>
                </div>
                <div className="col-md-4">
                  <span>Résolue</span>
                  <strong>{alert.resolved_at}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
