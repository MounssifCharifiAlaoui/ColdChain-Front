import "./StatCard.css";

export default function StatCard({icon, title, value, avg, max, min, diff, color, lastUpdate,lastTime}) {
  return (
    <div className="card shadow border-0 p-4 rounded-4" style={{ width: "33rem" }}>
      
      {/* HEADER */}
      <div className="d-flex gap-3 align-items-center mb-3">
        <div className={`icon-box icon-box-${color} d-flex align-items-center justify-content-center`}>
          <span className={`icon-inside icon-inside-${color}`}>{icon}</span>
        </div>

        <h5 className="fw-bold text-secondary">{title}</h5>
      </div>

      {/* VALUE */}
      <div className={`display-5 fw-bold text-${color}`}>{value}</div>
      <div className="text-muted mb-4">{diff}</div>

      {/* STATS */}
      <div className="row text-center">
        <div className="col bg-light rounded-3 p-2 mx-1">
          <div className="text-muted small">Moyenne</div>
          <div className="fw-bold">{avg}</div>
        </div>

        <div className="col bg-light rounded-3 p-2 mx-1">
          <div className="text-muted small">Maximum</div>
          <div className="fw-bold">{max}</div>
        </div>

        <div className="col bg-light rounded-3 p-2 mx-1">
          <div className="text-muted small">Minimum</div>
          <div className="fw-bold">{min}</div>
        </div>
      </div>

      {/* FOOTER EXACT COMME TON IMAGE */}
      <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">

        {/* À gauche — Temps écoulé */}
        <span className="text-muted small">
          {lastUpdate}
        </span>

        {/* À droite — En ligne */}
        <span className="text-success small fw-semibold d-flex align-items-center">
          {lastTime}
        </span>
      </div>
    </div>
  );
}
