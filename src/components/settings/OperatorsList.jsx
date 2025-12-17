import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ AJOUT
import { fetchOperators, updateOperator } from "../../utils/operatorsApi";
import { formatRole, roleColor } from "../../utils/roles";
import NotificationChannels from "./NotificationChannels";

export default function OperatorsList() {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ AJOUT

  const loadOperators = async () => {
    try {
      const data = await fetchOperators();
      setOperators(data);
    } catch (e) {
      console.error("Erreur chargement opérateurs", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOperators();
  }, []);

  const toggleActive = async (op) => {
    try {
      await updateOperator(op.id, { is_active: !op.is_active });
      loadOperators();
    } catch (e) {
      console.error("Erreur activation opérateur", e);
    }
  };

  if (loading) {
    return <p className="text-muted">Chargement des opérateurs...</p>;
  }

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h5 className="fw-bold mb-3">
        <i className="bi bi-people me-2"></i>
        Liste des opérateurs
      </h5>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Nom</th>
              <th>Rôle</th>
              <th>Niveau</th>
              <th>Canaux</th>
              <th>Statut</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {operators.map((op) => (
              <tr
                key={op.id}
                onDoubleClick={() =>
                  navigate(`/settings/operators/${op.id}`)
                } // ✅ DOUBLE-CLIC ICI
                style={{ cursor: "pointer" }}
                title="Double-cliquez pour voir le profil"
              >

                {/* Nom */}
                <td>
                  <strong>
                    {op.first_name} {op.last_name}
                  </strong>
                  <div className="text-muted small">
                    {op.user?.username}
                  </div>
                </td>

                {/* Rôle */}
                <td>
                  <span className={`badge bg-${roleColor(op.role)}`}>
                    {formatRole(op.role)}
                  </span>
                </td>

                {/* Niveau */}
                <td>
                  <span className="badge bg-secondary">
                    Niveau {op.escalation_level}
                  </span>
                </td>

                {/* Canaux */}
                <td>
                  <NotificationChannels
                    operator={op}
                    onUpdated={loadOperators}
                  />
                </td>

                {/* Statut */}
                <td>
                  {op.is_active ? (
                    <span className="badge bg-success">Actif</span>
                  ) : (
                    <span className="badge bg-danger">Inactif</span>
                  )}
                </td>

                {/* Actions */}
                <td className="text-end">
                  <button
                    className={`btn btn-sm ${
                      op.is_active
                        ? "btn-outline-danger"
                        : "btn-outline-success"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ IMPORTANT (évite conflit avec double-clic)
                      toggleActive(op);
                    }}
                  >
                    {op.is_active ? "Désactiver" : "Activer"}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
