import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/authService";

export default function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div
      className="d-flex align-items-center text-danger"
      onClick={handleLogout}
      style={{ cursor: "pointer" }}
    >
      <i className="bi bi-box-arrow-right me-2"></i>
      <span>Logout</span>
    </div>
  );
}
