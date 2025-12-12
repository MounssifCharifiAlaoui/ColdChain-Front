// src/components/dashboardComponents/AveragePeriods.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AveragePeriods({ periods }) {
  const labels = periods.map(p => p.label);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Températures moyennes",
        data: periods.map(p => p.value),
        backgroundColor: [
          "#ff7b47",
          "#ffa63b",
          "#ffcf3c",
          "#ffe73b",
          "#d9ff3c",
        ],
        borderRadius: 10
      }
    ]
  };

  return (
    <div className="shadow-sm rounded-4 p-4 bg-white">
      <h5 className="m-0">Moyennes par période</h5>
      <p className="text-muted mb-3">Températures moyennes</p>

      <Bar data={chartData} height={130} />
    </div>
  );
}
