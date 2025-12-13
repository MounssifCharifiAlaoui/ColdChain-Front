import React, { useEffect, useRef } from "react";

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

  // Focus automatique quand le modal s'ouvre
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
        className="modal-backdrop fade show"
        onClick={loading ? undefined : onClose}
      />

      {/* Modal */}
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content shadow">

            <div className="modal-header">
              <h5 className="modal-title">
                ✔ Accuser réception — Incident #{incidentId}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={loading ? undefined : onClose}
              />
            </div>

            <div className="modal-body">
              <p className="text-muted mb-2">
                Confirme que tu as bien reçu l’alerte. Ajoute un commentaire si besoin.
              </p>

              <label className="form-label">Commentaire (optionnel)</label>
              <textarea
                ref={textareaRef}
                className="form-control"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ex: Je prends en charge, je vais vérifier la chambre froide."
                disabled={loading}
              />
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-outline-secondary"
                onClick={onClose}
                disabled={loading}
                type="button"
              >
                Annuler
              </button>

              <button
                className="btn btn-primary"
                onClick={onConfirm}
                disabled={loading}
                type="button"
              >
                {loading ? "Envoi..." : "Confirmer (ACK)"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
