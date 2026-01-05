import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchArchivedIncidents } from "../../utils/incidentApi";

const SEVERITY_STYLE = {
  anormal: {
    label: "ANORMALE",
    bg: "bg-primary-subtle",
    text: "text-primary",
    icon: "bi-exclamation-circle"
  },
  critique: {
    label: "CRITIQUE",
    bg: "bg-warning-subtle",
    text: "", // on gère la couleur en inline
    color: "#c2410c", // 🔥 orange foncé (Tailwind orange-700)
    icon: "bi-exclamation-octagon"
  },
  severe: {
    label: "SÉVÈRE",
    bg: "bg-danger-subtle",
    text: "text-danger",
    icon: "bi-fire"
  }
};
/* 🔹 Format durée (secondes → lisible) */
const formatDuration = (seconds) => {
  if (seconds == null) return "—";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) return `${h}h ${m}min`;
  if (m > 0) return `${m}min ${s}s`;
  return `${s}s`;
};

export default function AlertsArchive() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        <div className="spinner-border text-primary mb-3" />
        <div>Chargement des archives…</div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-5">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">
            <i className="bi bi-archive me-2 text-primary"></i>
            Archives des incidents
          </h3>
          <p className="text-muted mb-0">
            Historique complet des incidents résolus
          </p>
        </div>

        <Link to="/alerts" className="btn btn-outline-primary rounded-pill">
          <i className="bi bi-arrow-left me-1"></i>
          Alertes actives
        </Link>
      </div>

      {alerts.length === 0 ? (
        <div className="text-center text-muted p-5">
          <i className="bi bi-check-circle fs-1 mb-3"></i>
          <div>Aucune alerte archivée</div>
        </div>
      ) : (
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden">

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">

              {/* HEADER */}
              <thead className="table-light">
                <tr className="small text-uppercase text-muted">
                  <th>#</th>
                  <th>Sévérité</th>
                  <th>Temp. initiale</th>
                  <th>Temp. max</th>
                  <th>Durée</th>
                  <th>Résolue le</th>
                  <th className="text-end">Statut</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {alerts.map((alert) => (
                  <tr
                    key={alert.id}
                    onClick={() => navigate(`/alerts/${alert.id}`)}
                    className="cursor-pointer"
                    style={{ cursor: "pointer" }}
                  >
                    <td className="fw-semibold">
                      #{alert.id}
                    </td>

                    <td>
                      {(() => {
                        const sev =
                          SEVERITY_STYLE[alert.severity] ||
                          SEVERITY_STYLE.anormal;

                        return (
                          <span
                            className={`badge ${sev.bg} ${sev.text || ""} px-3 py-2 rounded-pill fw-semibold`}
                            style={sev.color ? { color: sev.color } : {}}
                          >
                            <i className={`bi ${sev.icon} me-1`}></i>
                            {sev.label}
                          </span>
                        );
                      })()}
                    </td>



                    <td className="text-muted small">{alert.first_temp} °C</td>

                    <td className="text-muted small">
                      {alert.peak_temp} °C
                    </td>

                    {/* DURÉE */}
                    <td>
                      <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
                        <i className="bi bi-clock me-1"></i>
                        {formatDuration(alert.duration_seconds)}
                      </span>
                    </td>

                    <td className="text-muted small">
                      {alert.resolved_at
                        ? new Date(alert.resolved_at).toLocaleString()
                        : "—"}
                    </td>

                    <td className="text-end">
                      <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                        <i className="bi bi-check-circle me-1"></i>
                        Résolue
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
}
