import React from "react";
import { Navigate } from "react-router-dom";
import { isLogged } from "../../utils/authService";

export default function ProtectedRoute({ children }) {
  if (!isLogged()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
