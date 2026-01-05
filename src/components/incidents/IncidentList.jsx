import { useState } from "react";

const SEVERITY_CONFIG = {
  anormal: {
    label: "Température anormale",
    icon: "bi-exclamation-circle-fill",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
  critique: {
    label: "Température critique",
    icon: "bi-exclamation-octagon-fill",
    color: "#dc2626",
    bg: "white",
    border: "orange",
  },
  severe: {
    label: "Température sévère",
    icon: "bi-fire",
    color: "#ea580c",
    bg: "white",
    border: "red",
  },
};

const getStatusBadge = (incident) => {
  if (incident.status === "resolved") {
    return <span className="badge bg-success-subtle text-success p-2">Résolue</span>;
  }
  if (incident.acknowledged) {
    return <span className="badge bg-warning-subtle text-dark">Acquittée</span>;
  }
  return <span className="badge bg-danger-subtle text-danger">Active</span>;
};

export default function IncidentList({ incidents, onAck }) {
  const [ackForm, setAckForm] = useState({
    incidentId: null,
    confirmed: false,
    comment: "",
  });

  const [ackLoading, setAckLoading] = useState(false);

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

        const isFormOpen = ackForm.incidentId === incident.id;

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
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: severity.color,
                    }}
                  >
                    <i className={`bi ${severity.icon} text-white`} />
                  </div>

                  <span className="fw-bold">{severity.label}</span>
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
              {incident.status === "open" && !incident.acknowledged && (
                <div className="ms-3" style={{ minWidth: 260 }}>

                  {/* BOUTON OUVRIR FORMULAIRE */}
                  {!isFormOpen && (
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() =>
                        setAckForm({
                          incidentId: incident.id,
                          confirmed: false,
                          comment: "",
                        })
                      }
                    >
                      Acquitter
                    </button>
                  )}

                  {/* FORMULAIRE */}
                  {isFormOpen && (
                    <div className="border rounded p-3 bg-white shadow-sm">

                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`ack-${incident.id}`}
                          checked={ackForm.confirmed}
                          onChange={(e) =>
                            setAckForm({
                              ...ackForm,
                              confirmed: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="form-check-label fw-semibold"
                          htmlFor={`ack-${incident.id}`}
                        >
                          Accusé de réception
                        </label>
                      </div>

                      <textarea
                        className="form-control mb-2"
                        rows="2"
                        placeholder="Commentaire (optionnel)"
                        value={ackForm.comment}
                        onChange={(e) =>
                          setAckForm({
                            ...ackForm,
                            comment: e.target.value,
                          })
                        }
                      />

                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() =>
                            setAckForm({
                              incidentId: null,
                              confirmed: false,
                              comment: "",
                            })
                          }
                        >
                          Annuler
                        </button>

                        <button
                          className="btn btn-sm btn-success"
                          disabled={!ackForm.confirmed || ackLoading}
                          onClick={async () => {
                            setAckLoading(true);

                            await onAck(incident.id, {
                              acknowledged: true,
                              comment: ackForm.comment,
                            });

                            setAckForm({
                              incidentId: null,
                              confirmed: false,
                              comment: "",
                            });

                            setAckLoading(false);
                          }}
                        >
                          {ackLoading ? "Envoi..." : "Confirmer"}
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
