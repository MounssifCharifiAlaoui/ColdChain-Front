import { BrowserRouter, Routes as RouterRoutes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Auth/Login";
import Dashboard from "./pages/Dashboard";
import Monitoring from "./pages/Monitoring"
import Analysis from "./pages/Analysis"
import Alerts from "./pages/Alerts"
import Settings from "./pages/Settings"


function CustomRoutes() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <NavBar />}

      <RouterRoutes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
        <Route path="/monitoring" element={ <ProtectedRoute> <Monitoring /> </ProtectedRoute> } />
        <Route path="/analysis" element={ <ProtectedRoute> <Analysis /> </ProtectedRoute> } />
        <Route path="/alerts" element={ <ProtectedRoute> <Alerts /> </ProtectedRoute> } />
        <Route path="/settings" element={ <ProtectedRoute> <Settings /> </ProtectedRoute> } />

      </RouterRoutes>
    </>
  );
}

const Routes = () => {
  return (
    <BrowserRouter>
      <CustomRoutes />
    </BrowserRouter>
  );
};

export default Routes;

