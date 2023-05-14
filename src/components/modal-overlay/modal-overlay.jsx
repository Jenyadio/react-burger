import React from "react";
import PropTypes from "prop-types";
import overlayStyles from "../modal-overlay/modal-overlay.module.css";

function ModalOverlay({ onClose }) {
  return (
    <div
      className={overlayStyles.overlay}
      onClick={onClose}
    ></div>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
