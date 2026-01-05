import LastMesur from "../../components/dashboard/LastMesur";
import DashboardCard from "../../components/dashboard/DashboardCard";
import Trends24h from "../../components/dashboard/Trends24h";
import { fetchActiveIncidents } from "../../utils/incidentApi"
import ZoneCard from "../../components/dashboard/ZoneCard";
import { useData } from "../../context/useData";
import Card from "../../components/cards/Card";
import { useState, useEffect } from "react";
import "./Dashboard.css";
// import Monitoring from "../monitoring/Monitoring";

export default function Dashboard() {
  const { data, loading } = useData();
  const [activeIncidentsCount, setActiveIncidentsCount] = useState(null);
  const [incidentLoading, setIncidentLoading] = useState(true);
  const incidentIcon =
    activeIncidentsCount === 0
      ? "bi bi-check-circle text-success fs-5"
      : "bi bi-exclamation-circle text-danger fs-5";


  useEffect(() => {
    const loadActiveIncidents = async () => {
      try {
        const incidents = await fetchActiveIncidents();
        setActiveIncidentsCount(incidents.length);
      } catch (error) {
        console.error("Erreur chargement incidents actifs", error);
      } finally {
        setIncidentLoading(false);
      }
    };

    loadActiveIncidents();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        Chargement des données...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="dashboard-loading">
        Aucune donnée disponible.
      </div>
    );
  }

  const last = data[data.length - 1];
  const avgTemperature = data.reduce((acc, m) => acc + m.temp, 0) / data.length;
  const avgHumidity = data.reduce((acc, m) => acc + m.hum, 0) / data.length;

  const tempVariation = (last.temp - avgTemperature).toFixed(1) + "°C";
  const humVariation = (last.hum - avgHumidity).toFixed(1) + "%";

  // const periods = [
  //   { label: "00h", value: 18 },
  //   { label: "04h", value: 17 },
  //   { label: "08h", value: 19 },
  //   { label: "12h", value: 22 },
  //   { label: "16h", value: 24 },
  //   { label: "20h", value: 21 },
  // ];

  return (
    <div className="dashboard-container bg-light">

      {/* ================= HEADER ================= */}
      <div className="d-flex flex-column mb-3">
        <h3 className="dashboard-title">
          Dashboard -- Temperature Monitoring
        </h3>
        <p className="dashboard-subtitle">
          Real-time monitoring of your environment
        </p>
      </div>

      {/* Test des cardes */}
      <div className="d-flex justify-content-around align-items-center mb-5 gap-4">
        <Card text="Température Actuelle" val1={last.temp} val2={tempVariation} icon="bi bi-thermometer text-danger fs-5" sign="°C" />
        <Card text="Humidité Actuelle" val1={last.hum} val2={humVariation} comment="depuis le dernier envoi" icon="bi bi-droplet text-primary fs-5" sign="%" />
        <Card text="Alerts Actives" val1={incidentLoading ? "..." : activeIncidentsCount} icon={incidentIcon} comment="Dernière mise à jour: 00:59:01" />
        <Card text="Statut Système" val1="Normal" comment="Dernière mise à jour: 00:59:01" icon="bi-check-lg text-success fs-5" />
      </div>
      {/* Fin Test des cardes */}

      {/* ================= KPIs ================= */}
      <section className="dashboard-section">
        <div className="row g-4">
          <div className="col-md-6">
            <DashboardCard title="Température" icon="bi bi-thermometer" color="#ff0000" gradientFrom="#ff5252" gradiantMiddle="#ff7b7b" gradientTo="#ff5252" value={last.temp} avgValue={avgTemperature.toFixed(1)} unit="°C" variation={tempVariation} />
          </div>

          <div className="col-md-6">
            <DashboardCard title="Humidité" icon="bi bi-droplet" color="#023e8a" gradientFrom="#0096c7" gradiantMiddle="#48cae4" gradientTo="#0096c7" value={last.hum} avgValue={avgHumidity.toFixed(1)} unit="%" variation={humVariation} />
          </div>
        </div>
      </section>

      {/* ================= ZONES ================= */}
      <section className="dashboard-section">
        <div className="section-header">
          <h4>
            <i className="bi bi-geo-alt me-2"></i>
            Surveillance par zone
          </h4>
        </div>

        <div className="row g-4 justify-content-around">
          <div className="col-12 col-sm-6 col-lg-3">
            <ZoneCard zone="Fridge 1" temp={last.temp} hum={last.hum} status="online" />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <ZoneCard zone="Fridge 2" temp={20.8} hum={52} status="offline" />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <ZoneCard zone="Fridge 3" temp={24.2} hum={65} status="offline" />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <ZoneCard zone="Fridge 4" temp={21.5} hum={48} status="offline" />
          </div>
        </div>
      </section>

      {/* ================= ANALYTICS ================= */}
      <section className="dashboard-section">
        <div className="row g-4 align-items-stretch">

          <div className="col-md-6 d-flex">
            <div className="w-100 h-100 dashboard-box">
              <Trends24h data={data} />
            </div>
          </div>

          <div className="col-md-6 d-flex">
            <div className="w-100 h-100 dashboard-box">
              <LastMesur />
            </div>
          </div>

        </div>
      </section>
{/* <Monitoring/> */}
    </div>
  );
}
