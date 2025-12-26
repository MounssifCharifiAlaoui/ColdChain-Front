import React, { useEffect, useState } from "react";
import MonitoringFilters from "../components/monitoring/MonitoringFilters";
import StatCard from "../components/Monitoring/StatCard";
import ChartTempHum from "../components/Monitoring/ChartTempHum";
import { timeSince, formatHour } from "../utils/date";
import { useData } from "../context/useData";
import "./Monitoring.css";

export default function Monitoring() {
  const { data, loading } = useData();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleFilter = (filter) => {
    if (filter === "24h") {
      const from = Date.now() - 24 * 60 * 60 * 1000;
      setFilteredData(data.filter(d => new Date(d.dt) >= from));
    } else if (filter === "7d") {
      const from = Date.now() - 7 * 24 * 60 * 60 * 1000;
      setFilteredData(data.filter(d => new Date(d.dt) >= from));
    } else if (filter === "30d") {
      const from = Date.now() - 30 * 24 * 60 * 60 * 1000;
      setFilteredData(data.filter(d => new Date(d.dt) >= from));
    } else if (filter?.type === "custom") {
      const start = new Date(filter.start);
      const end = new Date(filter.end);
      setFilteredData(
        data.filter(d => {
          const dt = new Date(d.dt);
          return dt >= start && dt <= end;
        })
      );
    }
  };

if (loading) {
  return <div className="monitoring-loading">Chargement des données…</div>;
}

if (data === null) {
  return <div className="monitoring-loading">Connexion au serveur…</div>;
}

if (data.length === 0) {
  return <div className="monitoring-loading">
    En attente des premières mesures…
  </div>;
}

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

  return (
    <div className="monitoring-container">

      {/* ================= HEADER ================= */}
      <div className="monitoring-header">
        <h4 className="monitoring-title">Monitoring</h4>
        <p className="monitoring-subtitle">
          Analyse détaillée des données de climat
        </p>
      </div>

      <div style={{ width: '90%', margin: 'auto' }}>
        {/* ================= KPI ================= */}
        <section className="monitoring-section">
          <div className="monitoring-kpis">
            <StatCard
              icon={<i className="fa-solid fa-temperature-full"></i>}
              title="Capteur de Température"
              value={`${last.temp} °C`}
              avg={`${avgTemp} °C`}
              max={`${maxTemp} °C`}
              min={`${minTemp} °C`}
              diff={diffTemp}
              color="danger"
              lastUpdate={lastUpdateText}
              lastTime={lastTime}
              className="w-100"
            />

            <StatCard
              icon={<i className="fa-solid fa-droplet"></i>}
              title="Capteur d'Humidité"
              value={`${last.hum} %`}
              avg={`${avgHum} %`}
              max={`${maxHum} %`}
              min={`${minHum} %`}
              diff={diffHum}
              color="primary"
              lastUpdate={lastUpdateText}
              lastTime={lastTime}
              className="w-100"
            />
          </div>
        </section>
      </div>

      <div style={{ width: '90%', margin: 'auto' }}>
        {/* ================= FILTERS ================= */}
        <section className="monitoring-section">
          <MonitoringFilters onFilter={handleFilter} />
        </section>

        {/* ================= CHARTS ================= */}
        <section className="monitoring-section">
          <div className="monitoring-charts">
            <ChartTempHum
              data={filteredData}
              only="temp"
              title="Graphique de Température"
            />

            <ChartTempHum
              data={filteredData}
              only="hum"
              title="Graphique d'Humidité"
            />
          </div>
        </section>

      </div>
    </div>
  );
}
