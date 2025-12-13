import { useState, useEffect } from "react";
import { DataContext } from "./DataContext";
import { fetchMonitoringData } from "../utils/monitoringApi";

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const result = await fetchMonitoringData();
      setData(result);
    } catch (e) {
      console.error("Erreur chargement monitoring", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DataContext.Provider value={{ data, loading }}>
      {children}
    </DataContext.Provider>
  );
}
