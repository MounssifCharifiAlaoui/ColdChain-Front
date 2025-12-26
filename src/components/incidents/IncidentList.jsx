const SEVERITY_CONFIG = {
  anormal: {
    label: "Température anormale",
    icon: "bi-exclamation-circle-fill",
    color: "#2563eb", // bleu
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
  critique: {
    label: "Température critique",
    icon: "bi-exclamation-octagon-fill",
    color: "#dc2626", // rouge
    bg: "#fef2f2",
    border: "#fecaca",
  },
  severe: {
    label: "Température sévère",
    icon: "bi-fire",
    color: "#ea580c", // orange
    bg: "#fff7ed",
    border: "#fed7aa",
  },
};

const getStatusBadge = (incident) => {
  if (incident.status === "resolved") {
    return <span className="badge bg-success">Résolue</span>;
  }
  if (incident.acknowledged) {
    return <span className="badge bg-warning text-dark">Acquittée</span>;
  }
  return <span className="badge bg-danger">Active</span>;
};

export default function IncidentList({ incidents, onAck }) {
  if (incidents.length === 0) {
    return (
      <div className="text-center text-muted p-5">
        Aucune alerte trouvée
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {incidents.map((incident) => {
        const severity =
          SEVERITY_CONFIG[incident.severity] ||
          SEVERITY_CONFIG.anormal;

        return (
          <div
            key={incident.id}
            className="card shadow-sm p-4 border-1"
            style={{
              borderRadius: "14px",
              backgroundColor: severity.bg,
              borderColor: severity.border,
            }}
          >
            <div className="d-flex justify-content-between align-items-start">

              {/* LEFT */}
              <div className="w-100">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      backgroundColor: severity.color,
                    }}
                  >
                    <i
                      className={`bi ${severity.icon} text-white`}
                    ></i>
                  </div>

                  <span className="fw-bold">
                    {severity.label}
                  </span>

                  {getStatusBadge(incident)}
                </div>

                <div className="text-muted mb-3">
                  La température a dépassé le seuil défini
                </div>

                <div className="row text-muted small">
                  <div className="col-md-3">
                    <strong>Capteur :</strong> Température
                  </div>

                  <div className="col-md-3">
                    <strong>Valeur max :</strong>{" "}
                    {incident.peak_temp ?? "--"} °C
                  </div>

                  <div className="col-md-3">
                    <strong>Escalades :</strong>{" "}
                    {incident.escalation_count ?? 0}
                  </div>

                  <div className="col-md-3">
                    <strong>Horodatage :</strong>{" "}
                    {new Date(incident.created_at).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              {incident.status === "open" && (
                <div className="d-flex flex-column gap-2 ms-3">
                  {!incident.acknowledged && (
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => onAck(incident.id)}
                    >
                      Acquitter
                    </button>
                  )}

                  {/* <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => onResolve(incident.id)}
                  >
                    Résoudre
                  </button> */}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
