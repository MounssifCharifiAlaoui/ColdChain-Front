// src/components/dashboardComponents/Trends24h.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

export default function Trends24h({ data }) {

  // 🔹 On réduit les labels X : on montre 1 label toutes les 3 heures
  const labels = data.map((d) => new Date(d.dt).getHours() + "h");
  const reducedLabels = labels.map((l, i) => (i % 3 === 0 ? l : "")); // ← AFFICHER SEULEMENT 1/3

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
        pointRadius: 0,         // pas de points → plus propre
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
      legend: { display: false }, // on peut remettre si tu veux
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#333",
        bodyColor: "#555",
        borderColor: "#e7e7e7",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false }, // pas de grille verticale
        ticks: {
          maxRotation: 0, // ← labels horizontaux
          minRotation: 0,
          color: "#999",
          font: { size: 12 }
        }
      },
      y: {
        position: "left",
        ticks: {
          color: "#ff6b4a",
          font: { size: 12 }
        },
        grid: {
          color: "rgba(200,200,200,0.2)" // grille douce
        }
      },
      y1: {
        position: "right",
        ticks: {
          color: "#457bff",
          font: { size: 12 }
        },
        grid: { drawOnChartArea: false } // pas de double grille 
      }
    }
  };

  return (
    <div className="shadow-sm rounded-4 p-4 bg-white" style={{ height: "355px" }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="m-0">Tendances 24h</h5>
      </div>

      <p className="text-muted mb-3">Évolution horaire</p>

      <div style={{ height: "240px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
