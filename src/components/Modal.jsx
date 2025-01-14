import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ active, id, children }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  return (
    <div
      id={id}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isActive ? 'opacity-100 visible' : 'opacity-0 invisible'
      } transition-opacity duration-300`}
    >
      {children}
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
  children: PropTypes.node,
};

export const ModalContent = ({ children, onClose }) => {
  const contentRef = useRef(null);

  const closeModal = () => {
    if (onClose) onClose();
  };

  return (
    <div
      ref={contentRef}
      className="bg-white mx-4 p-6 rounded-lg shadow-lg relative"
    >
      {children}
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        onClick={closeModal}
      >
        <i className="bx bx-x text-2xl"></i>
      </button>
    </div>
  );
};

ModalContent.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
