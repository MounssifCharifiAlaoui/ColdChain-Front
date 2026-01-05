import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../utils/api";

/* 🔹 Format durée */
const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return "—";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) return `${h}h ${m}min`;
  if (m > 0) return `${m}min ${s}s`;
  return `${s}s`;
};

export default function AlertDetail() {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlert = async () => {
      const res = await api.get(`/alertes/${id}/`);
      setAlert(res.data);
      setLoading(false);
    };

    fetchAlert();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <div className="spinner-border" role="status" />
          <div className="text-muted mt-3">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!alert) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center mb-0">
          Incident introuvable
        </div>
      </div>
    );
  }

  const statusLabel = alert.status?.toUpperCase?.() ?? "—";

  return (
    <div className="container py-4 py-md-5">
      {/* HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <h3 className="fw-bold mb-0">Incident #{alert.id}</h3>

            <span
              className={`badge rounded-pill px-3 py-2 ${
                alert.status === "resolved" ? "text-bg-success" : "text-bg-danger"
              }`}
            >
              {statusLabel}
            </span>
          </div>

          <div className="text-muted mt-1">
            Détails de l’alerte et des accusés de réception
          </div>
        </div>

        <Link to="/alerts/archive" className="btn btn-outline-secondary">
          ← Retour aux archives
        </Link>
      </div>

      {/* INFO CARD */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="fw-semibold mb-0">Informations générales</h5>
            <span className="badge text-bg-light border">ColdChain</span>
          </div>

          <div className="row g-4">
                      <div className="d-flex flex-wrap gap-2 mt-4">
            <span className="badge text-bg-light border">
              ID: {alert.id}
            </span>
            <span className="badge bg-success-subtle text-success border">
              Status: {statusLabel}
            </span>
          </div>
            {/* COL 1 */}
            <div className="col-12 col-md-4">
              <div className="p-3 rounded-4 bg-light border h-100">
                <div className="mb-3">
                  <div className="text-muted small">Créé le</div>
                  <div className="fw-semibold">
                    {new Date(alert.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-muted small">Résolu le</div>
                  <div className="fw-semibold">
                    {alert.resolved_at
                      ? new Date(alert.resolved_at).toLocaleString()
                      : "—"}
                  </div>
                </div>

                <div>
                  <div className="text-muted small">Durée</div>
                  <div className="mt-2">
                    <span className="badge rounded-pill text-bg-primary px-3 py-2">
                      {formatDuration(alert.duration_seconds)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* COL 2 */}
            <div className="col-12 col-md-4">
              <div className="p-3 rounded-4 bg-light border h-100">
                <div className="mb-3">
                  <div className="text-muted small">Température initiale</div>
                  <div className="fw-semibold">{alert.first_temp} °C</div>
                </div>

                <div className="mb-3">
                  <div className="text-muted small">Température min</div>
                  <div className="fw-semibold">{alert.min_temp} °C</div>
                </div>

                <div>
                  <div className="text-muted small">Température max</div>
                  <div className="fw-bold text-danger fs-5">
                    {alert.peak_temp} °C
                  </div>
                </div>
              </div>
            </div>

            {/* COL 3 */}
            <div className="col-12 col-md-4">
              <div className="p-3 rounded-4 bg-light border h-100">
                <div className="mb-3">
                  <div className="text-muted small">Sévérité</div>
                  <span className="badge rounded-pill text-bg-danger px-3 py-2 mt-2">
                    {alert.severity?.toUpperCase?.() ?? "—"}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="text-muted small">Escalades</div>
                  <div className="fw-semibold">{alert.escalation_count}</div>
                </div>

                <div>
                  <div className="text-muted small">Niveau actuel</div>
                  <div className="fw-semibold">{alert.current_level ?? "—"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* mini footer */}

        </div>
      </div>

      {/* ACCUSÉS DE RÉCEPTION */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
            <h5 className="fw-semibold mb-0">Accusés de réception des opérateurs</h5>

            <span className="badge text-bg-light border">
              Total: {alert.operator_responses?.length ?? 0}
            </span>
          </div>

          {alert.operator_responses?.length === 0 ? (
            <div className="alert alert-light border mb-0 text-muted">
              Aucun accusé de réception enregistré
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="text-muted small fw-semibold">Opérateur</th>
                    <th className="text-muted small fw-semibold">Accusé</th>
                    <th className="text-muted small fw-semibold">Date</th>
                    <th className="text-muted small fw-semibold">Commentaire</th>
                  </tr>
                </thead>
                <tbody>
                  {alert.operator_responses.map((resp, index) => (
                    <tr key={index}>
                      <td className="fw-semibold">{resp.operator_name}</td>
                      <td>
                        {resp.acknowledged ? (
                          <span className="badge rounded-pill text-bg-success px-3 py-2">
                            Oui
                          </span>
                        ) : (
                          <span className="badge rounded-pill text-bg-secondary px-3 py-2">
                            Non
                          </span>
                        )}
                      </td>
                      <td className="text-muted small">
                        {new Date(resp.timestamp).toLocaleString()}
                      </td>
                      <td className="text-muted">
                        {resp.comment || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
