export default function IncidentStatsCards({ stats }) {
  return (
    <div className="row g-4 mb-4">

      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-4 bg-danger bg-opacity-10">
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-bell-fill text-danger fs-2"></i>
            <div>
              <div className="fw-semibold text-muted">Alertes actives</div>
              <div className="fs-3 fw-bold">{stats.active}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-4 bg-warning bg-opacity-10">
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-clock-fill text-warning fs-2"></i>
            <div>
              <div className="fw-semibold text-muted">Acquittées</div>
              <div className="fs-3 fw-bold">{stats.ack}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-4 bg-success bg-opacity-10">
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-check-circle-fill text-success fs-2"></i>
            <div>
              <div className="fw-semibold text-muted">Résolues</div>
              <div className="fs-3 fw-bold">{stats.resolved}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
