import { Link } from "react-router-dom";
import "./ArchiveLink.css";

export default function ArchiveLink() {
  return (
    <div className="archive-link-wrapper mt-4">
      <Link to="/alerts/archive" className="archive-link">
        Voir l’archive des incidents
        <span className="arrow">→</span>
      </Link>
    </div>
  );
}
