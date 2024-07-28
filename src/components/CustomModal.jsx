import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const CustomModal = ({
  showModal,
  handleClose,
  modalTitle,
  modalBodyText,
  buttonText,
}) => {
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{modalBodyText}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
