import "./StatCard.css";

export default function StatCard({ icon, title, value, avg, max, min, diff, color, lastUpdate, lastTime }) {
  return (
    <div className="stat-card card rounded-4" style={{ border: "solid 1px #e8e8e4" }}>

      {/* HEADER */}
      <div className="d-flex align-items-center gap-2 mb-2">
        <div className={`icon-box icon-box-${color}`}>
          <span className={`icon-inside icon-inside-${color}`}>{icon}</span>
        </div>

        <div>
          <div className="stat-title">{title}</div>
          <div className="stat-subtitle">Données actuelles</div>
        </div>
      </div>

      {/* VALUE */}
      <div className={`stat-value text-${color}`}>{value}</div>
      <div className="stat-diff">{diff}</div>

      {/* STATS */}
      <div className="row g-2 mt-2 text-center">
        <div className="col">
          <div className="stat-box">
            <div className="stat-label">Moyenne</div>
            <div className="stat-number">{avg}</div>
          </div>
        </div>

        <div className="col">
          <div className="stat-box">
            <div className="stat-label">Maximum</div>
            <div className="stat-number">{max}</div>
          </div>
        </div>

        <div className="col">
          <div className="stat-box">
            <div className="stat-label">Minimum</div>
            <div className="stat-number">{min}</div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="stat-footer">
        <span className="text-muted small">{lastUpdate}</span>

        <span className="status-online">
          <span className="dot"></span>
          {lastTime}
        </span>
      </div>
    </div>
  );
}
