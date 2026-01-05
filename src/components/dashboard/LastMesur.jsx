import { useEffect, useState } from "react";
import { fetchMonitoringData } from "../../utils/monitoringApi";

export default function LastMesur() {
  const [measures, setMeasures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMeasures = async () => {
      try {
        const data = await fetchMonitoringData();

        // On prend les 5 dernières mesures (les plus récentes)
        const lastFive = data
          .slice(-5)
          .reverse(); // pour afficher la plus récente en haut

        setMeasures(lastFive);
      } catch (error) {
        console.error("Erreur chargement dernières mesures", error);
      } finally {
        setLoading(false);
      }
    };

    loadMeasures();
  }, []);

  return (
    <div className="bg-white rounded-4 p-3" style={{ height: "auto" ,border : "solid 1px #e8e8e4"}}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="m-0">Dernières mesures</h5>
      </div>

      <p className="text-muted mb-3">Évolution horaire</p>

      {loading ? (
        <div className="text-center text-muted">Chargement...</div>
      ) : (
        <table className="table table-sm align-middle mb-0">
          <thead className="text-muted small">
            <tr>
              <th>Date / Heure</th>
              <th className="text-center">Température</th>
              <th className="text-center">Humidité</th>
              <th className="text-end">Statut</th>
            </tr>
          </thead>

          <tbody>
            {measures.map((m, index) => (
              <tr key={index}>
                <td className="small text-muted">
                  {new Date(m.dt).toLocaleString()}
                </td>

                <td className="text-center fw-bolder">
                  <i className="bi bi-thermometer-low me-1 fs-5" style={{color : "#ff4438"}}></i>
                  {m.temp}°C
                </td>

                <td className="text-center fw-bolder">
                  <i className="bi bi-droplet text-primary me-1 fs-5"></i>
                  {m.hum}%
                </td>

                <td className="text-end">
                  <i className="bi bi-dot text-success fs-3"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
