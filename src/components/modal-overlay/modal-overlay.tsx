import React, { FC } from "react";
import overlayStyles from "../modal-overlay/modal-overlay.module.css";

type ModalOverlayProps = {
  onClose: () => void;
}

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => {
  return (
    <div
      className={overlayStyles.overlay}
      onClick={onClose}
    ></div>
  );
}
