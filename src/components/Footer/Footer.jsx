import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="container-fluid px-4">

        <div className="row gy-4 align-items-center">

          {/* --- Brand --- */}
          <div className="col-md-4 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <span className="footer-badge me-2">
                <i className="bi bi-thermometer-half"></i>
              </span>
              <div className="d-flex flex-column lh-sm">
                <span className="footer-title">Cold Chain Monitor</span>
                <span className="footer-subtitle">
                  Real-time temperature & humidity monitoring
                </span>
              </div>
            </div>
          </div>

          {/* --- Navigation --- */}
          <div className="col-md-4 text-center">
            <ul className="footer-nav">
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/monitoring">Monitoring</Link></li>
              <li><Link to="/alerts">Alerts</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
          </div>

          {/* --- Copyright --- */}
          <div className="col-md-4 text-center text-md-end">
            <span className="footer-copy">
              © {new Date().getFullYear()} Cold Chain Monitor
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
