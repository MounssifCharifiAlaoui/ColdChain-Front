import React, { useEffect, useRef } from "react";
import "./AckModal.css";

export default function AckModal({
  show,
  onClose,
  onConfirm,
  loading = false,
  incidentId,
  comment,
  setComment,
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (show) {
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }, [show]);

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show ack-backdrop"
        onClick={loading ? undefined : onClose}
      />

      {/* Modal */}
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content ack-modal shadow-lg rounded-4">

            {/* HEADER */}
            <div className="modal-header border-0 pb-0">
              <div className="d-flex align-items-center gap-2">
                <span className="ack-icon">✔</span>
                <h5 className="modal-title fw-semibold">
                  Accuser réception — Incident #{incidentId}
                </h5>
              </div>

              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={loading ? undefined : onClose}
              />
            </div>

            {/* BODY */}
            <div className="modal-body pt-2">
              <p className="text-muted mb-3">
                Confirme que tu as bien reçu l’alerte.  
                Tu peux ajouter un commentaire si nécessaire.
              </p>

              <label className="form-label fw-semibold">
                Commentaire <span className="text-muted">(optionnel)</span>
              </label>

              <textarea
                ref={textareaRef}
                className="form-control ack-textarea"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ex : Je prends en charge, je vais vérifier la chambre froide."
                disabled={loading}
              />
            </div>

            {/* FOOTER */}
            <div className="modal-footer border-0 pt-0">
              <button
                className="btn btn-outline-secondary px-4"
                onClick={onClose}
                disabled={loading}
                type="button"
              >
                Annuler
              </button>

              <button
                className="btn btn-primary px-4 fw-semibold"
                onClick={onConfirm}
                disabled={loading}
                type="button"
              >
                {loading ? "Envoi en cours..." : "Confirmer (ACK)"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
