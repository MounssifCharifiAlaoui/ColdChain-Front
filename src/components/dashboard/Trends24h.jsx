// src/components/dashboardComponents/Trends24h.jsx
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

export default function Trends24h({ data = [] }) {

  // ✅ HOOK TOUJOURS APPELÉ
  const labels = useMemo(
    () => data.map(d => new Date(d.dt).getHours() + "h"),
    [data]
  );

  const reducedLabels = useMemo(
    () => labels.map((l, i) => (i % 3 === 0 ? l : "")),
    [labels]
  );

  // ✅ RETURN APRÈS LES HOOKS
  if (!data.length) {
    return (
      <div className="shadow-sm rounded-4 p-4 bg-white text-center text-muted">
        Aucune donnée disponible
      </div>
    );
  }

  const chartData = {
    labels: reducedLabels,
    datasets: [
      {
        label: "Température (°C)",
        data: data.map(d => d.temp),
        borderColor: "#ff6b4a",
        backgroundColor: "rgba(255,107,74,0.1)",
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        fill: true,
        yAxisID: "y"
      },
      {
        label: "Humidité (%)",
        data: data.map(d => d.hum),
        borderColor: "#457bff",
        backgroundColor: "rgba(69,123,255,0.1)",
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        fill: true,
        yAxisID: "y1"
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: "#fff", titleColor: "#333", bodyColor: "#555", borderColor: "#e7e7e7", borderWidth: 1, padding: 10, displayColors: false }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxRotation: 0, minRotation: 0, color: "#999", font: { size: 12 } }
      },
      y: {
        min: 0,
        max: 60,
        position: "left",
        ticks: { color: "#ff6b4a", font: { size: 12 } },
        grid: { color: "rgba(200,200,200,0.2)" }
      },
      y1: {
        min: 0,
        max: 30,
        position: "right",
        ticks: { color: "#457bff", font: { size: 12 } },
        grid: { drawOnChartArea: false }
      }
    }
  };

  return (
    <div className="shadow-sm rounded-4 p-4 bg-white h-100 d-flex flex-column"style={{border : "solid 1px #e8e8e4"}}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="m-0">Tendances 24h</h5>
      </div>

      <p className="text-muted mb-3">Évolution horaire</p>

      <div style={{ flex: 1 }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
