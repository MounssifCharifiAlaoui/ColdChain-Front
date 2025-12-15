import DashboardCard from "../components/dashboard/DashboardCard";
import ZoneCard from "../components/dashboard/ZoneCard";
import { useData } from "../context/useData";
import Trends24h from "../components/dashboard/Trends24h";
import AveragePeriods from "../components/dashboard/AveragePeriods";

export default function Dashboard() {
  const { data, loading } = useData();

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-secondary">
        Chargement des données...
      </div>
    );
  }

  // ❌ No data case
  if (!data || data.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-secondary">
        Aucune donnée disponible.
      </div>
    );
  }

  const last = data[data.length - 1];
  const avgTemperature = data.reduce((acc, m) => acc + m.temp, 0) / data.length;
  const avgHumidity = data.reduce((acc, m) => acc + m.hum, 0) / data.length;
  // Variation (calcul provisoire)
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
    <div className="px-4 py-5" style={{ backgroundColor: '#F8FAFC' }}>
      {/* // <div className="px-4 py-5" style={{ backgroundColor: "#0B1220", color: "#EAF0FF" }}> */}

      <div className="p-4">

        <h3 className="fw-bold mb-1">Dashboard – Temperature Monitoring</h3>
        <h6 className="text-muted mb-4">
          Real-time monitoring of your environment
        </h6>

        {/* ========== Cards ========== */}
        <div className="row g-4">
          <div className="col-md-6">
<DashboardCard
  title="Température"
  icon="bi bi-thermometer"
  color="#FF5A36"
  gradientFrom="#FFFFFF"
  gradiantMiddle="#FDFEFE"
  gradientTo="#F8FAFC"
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
  color="#1E90FF"
  gradientFrom="#FFFFFF"
  gradiantMiddle="#FDFEFE"
  gradientTo="#F1F7FF"
  value={last.hum}
  avgValue={avgHumidity.toFixed(1)}
  unit="%"
  variation={humVariation}
/>




          </div>
        </div>
      </div>

      {/* ========== Zone Monitoring ========== */}
      <div className="p-4">

        <h4 className="fw-semibold mb-3">
          <i className="bi bi-geo-alt me-2"></i> <span className="">Surveillance par zone</span>
        </h4>

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

      </div>

      <div className="p-4">

        <div className="row g-4">
          <div className="col-md-6">
            <Trends24h data={data} />
          </div>

          <div className="col-md-6">
            <AveragePeriods periods={periods} />
          </div>
        </div>

      </div>
    </div>
  );
}
