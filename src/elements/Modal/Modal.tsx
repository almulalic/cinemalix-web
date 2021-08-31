import React from "react";
import Modal from "react-modal";

import "./Modal.css";

Modal.setAppElement(document.getElementById("#root"));

const CustomModal = ({ action, isVisible, setIsVisible }) => {
  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={action.onDismissClick}
      className="modal"
      style={{
        overlay: {
          background: "rgba(43, 43, 49, 0.8)",
        },
        content: {
          height: "250px",
          width: "500px",
          top: "40%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginLeft: "5%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <h6 className="modal__title">{action.heading}</h6>

      <p className="modal__text">{action.subtext}</p>

      <div className="modal__btns">
        <button
          className="modal__btn modal__btn--apply"
          type="button"
          onClick={() => {
            setIsVisible(false);
            action.onApplyClick();
          }}
        >
          {action.applyText}
        </button>
        <button
          className="modal__btn modal__btn--dismiss"
          type="button"
          onClick={() => {
            setIsVisible(false);
            action.onDismissClick();
          }}
        >
          {action.dismissText}
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
