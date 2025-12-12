import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/authService";
import { isLogged } from "../../utils/authService";
import { useEffect } from "react";

import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
  if (isLogged()) {
    navigate("/");
  }
}, [navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const ok = await login(username, password);

    setLoading(false);

    if (!ok) {
      setError("Nom d'utilisateur ou mot de passe incorrect.");
      return;
    }

    // Success → redirect monitoring
    navigate("/");
  }

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="login-card shadow-lg">
        <h2 className="text-center mb-4">🔐 Connexion</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom d'utilisateur</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
