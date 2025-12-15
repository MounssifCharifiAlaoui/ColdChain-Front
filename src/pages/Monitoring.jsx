import React, { useEffect, useState } from "react";
import MonitoringFilters from "../components/monitoring/MonitoringFilters";
import StatCard from "../components/monitoring/StatCard";
import ChartTempHum from "../components/monitoring/ChartTempHum";
import { timeSince, formatHour } from "../utils/date";
import { useData } from "../context/useData";

export default function Monitoring() {
  const { data, loading } = useData();

  // -------------------------
  // 🎯 Hooks doivent TOUJOURS être ici
  // -------------------------
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleFilter = (filter) => {
    if (filter === "24h") {
      const from = Date.now() - 24 * 60 * 60 * 1000;
      setFilteredData(data.filter(d => new Date(d.dt) >= from));
    }

    else if (filter === "7d") {
      const from = Date.now() - 7 * 24 * 60 * 60 * 1000;
      setFilteredData(data.filter(d => new Date(d.dt) >= from));
    }

    else if (filter === "30d") {
      const from = Date.now() - 30 * 24 * 60 * 60 * 1000;
      setFilteredData(data.filter(d => new Date(d.dt) >= from));
    }

    else if (filter?.type === "custom") {
      const start = new Date(filter.start);
      const end = new Date(filter.end);
      setFilteredData(data.filter(d => {
        const dt = new Date(d.dt);
        return dt >= start && dt <= end;
      }));
    }
  };

  // -------------------------
  // 🕒 Conditions d'affichage (APRÈS les hooks)
  // -------------------------
  if (loading) {
    return <p className="text-center py-5">Chargement des données...</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-center py-5">Aucune donnée disponible.</p>;
  }

  // -------------------------
  // 📊 Analyse des données
  // -------------------------
  const last = data[data.length - 1];

  const avgTemp = (data.reduce((s, d) => s + d.temp, 0) / data.length).toFixed(1);
  const minTemp = Math.min(...data.map((x) => x.temp));
  const maxTemp = Math.max(...data.map((x) => x.temp));

  const avgHum = (data.reduce((s, d) => s + d.hum, 0) / data.length).toFixed(1);
  const minHum = Math.min(...data.map((x) => x.hum));
  const maxHum = Math.max(...data.map((x) => x.hum));

  // 🔥 Variation vs la dernière mesure
  let diffTemp = "N/A";
  let diffHum = "N/A";

  if (data.length >= 2) {
    const prev = data[data.length - 2];

    const deltaTemp = last.temp - prev.temp;
    const deltaHum = last.hum - prev.hum;

    diffTemp =
      (deltaTemp >= 0 ? "+" : "") + deltaTemp.toFixed(1) + "°C depuis la dernière mesure";

    diffHum =
      (deltaHum >= 0 ? "+" : "") + deltaHum.toFixed(1) + "% depuis la dernière mesure";
  }

  const lastTimestamp = last.dt;
  const lastUpdateText = timeSince(lastTimestamp);
  const lastTime = formatHour(lastTimestamp);

  // -------------------------
  // 🎨 UI finale
  // -------------------------
  return (
    <div className="container py-4">
      <h4 className="fw-bold"> Monitoring </h4>
      <span className="text-muted">Analyse détaillée des données de climat</span>

      {/* Cartes */}
      <div className="d-flex justify-content-center gap-5 flex-wrap mt-4 mb-5">
        <StatCard
          icon={<i className="fa-solid fa-temperature-full text-danger"></i>}
          title="Capteur de Température"
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
          icon={<i className="fa-solid fa-droplet text-primary"></i>}
          title="Capteur d'Humidité"
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

      {/* Filtres */}
      <MonitoringFilters onFilter={handleFilter} />

      {/* Graphiques */}
      <ChartTempHum
        data={filteredData}
        only="temp"
        title={
          <>
            <i className="fa-solid fa-temperature-full text-danger me-2"></i>
            Graphique de Température
          </>
        }
      />

      <ChartTempHum
        data={filteredData}
        only="hum"
        title={
          <>
            <i className="fa-solid fa-droplet text-primary me-2"></i>
            Graphique d'Humidité
          </>
        }
      />
    </div>
  );
}
