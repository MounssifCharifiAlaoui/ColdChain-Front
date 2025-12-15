import './IncidentList.css'
export default function IncidentList({ incidents, onAck, onResolve }) {
  return (
    <div className="d-flex flex-column gap-3">

      {incidents.map((incident) => (
        <div
          key={incident.id}
          className={`card incident-card p-4 rounded-4 ${
            incident.status === "open"
              ? "incident-open"
              : "incident-closed"
          }`}
        >
          <div className="d-flex justify-content-between align-items-start">

            {/* LEFT */}
            <div className="incident-content">

              {/* HEADER */}
              <div className="d-flex align-items-center gap-2 mb-1">
                <i className="bi bi-exclamation-triangle-fill incident-icon"></i>

                <span className="incident-title">
                  Température {incident.severity}
                </span>

                {incident.status === "open" && (
                  <span className="incident-badge">
                    Active
                  </span>
                )}
              </div>

              <div className="incident-subtitle mb-2">
                Température hors seuil détectée
              </div>

              {/* DETAILS */}
              <div className="row incident-meta">
                <div className="col-md-3">
                  <span>Valeur</span>
                  <strong>{incident.peak_temp}°C</strong>
                </div>

                <div className="col-md-3">
                  <span>Seuil</span>
                  <strong>{incident.threshold ?? "--"}°C</strong>
                </div>

                <div className="col-md-3">
                  <span>Escalades</span>
                  <strong>{incident.escalation_count}</strong>
                </div>

                <div className="col-md-3">
                  <span>Horodatage</span>
                  <strong>
                    {new Date(incident.created_at).toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            {incident.status === "open" && (
              <div className="incident-actions">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => onAck(incident.id)}
                >
                  Acquitter
                </button>

                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => onResolve(incident.id)}
                >
                  Résoudre
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
