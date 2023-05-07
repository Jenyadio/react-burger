import React, {useCallback, useEffect} from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import ModalHeader from '../modal-header/modal-header';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from '../modal/modal.module.css'
const modalRoot = document.getElementById("react-modals");

function Modal({ onClose, header, children}) {

  const escModal = useCallback((event) => {
    if (event.key === "Escape") {
      onClose()
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", escModal, false);

    return () => {
      document.removeEventListener("keydown", escModal, false);
    };
  }, [escModal]);


  return createPortal (
    (
        <section>
            <div className={`${modalStyles.modal} pt-10 pl-10 pr-10 pb-15`}>
            <ModalHeader onClose={onClose}>{header}</ModalHeader>
                {children}
            </div>
            <ModalOverlay onClose={onClose} />
        </section>
    ), 
    modalRoot
  )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string,
  children: PropTypes.element.isRequired,
}

export default Modal
