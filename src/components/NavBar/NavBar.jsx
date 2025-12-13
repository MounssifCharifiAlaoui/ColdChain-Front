import { Link } from "react-router-dom";
import LogoutButton from "../Auth/LogoutButton";
// import './NavBar.css';


export default function NavBar() {
  const username = localStorage.getItem("username") || "User";

  return (
    <nav className="navbar navbar-expand-lg bg-body shadow-sm w-100">
      <div className="container-fluid px-3">
        {/* --- Logo and title --- */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="badge bg-primary p-2 me-2">
            <i className="bi bi-thermometer text-white fs-5"></i>
          </span>
          <div className="d-flex flex-column lh-sm">
            <span className="text-dark fw-bold">Cold Chain</span>
            <span className="text-secondary fs-6 fw-normal">Monitor</span>
          </div>
        </Link>

        {/* --- Mobile toggle button --- */}
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* --- Collapsible menu --- */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center text-center text-lg-start">

            {/* Dashboard */}
            <li className="nav-item main mx-lg-3 my-2 my-lg-0">
              <Link className="nav-link d-flex align-items-center text-secondary" to="/">
                <i className="bi bi-columns-gap me-2"></i>
                <span className='fs-500'>Dashboard</span>
              </Link>
            </li>

            {/* Monitoring */}
            <li className="nav-item main mx-lg-3 my-2 my-lg-0">
              <Link className="nav-link d-flex align-items-center text-secondary" to="/monitoring">
                <i className="bi bi-activity me-2"></i>
                <span className='fs-500'>Monitoring</span>
              </Link>
            </li>

            {/* Alerts */}
            <li className="nav-item main mx-lg-3 my-2 my-lg-0">
              <Link className="nav-link d-flex align-items-center text-secondary" to="/alerts">
                <i className="bi bi-exclamation-triangle me-2"></i>
                <span className='fs-500'>Alerts</span>
              </Link>
            </li>

            {/* Settings */}
            <li className="nav-item main mx-lg-3 my-2 my-lg-0">
              <Link className="nav-link d-flex align-items-center text-secondary" to="/settings">
                <i className="bi bi-bar-chart me-2"></i>
                <span className='fs-500'>Settings</span>
              </Link>
            </li>

            {/* User Dropdown (inchangé) */}
            <li className="nav-item dropdown mx-lg-3 my-2 my-lg-0">
              <Link className="nav-link dropdown-toggle d-flex align-items-center text-secondary" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{ width: '40px', height: '40px', fontWeight: '600' }}>
                  D
                </div>
                <div className="d-flex flex-column lh-sm text-start">
                  <span className="fw-semibold text-dark">{username}</span>
                  <span className="text-secondary" style={{ fontSize: '0.85rem' }}>Lab Manager</span>
                </div>
              </Link>

              <ul className="dropdown-menu shadow-sm border-0 p-2">

                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center text-secondary" to="/profile">
                    <i className="bi bi-person me-2"></i> Profile
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li className="dropdown-item text-danger d-flex align-items-center" style={{ cursor: "pointer" }}>
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
