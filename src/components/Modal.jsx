import Image from "next/image";
import React, { useRef } from "react";
import ReactDom from "react-dom";

export const Modal = ({ setShowModal, data }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  // render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="modal-container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <div>
          <Image
            src={data.sprites.back_default}
            alt={data.name}
            width={80}
            height={80}
          />
        </div>
        <p>
          Name: <b>{data.name.toUpperCase()}</b>
        </p>
        <p>
          Type:{" "}
          <b>
            {data.types.map((type, index) => (
              <span key={index}>{type.type.name}</span>
            ))}
          </b>
        </p>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
