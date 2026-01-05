export default function IncidentStatsCards({ stats }) {
  return (
    <div className="row g-4 mb-4">

      {/* ALERTES ACTIVES */}
      <div className="col-md-4">
        <div
          className="card border-1 shadow-sm p-4"
          style={{
            borderRadius: "16px",
            background: "linear-gradient(135deg, #fff1f1, #ffe4e6)",
            borderColor : "#f4acb7",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#ef4444",
              }}
            >
              <i className="bi bi-bell-fill text-white fs-5"></i>
            </div>

            <div>
              <div className="text-muted small">Alertes actives</div>
              <div className="fs-4 fw-bold">{stats.active}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ACQUITTÉES */}
      <div className="col-md-4">
        <div
          className="card border-1 shadow-sm p-4"
          style={{
            borderRadius: "16px",
            background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
            borderColor : "#fcbf49",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#f59e0b",
              }}
            >
              <i className="bi bi-clock-fill text-white fs-5"></i>
            </div>

            <div>
              <div className="text-muted small">Acquittées</div>
              <div className="fs-4 fw-bold">{stats.ack}</div>
            </div>
          </div>
        </div>
      </div>

      {/* RÉSOLUES */}
      <div className="col-md-4">
        <div
          className="card border-1 shadow-sm p-4"
          style={{
            borderRadius: "16px",
            background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
            borderColor : "#74c69d"
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#74c69d",
              }}
            >
              <i className="bi bi-check-circle-fill text-white fs-5"></i>
            </div>

            <div>
              <div className="text-muted small">Résolues</div>
              <div className="fs-4 fw-bold">{stats.resolved}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
