//import { useState } from "react";
import OperatorsList from "../components/settings/OperatorsList";
import OperatorForm from "../components/settings/OperatorForm";
import EscalationRules from "../components/settings/EscalationRules";
import TemperatureRulesCard from "../components/settings/TemperatureRulesCard";
import { isAdmin } from "../utils/authService";

export default function Settings() {
  if (!isAdmin()) {
    return (
      <div className="container py-4">
        <h3 className="fw-bold mb-3">Paramètres</h3>

        <div className="alert alert-warning">
          Vous n'avez pas les droits pour accéder aux paramètres système.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Paramétrage du système</h3>

      <OperatorsList />
      <EscalationRules />
      <OperatorForm />
      <TemperatureRulesCard />
    </div>
  );
}
