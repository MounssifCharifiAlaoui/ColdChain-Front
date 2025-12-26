import { useEffect, useState } from "react";
import IncidentStatsCards from "../components/incidents/IncidentStatsCards";
import IncidentList from "../components/incidents/IncidentList";
import ArchiveLink from "../components/incidents/ArchiveLink";
import {
  fetchArchivedIncidents,
  ackIncident,
} from "../utils/incidentApi";

const ITEMS_PER_PAGE = 3;

export default function Alerts() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const loadIncidents = async () => {
    setLoading(true);
    const data = await fetchArchivedIncidents();
    setIncidents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const filteredIncidents = incidents.filter((i) => {
    if (filter === "active") return i.status === "open";
    if (filter === "ack") return i.acknowledged === true;
    if (filter === "resolved") return i.status === "resolved";
    return true;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const totalPages = Math.ceil(filteredIncidents.length / ITEMS_PER_PAGE);

  const paginatedIncidents = filteredIncidents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const stats = {
    active: incidents.filter((i) => i.status === "open").length,
    ack: incidents.filter((i) => i.acknowledged === true).length,
    resolved: incidents.filter((i) => i.status === "resolved").length,
  };

  const handleAck = async (id) => {
    await ackIncident(id);
    loadIncidents();
  };


  if (loading) {
    return <p className="text-center mt-5">Chargement des alertes...</p>;
  }

  return (
    <div className="container py-4">

      <div className="mb-4">
        <h3 className="fw-bold mb-1">Alertes</h3>
        <p className="text-muted">
          Gestion des alertes et notifications du système
        </p>
      </div>

      <ArchiveLink />

      <div className="d-flex flex-wrap gap-2 mb-4">
        {[
          ["all", "Toutes"],
          ["active", "Actives"],
          ["ack", "Acquittées"],
          ["resolved", "Résolues"],
        ].map(([key, label]) => (
          <button
            key={key}
            className={`btn btn-sm ${
              filter === key ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <IncidentStatsCards stats={stats} />

      <IncidentList
        incidents={paginatedIncidents}
        onAck={handleAck}
        // onResolve={handleResolve}
      />

      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination pagination-sm">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Précédent
              </button>
            </li>

            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages && "disabled"
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Suivant
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
