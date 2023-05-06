import React from 'react'
import PropTypes from 'prop-types'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import modalHeaderStyles from '../modal-header/modal-header.module.css'

function ModalHeader({ children, onClose }) {
  return (
    <header className={modalHeaderStyles.header}>
        <h2 className="text text_type_main-large">{children}</h2>
        <CloseIcon onClick={onClose} type="primary" />
    </header>
  )
}

ModalHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.string,
}

export default ModalHeader
