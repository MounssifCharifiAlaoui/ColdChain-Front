export default function IncidentList({ incidents, onAck, onResolve }) {
  return (
    <div className="d-flex flex-column gap-3">

      {incidents.map((incident) => (
        <div
          key={incident.id}
          className={`card shadow-sm border-0 p-4 ${
            incident.status === "open"
              ? "bg-warning bg-opacity-10"
              : "bg-light"
          }`}
        >
          <div className="d-flex justify-content-between align-items-start">

            {/* LEFT */}
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <i className="bi bi-exclamation-triangle-fill text-warning"></i>
                <span className="fw-bold">
                  Température {incident.severity}
                </span>

                {incident.status === "open" && (
                  <span className="badge bg-danger">Active</span>
                )}
              </div>

              <div className="text-muted mb-2">
                Température hors seuil détectée
              </div>

              <div className="row text-muted small">
                <div className="col-md-3">
                  <strong>Valeur :</strong> {incident.peak_temp}°C
                </div>
                <div className="col-md-3">
                  <strong>Seuil :</strong> {incident.threshold ?? "--"}°C
                </div>
                <div className="col-md-3">
                  <strong>Escalade :</strong> {incident.escalation_count}
                </div>
                <div className="col-md-3">
                  <strong>Horodatage :</strong>{" "}
                  {new Date(incident.created_at).toLocaleString()}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="d-flex flex-column gap-2">
              {incident.status === "open" && (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
