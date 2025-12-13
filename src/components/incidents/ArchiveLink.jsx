import { Link } from "react-router-dom";

export default function ArchiveLink() {
  return (
    <div className="text-end mt-4">
      <Link to="/alerts/archive" className="btn btn-link">
        Voir l’archive des incidents →
      </Link>
    </div>
  );
}
