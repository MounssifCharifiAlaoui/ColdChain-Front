import DashboardCard from "../components/dashboard/DashboardCard";
import ZoneCard from "../components/dashboard/ZoneCard";
import { useData } from "../context/useData";
import Trends24h from "../components/dashboard/Trends24h";
import AveragePeriods from "../components/dashboard/AveragePeriods";
import "./Dashboard.css";

export default function Dashboard() {
  const { data, loading } = useData();

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

  const periods = [
    { label: "00h", value: 18 },
    { label: "04h", value: 17 },
    { label: "08h", value: 19 },
    { label: "12h", value: 22 },
    { label: "16h", value: 24 },
    { label: "20h", value: 21 },
  ];

  return (
    <div className="dashboard-container">

      {/* ================= HEADER ================= */}
      <div className="d-flex flex-column">
        <h3 className="dashboard-title">
          Dashboard – Temperature Monitoring
        </h3>
        <p className="dashboard-subtitle">
          Real-time monitoring of your environment
        </p>
      </div>

      {/* ================= KPIs ================= */}
      <section className="dashboard-section">
        <div className="row g-4">
          <div className="col-md-6">
            <DashboardCard
              title="Température"
              icon="bi bi-thermometer"
              color="#ff6b4a"
              gradientFrom="#fef3f3"
              gradiantMiddle="#FCFDFF"
              gradientTo="#fef3f3"
              value={last.temp}
              avgValue={avgTemperature.toFixed(1)}
              unit="°C"
              variation={tempVariation}
            />
          </div>

          <div className="col-md-6">
            <DashboardCard
              title="Humidité"
              icon="bi bi-droplet"
              color="#457bff"
              gradientFrom="#eff3ff"
              gradiantMiddle="#FCFDFF"
              gradientTo="#eff3ff"
              value={last.hum}
              avgValue={avgHumidity.toFixed(1)}
              unit="%"
              variation={humVariation}
            />
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

        <div className="row g-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <ZoneCard zone="Fridge 1" temp={last.temp} hum={last.hum} status="online" />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <ZoneCard zone="Fridge 2" temp={20.8} hum={52} status="online" />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <ZoneCard zone="Fridge 3" temp={24.2} hum={65} status="warning" />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <ZoneCard zone="Fridge 4" temp={21.5} hum={48} status="online" />
          </div>
        </div>
      </section>

      {/* ================= ANALYTICS ================= */}
<section className="dashboard-section">
  <div className="row g-4 align-items-stretch">
    
    <div className="col-md-6 d-flex">
      <div className="w-100">
        <Trends24h data={data} />
      </div>
    </div>

    <div className="col-md-6 d-flex">
      <div className="w-100">
        <AveragePeriods periods={periods} />
      </div>
    </div>

  </div>
</section>


    </div>
  );
}
