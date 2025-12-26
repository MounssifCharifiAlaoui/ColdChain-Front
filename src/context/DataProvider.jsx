import { useState, useEffect, useRef } from "react";
import { DataContext } from "./DataContext";
import { fetchMonitoringData } from "../utils/monitoringApi";
import { getAccessToken } from "../utils/authService";

export function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasReceivedDataRef = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      const token = getAccessToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const result = await fetchMonitoringData();

        if (Array.isArray(result)) {
          setData(result);

          // ✅ On quitte le loading UNIQUEMENT
          // quand on a reçu au moins une fois des données réelles
          if (result.length > 0) {
            hasReceivedDataRef.current = true;
            setLoading(false);
          }
        }

        if (!intervalRef.current) {
          intervalRef.current = setInterval(loadData, 5000);
        }

      } catch {
        setTimeout(loadData, 2000);
      }
    }

    loadData();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <DataContext.Provider value={{ data, loading }}>
      {children}
    </DataContext.Provider>
  );
}
