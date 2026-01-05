import { useEffect, useState } from "react";
import MonitoringFilters from "../../components/monitoring/MonitoringFilters";
import ChartTempHum from "../../components/monitoring/ChartTempHum";
import StatCard from "../../components/monitoring/StatCard";
import { timeSince, formatHour } from "../../utils/date";
import { useData } from "../../context/useData";
import "./Monitoring.css";

export default function Monitoring() {
  const { data, loading } = useData();
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  /* ================= FILTER LOGIC ================= */
  useEffect(() => {
    if (!Array.isArray(data)) {
      setFilteredData([]);
      return;
    }

    let result = [];

    if (activeFilter === "all") {
      result = data;
    } else if (activeFilter === "7d") {
      const from = Date.now() - 7 * 24 * 60 * 60 * 1000;
      result = data.filter(d => new Date(d.dt).getTime() >= from);
    } else if (activeFilter === "30d") {
      const from = Date.now() - 30 * 24 * 60 * 60 * 1000;
      result = data.filter(d => new Date(d.dt).getTime() >= from);
    } else if (activeFilter?.type === "custom") {
      const start = new Date(activeFilter.start);
      const end = new Date(activeFilter.end);
      end.setHours(23, 59, 59, 999);

      result = data.filter(d => {
        const dt = new Date(d.dt);
        return dt >= start && dt <= end;
      });
    }

    setFilteredData(result);
  }, [data, activeFilter]);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };

  /* ================= STATES ================= */
  if (loading) {
    return <div className="monitoring-loading">Chargement des données…</div>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="monitoring-loading">
        En attente des premières mesures…
      </div>
    );
  }

  /* ================= KPI DATA ================= */
  const last = data[data.length - 1];

  const avgTemp = (data.reduce((s, d) => s + d.temp, 0) / data.length).toFixed(1);
  const minTemp = Math.min(...data.map(x => x.temp));
  const maxTemp = Math.max(...data.map(x => x.temp));

  const avgHum = (data.reduce((s, d) => s + d.hum, 0) / data.length).toFixed(1);
  const minHum = Math.min(...data.map(x => x.hum));
  const maxHum = Math.max(...data.map(x => x.hum));

  let diffTemp = "N/A";
  let diffHum = "N/A";

  if (data.length >= 2) {
    const prev = data[data.length - 2];
    diffTemp =
      (last.temp - prev.temp >= 0 ? "+" : "") +
      (last.temp - prev.temp).toFixed(1) +
      "°C depuis la dernière mesure";

    diffHum =
      (last.hum - prev.hum >= 0 ? "+" : "") +
      (last.hum - prev.hum).toFixed(1) +
      "% depuis la dernière mesure";
  }

  const lastUpdateText = timeSince(last.dt);
  const lastTime = formatHour(last.dt);

  /* ================= UI ================= */
return (
  <div className="monitoring-container bg-light">

    {/* HEADER */}
    <div className="monitoring-header">
      <h4 className="monitoring-title">Monitoring</h4>
      <p className="monitoring-subtitle">
        Analyse détaillée des données de climat
      </p>
    </div>

    <div className="monitoring-wrapper">

      {/* KPI */}
      <section className="monitoring-section">
        <div className="monitoring-kpis">
          <StatCard
            icon={<i className="fa-solid fa-temperature-full"></i>}
            title="Température"
            value={`${last.temp} °C`}
            avg={`${avgTemp} °C`}
            max={`${maxTemp} °C`}
            min={`${minTemp} °C`}
            diff={diffTemp}
            color="danger"
            lastUpdate={lastUpdateText}
            lastTime={lastTime}
          />

          <StatCard
            icon={<i className="fa-solid fa-droplet"></i>}
            title="Humidité"
            value={`${last.hum} %`}
            avg={`${avgHum} %`}
            max={`${maxHum} %`}
            min={`${minHum} %`}
            diff={diffHum}
            color="primary"
            lastUpdate={lastUpdateText}
            lastTime={lastTime}
          />
        </div>
      </section>

      {/* FILTERS */}
      <section className="monitoring-section monitoring-filters-inline">
        <MonitoringFilters onFilter={handleFilter} />
      </section>

      {/* CHARTS */}
      <section className="monitoring-section">

        {filteredData.length < 2 && (
          <div className="monitoring-warning">
            Pas assez de données pour la période sélectionnée
          </div>
        )}

        <div className="monitoring-charts">
          <ChartTempHum
            data={filteredData}
            only="temp"
            title="Évolution de la température"
          />

          <ChartTempHum
            data={filteredData}
            only="hum"
            title="Évolution de l’humidité"
          />
        </div>

      </section>

    </div>
  </div>
);

}
