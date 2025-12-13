// import { useState } from "react";
import OperatorsList from "../components/settings/OperatorsList";
import OperatorForm from "../components/settings/OperatorForm";
import EscalationRules from "../components/settings/EscalationRules";

export default function Settings() {
  // const [showForm, setShowForm] = useState(false);

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Paramétrage du système</h3>

        <OperatorsList/>
        <EscalationRules/>
        <OperatorForm/>

      {/* <OperatorsList onAdd={() => setShowForm(true)} /> */}
      {/* {showForm && (
        <OperatorForm onClose={() => setShowForm(false)} />
      )} */}
    </div>
  );
}
