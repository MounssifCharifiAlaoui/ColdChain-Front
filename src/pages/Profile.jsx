import { useEffect, useState } from "react";
import {
  fetchMyProfile,
  changePassword,
  updateMyProfile,
} from "../utils/profileApi";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  // 🔹 Edition profil
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // 🔹 Changement mot de passe
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  // =========================
  // Chargement du profil
  // =========================
  useEffect(() => {
    fetchMyProfile().then((data) => {
      setProfile(data);
      setEmail(data.email);
      setPhone(data.operator.phone);
    });
  }, []);

  // =========================
  // Mise à jour email / phone
  // =========================
  const handleProfileUpdate = async () => {
    try {
      await updateMyProfile({ email, phone });
      setMessage("Informations personnelles mises à jour");
      setEditMode(false);

      const refreshed = await fetchMyProfile();
      setProfile(refreshed);
    } catch {
      setMessage("Erreur lors de la mise à jour du profil");
    }
  };

  // =========================
  // Changement mot de passe
  // =========================
  const handlePasswordChange = async () => {
    setMessage("");

    // 🔒 Validation front
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("Veuillez remplir tous les champs");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Le nouveau mot de passe et la confirmation ne correspondent pas");
      return;
    }

    try {
      await changePassword({
        old_password: oldPassword,
        new_password: newPassword,
      });

      setMessage("Mot de passe modifié avec succès");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "Erreur lors du changement de mot de passe";
      setMessage(errorMsg);
    }
  };

  if (!profile) return <p className="text-center py-4">Chargement...</p>;

  const { operator } = profile;

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Mon profil</h3>

      {/* ========================= */}
      {/* INFORMATIONS PERSONNELLES */}
      {/* ========================= */}
      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Informations personnelles</h5>

          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Annuler" : "Modifier"}
          </button>
        </div>

        <p><strong>Nom :</strong> {operator.last_name}</p>
        <p><strong>Prénom :</strong> {operator.first_name}</p>

        {/* EMAIL */}
        <div className="mb-2">
          <strong>Email :</strong>
          {editMode ? (
            <input
              type="email"
              className="form-control mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <span className="ms-2">{profile.email}</span>
          )}
        </div>

        {/* TELEPHONE */}
        <div className="mb-2">
          <strong>Téléphone :</strong>
          {editMode ? (
            <input
              type="text"
              className="form-control mt-1"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          ) : (
            <span className="ms-2">{operator.phone}</span>
          )}
        </div>

        <p><strong>Rôle :</strong> {operator.role}</p>
        <p><strong>Niveau d’escalade :</strong> {operator.escalation_level}</p>

        {editMode && (
          <button
            className="btn btn-success mt-3"
            onClick={handleProfileUpdate}
          >
            Enregistrer
          </button>
        )}
      </div>

      {/* ========================= */}
      {/* CHANGEMENT MOT DE PASSE */}
      {/* ========================= */}
      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">Changer le mot de passe</h5>

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Ancien mot de passe"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirmer le nouveau mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handlePasswordChange}>
          Modifier le mot de passe
        </button>
      </div>

      {/* MESSAGE */}
      {message && (
        <p className="text-muted text-center mt-3">{message}</p>
      )}
    </div>
  );
}
