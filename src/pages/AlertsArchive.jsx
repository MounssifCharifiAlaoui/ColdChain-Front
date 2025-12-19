import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchArchivedIncidents } from "../utils/incidentApi";

export default function AlertsArchive() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArchive = async () => {
      setLoading(true);
      const data = await fetchArchivedIncidents();
      setAlerts(data);
      setLoading(false);
    };

    loadArchive();
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

      {/* Liste */}
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
                      Incident #{alert.id} — {alert.severity.toUpperCase()}
                    </h6>
                    <p className="text-muted mb-2">
                      Température max atteinte : {alert.peak_temp} °C
                    </p>
                  </div>

                  <span className="badge bg-success">
                    Résolue
                  </span>
                </div>

                <div className="row mt-3 small text-muted">
                  <div className="col-md-4">
                    <strong>Température initiale :</strong> {alert.first_temp} °C
                  </div>
                  <div className="col-md-4">
                    <strong>Température max :</strong> {alert.peak_temp} °C
                  </div>
                  <div className="col-md-4">
                    <strong>Résolue le :</strong>{" "}
                    {new Date(alert.resolved_at).toLocaleString()}
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
