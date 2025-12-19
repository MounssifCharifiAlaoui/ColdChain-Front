import { Link } from "react-router-dom";

export default function ArchiveLink() {
  return (
    <div className="d-flex justify-content-end mb-3">
      <Link
        to="/alerts/archive"
        className="btn btn-outline-secondary d-flex align-items-center gap-2"
      >
        <i className="bi bi-archive-fill"></i>
        Archive des incidents
        <i className="bi bi-arrow-right-short"></i>
      </Link>
    </div>
  );
}
