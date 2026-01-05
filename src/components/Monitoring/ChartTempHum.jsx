import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { downloadCSV } from "../../utils/csv";

Chart.register(zoomPlugin);

export default function ChartTempHum({ data, only, title }) {

  /* ================= HOOKS (TOUJOURS EN PREMIER) ================= */
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [zoomMode, setZoomMode] = useState(false);

  const hasEnoughData = Array.isArray(data) && data.length >= 2;

  /* ================= CHART EFFECT ================= */
  useEffect(() => {
    if (!hasEnoughData) return;
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const labels = data.map(d =>
      new Date(d.dt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );

    const dataset = data.map(d => (only === "temp" ? d.temp : d.hum));
    const colorMain = only === "temp" ? "#FF4E42" : "#1E88E5";

    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, `${colorMain}33`);
    gradient.addColorStop(1, `${colorMain}00`);

    if (!chartRef.current) {
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: only === "temp" ? "Température (°C)" : "Humidité (%)",
            data: dataset,
            borderColor: colorMain,
            backgroundColor: gradient,
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            fill: true,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            zoom: {
              zoom: { drag: { enabled: zoomMode }, mode: "x" },
              pan: { enabled: true, mode: "x" },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                autoSkip: true,          
                maxTicksLimit: 15,         
                maxRotation: 0,          
                minRotation: 0,          
                padding: 8,
              }
            },
            y: { grid: { color: "#eee" } },
          },
        },
      });
    } else {
      chartRef.current.data.labels = labels;
      chartRef.current.data.datasets[0].data = dataset;
      chartRef.current.data.datasets[0].backgroundColor = gradient;
      chartRef.current.options.plugins.zoom.zoom.drag.enabled = zoomMode;
      chartRef.current.update("none");
    }

  }, [data, only, zoomMode, hasEnoughData]);


  useEffect(() => {
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  /* ================= UI ================= */

  if (!hasEnoughData) return;


  const resetZoom = () => {
    chartRef.current?.resetZoom();
    setZoomMode(false);
  };

  return (
    <div className="card shadow p-4 rounded-4 mb-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className={`fw-bold text-${only === "temp" ? "danger" : "primary"} m-0`}>
          {title}
        </h5>

        <div className="d-flex gap-2">
          <button
            className={`btn btn-sm ${zoomMode ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setZoomMode(!zoomMode)}
            title="Sélectionner une zone pour zoomer"
          >
            <i className="bi bi-zoom-in"></i>
          </button>

          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={resetZoom}
            title="Réinitialiser le zoom"
          >
            <i className="bi bi-zoom-out"></i>
          </button>

          <button
            className="btn btn-sm btn-outline-success"
            onClick={() => downloadCSV(data)}
            title="Télécharger CSV"
          >
            <i className="bi bi-download"></i>
          </button>
        </div>
      </div>

      {/* CHART */}
      <div style={{ height: "250px" }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
