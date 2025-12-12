import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { downloadCSV } from "../../utils/csv";

Chart.register(zoomPlugin);

export default function ChartTempHum({ data, only, title }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [zoomMode, setZoomMode] = useState(false);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");

    const labels = data.map(d =>
      new Date(d.dt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );

    const dataset = data.map(d => (only === "temp" ? d.temp : d.hum));
    const colorMain = only === "temp" ? "#FF4E42" : "#1E88E5";

    // - Dégradé vertical
    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, `${colorMain}33`);
    gradient.addColorStop(1, `${colorMain}00`);

    // 🟦 Si le chart n'existe pas → création
    if (!chartRef.current) {
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: only === "temp" ? "Température (°C)" : "Humidité (%)",
              data: dataset,
              borderColor: colorMain,
              backgroundColor: gradient,
              borderWidth: 2,
              tension: 0.4,
              pointRadius: 0,
              fill: true,
            },
          ],
        },
        options: {
          animation: { duration: 0 },
          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: { display: false },

            zoom: {
              zoom: {
                wheel: { enabled: false },
                pinch: { enabled: false },
                drag: {
                  enabled: zoomMode, // ← mode sélection activé SEULEMENT si bouton zoom cliqué
                  modifierKey: null,
                  borderColor: "#333",
                  backgroundColor: "rgba(0,0,0,0.1)",
                },
                mode: "x",
              },

              pan: {
                enabled: true,
                mode: "x",
                modifierKey: null,
              },
            },
          },

          scales: {
            x: {
              grid: { display: false },
              ticks: {
                maxRotation: 0,
                minRotation: 0,
                autoSkip: false,
                callback: function (value, index) {
                  return index % 2 === 0 ? this.getLabelForValue(value) : "";
                },
              },
            },
            y: { grid: { color: "#eee" } },
          },

        },
      });

      return;
    }

    // 🟩 Si le chart existe → mise à jour sans recréer
    const chart = chartRef.current;
    chart.data.labels = labels;
    chart.data.datasets[0].data = dataset;

    // Gradient must be refreshed after update
    chart.data.datasets[0].backgroundColor = gradient;

    // applique zoomMode dynamiquement
    chart.options.plugins.zoom.zoom.drag.enabled = zoomMode;

    chart.update("none"); // ← mise à jour fluide sans animation
  }, [data, only, zoomMode]);

  // 🔄 Reset zoom
  const resetZoom = () => {
    if (chartRef.current) chartRef.current.resetZoom();
    setZoomMode(false);
  };

  return (
    <div className="card shadow p-4 rounded-4 mb-4">
      {/* 🔥 Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className={`fw-bold text-${only === "temp" ? "danger" : "primary"} m-0`}>
          {title}
        </h5>

        <div className="d-flex gap-2">
          {/* Toggle zoom selection */}
          <button
            className={`btn btn-sm ${zoomMode ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setZoomMode(!zoomMode)}
            title="Sélectionner une zone pour zoomer"
          >
            <i className="bi bi-crop"></i>
          </button>

          {/* Reset zoom */}
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={resetZoom}
            title="Réinitialiser le zoom"
          >
            <i className="bi bi-zoom-out"></i>
          </button>

          {/* CSV */}
          <button
            className="btn btn-sm btn-outline-success"
            onClick={() => downloadCSV(data)}
            title="Télécharger CSV"
          >
            <i className="bi bi-download"></i>
          </button>
        </div>
      </div>

      {/* Chart container */}
      <div style={{ height: "320px" }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
