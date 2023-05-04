import React from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import ModalHeader from '../modal-header/modal-header';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from '../modal/modal.module.css'
const modalRoot = document.getElementById("react-modals");

function Modal({ onClose, header, children}) {

  return createPortal (
    (
        <article>
            <div className={`${modalStyles.modal} pt-10 pl-10 pr-10 pb-15`}>
            <ModalHeader onClose={onClose}>{header}</ModalHeader>
                {children}
            </div>
            <ModalOverlay onClose={onClose} />
        </article>
    ), 
    modalRoot
  )
}

Modal.propTypes = {}

export default Modal
