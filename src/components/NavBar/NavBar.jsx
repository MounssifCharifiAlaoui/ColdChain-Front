import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../Auth/LogoutButton";
import "./navbare.css"

export default function NavBar() {
  const username = localStorage.getItem("username");
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "nav-link nav-link-custom active"
      : "nav-link nav-link-custom";

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container-fluid px-4 d-flex align-items-center">

        {/* ========== LOGO (LEFT) ========== */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className="bg-primary text-white rounded-3 p-2 d-flex align-items-center justify-content-center">
            <i className="bi bi-thermometer fs-5"></i>
          </div>
          <div className="lh-sm">
            <div className="fw-bold text-dark">Cold Chain</div>
            <div className="text-muted small">Monitor</div>
          </div>
        </Link>

        {/* ========== CENTER MENU ========== */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav gap-3">

            <li className="nav-item">
              <Link className={isActive("/")} to="/">
                <i className="bi bi-ui-radios me-2"></i> Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className={isActive("/monitoring")} to="/monitoring">
                <i className="bi bi-activity me-2"></i> Monitoring
              </Link>
            </li>

            <li className="nav-item">
              <Link className={isActive("/alerts")} to="/alerts">
                <i className="bi bi-exclamation-triangle me-2"></i> Alerts
              </Link>
            </li>

            <li className="nav-item">
              <Link className={isActive("/settings")} to="/settings">
                <i className="bi bi-gear me-2"></i> Settings
              </Link>
            </li>

          </ul>
        </div>

        {/* ========== USER (RIGHT) ========== */}
        <div className="dropdown ms-auto">
          <button
            className="btn btn-light d-flex align-items-center gap-2 rounded-pill px-3 py-1"
            data-bs-toggle="dropdown"
          >
            <div
              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: 38, height: 38, fontWeight: 600 }}
            >
              {username ? username.charAt(0).toUpperCase() : "U"}
            </div>

            <div className="text-start d-none d-md-block">
              <div className="fw-semibold text-dark">
                {username || "Utilisateur"}
              </div>
              <div className="text-muted small">Connecté</div>
            </div>

            <i className="bi bi-chevron-down text-muted small"></i>
          </button>

          <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
            <li>
              <Link className="dropdown-item" to="/profile">
                <i className="bi bi-person me-2"></i> Profil
              </Link>
            </li>

            <li><hr className="dropdown-divider" /></li>

            <li className="px-3">
              <LogoutButton />
            </li>

            <li><hr className="dropdown-divider" /></li>

            <li>
              <Link className="dropdown-item" to="/test">
                <i className="bi bi-ui-checks-grid me-2"></i> Form
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
