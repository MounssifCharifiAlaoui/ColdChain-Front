import { BrowserRouter, Routes as RouterRoutes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Auth/Login";
import Dashboard from "./pages/Dashboard";
import Monitoring from "./pages/Monitoring"
import AlertsArchive from "./pages/AlertsArchive"
import Alerts from "./pages/Alerts"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile";
import OperatorProfile from "./pages/OperatorProfile";


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
        <Route path="/alerts" element={ <ProtectedRoute> <Alerts /> </ProtectedRoute> } />
        <Route path="/settings" element={ <ProtectedRoute> <Settings /> </ProtectedRoute> } />
        <Route path="/alerts" element={ <ProtectedRoute> <Alerts /> </ProtectedRoute> } />
        <Route path="/alerts/archive" element={ <ProtectedRoute> <AlertsArchive  /> </ProtectedRoute> } />
        <Route path="/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute> } />
        <Route path="/settings/operators/:id" element={ <ProtectedRoute> <OperatorProfile /> </ProtectedRoute> } />

        
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

