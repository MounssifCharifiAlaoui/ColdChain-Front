import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOperators, updateOperator } from "../../utils/operatorsApi";
import { formatRole, roleColor } from "../../utils/roles";
import NotificationChannels from "./NotificationChannels";

export default function OperatorsList() {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        <i className="bi bi-list me-2"></i>
        Liste des opérateurs ({operators.length})
      </h5>

      <div className="d-flex flex-column gap-3 bg-light">
        {operators.map((op) => (
          <div
            key={op.id}
            className="border rounded p-3 d-flex justify-content-between align-items-center"
            onDoubleClick={() => navigate(`/settings/operators/${op.id}`)}
            style={{ cursor: "pointer" }}
          >
            {/* LEFT */}
            <div className="d-flex align-items-start gap-3">
              {/* Avatar */}
              <div
                className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40 }}
              >
                <i className="bi bi-person text-primary"></i>
              </div>

              {/* Infos */}
              <div>
                <div className="fw-semibold">
                  {op.first_name} {op.last_name}
                  <span
                    className={`badge ms-2 bg-${roleColor(op.role)}`}
                  >
                    {formatRole(op.role)}
                  </span>
                  <span
                    className={`badge ms-2 ${
                      op.is_active ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {op.is_active ? "Actif" : "Inactif"}
                  </span>
                </div>

                {/* <div className="text-muted small">
                  <i className="bi bi-envelope me-1"></i>
                  {op.user?.email}
                </div> */}

                <div className="text-muted small">
                  <i className="bi bi-telephone me-1"></i>
                  {op.phone}
                </div>

                {/* Canaux */}
                <div className="mt-2">
                  <NotificationChannels
                    operator={op}
                    onUpdated={loadOperators}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <button
              className={`btn btn-sm ${
                op.is_active
                  ? "btn-outline-danger"
                  : "btn-outline-success"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleActive(op);
              }}
            >
              <i className="bi bi-trash me-1"></i>
              {op.is_active ? "Désactiver" : "Activer"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
