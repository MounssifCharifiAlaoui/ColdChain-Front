import { Link } from "react-router-dom";
import LogoutButton from "../Auth/LogoutButton";

export default function NavBar() {
  // 🔹 Lecture directe depuis localStorage
  const username = localStorage.getItem("username");
  

  return (
    <nav className="navbar navbar-expand-lg bg-body shadow-sm w-100">
      <div className="container-fluid px-3">

        {/* ========== LOGO ========== */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="badge bg-primary p-2 me-2">
            <i className="bi bi-thermometer text-white fs-5"></i>
          </span>
          <div className="d-flex flex-column lh-sm">
            <span className="text-dark fw-bold">Cold Chain</span>
            <span className="text-secondary fs-6 fw-normal">Monitor</span>
          </div>
        </Link>

        {/* ========== TOGGLE MOBILE ========== */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ========== MENU ========== */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">

            {/* Dashboard */}
            <li className="nav-item mx-2">
              <Link className="nav-link text-secondary" to="/">
                <i className="bi bi-columns-gap me-1"></i> Dashboard
              </Link>
            </li>

            {/* Monitoring */}
            <li className="nav-item mx-2">
              <Link className="nav-link text-secondary" to="/monitoring">
                <i className="bi bi-activity me-1"></i> Monitoring
              </Link>
            </li>

            {/* Alerts */}
            <li className="nav-item mx-2">
              <Link className="nav-link text-secondary" to="/alerts">
                <i className="bi bi-exclamation-triangle me-1"></i> Alerts
              </Link>
            </li>

            {/* Settings */}
            <li className="nav-item mx-2">
              <Link className="nav-link text-secondary" to="/settings">
                <i className="bi bi-gear me-1"></i> Settings
              </Link>
            </li>

            {/* ========== USER DROPDOWN ========== */}
            <li className="nav-item dropdown mx-3">
              <button
                className="nav-link dropdown-toggle d-flex align-items-center border-0 bg-transparent"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* Avatar */}
                <div
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{ width: 40, height: 40, fontWeight: 600 }}
                >
                  {username ? username.charAt(0).toUpperCase() : "U"}
                </div>

                {/* Username */}
                <div className="d-flex flex-column text-start">
                  <span className="fw-semibold text-dark">
                    {username || "Utilisateur"}
                  </span>
                  <span className="text-secondary" style={{ fontSize: "0.8rem" }}>
                    Connecté
                  </span>
                </div>
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    <i className="bi bi-person me-2"></i> Profil
                  </Link>
                </li>

                <li><hr className="dropdown-divider" /></li>

                <li className="dropdown-item text-danger">
                  <LogoutButton />
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
