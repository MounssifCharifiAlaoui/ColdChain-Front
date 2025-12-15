import "./IncidentStatsCards.css";

export default function IncidentStatsCards({ stats }) {
  return (
    <div className="row g-4 mb-4">

      {/* Alertes actives */}
      <div className="col-md-4">
        <div className="card stats-card p-4 rounded-4" style={{backgroundColor : "#fdf2f6", borderColor : "#fededf"}}>
          <div className="d-flex align-items-center gap-3">
            <div className="stats-icon" style={{backgroundColor : "#ef2b31"}}>
              <i className="bi bi-bell text-white"></i>
            </div>
            <div>
              <div className="stats-label">Alertes actives</div>
              <div className="stats-value">{stats.active}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Acquittées */}
      <div className="col-md-4">
        <div className="card stats-card stats-warning p-4 rounded-4" style={{backgroundColor : "#fff7ea", borderColor : "#fef4b8"}}>
          <div className="d-flex align-items-center gap-3">
            <div className="stats-icon warning" style={{backgroundColor : "#ff7a00"}}>
              <i className="bi bi-clock text-white"></i>
            </div>
            <div>
              <div className="stats-label">Acquittées</div>
              <div className="stats-value">{stats.ack}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Résolues */}
      <div className="col-md-4">
        <div className="card stats-card stats-success p-4 rounded-4" style={{backgroundColor : "#dafaea", borderColor : "#e6fcef"}}>
          <div className="d-flex align-items-center gap-3">
            <div className="stats-icon success"  style={{backgroundColor : "#00b54c"}}>
              <i className="bi bi-check2-circle text-white"></i>
            </div>
            <div>
              <div className="stats-label">Résolues</div>
              <div className="stats-value">{stats.resolved}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
