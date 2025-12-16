import { useState, useEffect } from "react";
import { DataContext } from "./DataContext";
import { fetchMonitoringData } from "../utils/monitoringApi";
import { getAccessToken } from "../utils/authService";

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;

    async function loadData() {
      const token = getAccessToken();

      // 🔒 PAS CONNECTÉ → PAS D’API → PAS DE BOUCLE
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const result = await fetchMonitoringData();
        setData(result);
      } catch (e) {
        console.error("Erreur chargement monitoring", e);
      } finally {
        setLoading(false);
      }
    }

    loadData();

    intervalId = setInterval(loadData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <DataContext.Provider value={{ data, loading }}>
      {children}
    </DataContext.Provider>
  );
}
