export default function Footer() {
  return (
    <footer className="border-top bg-white mt-4">
      <div className="container-fluid py-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">

          {/* Left */}
          <div className="text-muted small">
            © {new Date().getFullYear()} <strong>ColdChain Monitoring</strong>
          </div>

          {/* Center */}
          <div className="text-muted small text-center">
            Système de surveillance continue de la chaîne du froid
          </div>

          {/* Right */}
          <div className="text-muted small">
            Version 1.0 · Environnement Production
          </div>

        </div>
      </div>
    </footer>
  );
}
