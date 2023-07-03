import React, { FC } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalHeaderStyles from "../modal-header/modal-header.module.css";

type ModalHeaderProps = {
  children?: string;
  onClose: () => void;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ children, onClose }) => {
  return (
    <header className={modalHeaderStyles.header}>
      <h2 className="text text_type_main-large">{children}</h2>
      <CloseIcon
        onClick={onClose}
        type="primary"
      />
    </header>
  );
}
