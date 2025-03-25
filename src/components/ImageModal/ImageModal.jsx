import css from "./ImageModal.module.css";

import Modal from "react-modal";
import { useEffect } from "react";

Modal.setAppElement("#root");

function ImageModal({ isOpen, onClose, image }) {
  if (!isOpen || !image) return null;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          zIndex: 1000,
        },
        content: {
          inset: "50% auto auto 50%",
          transform: "translate(-50%, -50%)",
          border: "none",
          background: "none",
          padding: 0,
          overflow: "visible",
        },
      }}
    >
      <div className="modal-content">
        <img
          src={image.urls.regular}
          alt={image.alt_description || ""}
          style={{
            maxHeight: "90vh",
            maxWidth: "90vw",
            borderRadius: "8px",
          }}
        />
        <button
          onClick={onClose}
          className={css.closeButton}
        >
          ×
        </button>
      </div>
    </Modal>
  );
}

export default ImageModal;
