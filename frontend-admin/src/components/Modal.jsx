import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleClose = e => {
    if (e.target === dialogRef.current || e.type === 'close') {
      onClose();
    }
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      onClick={handleClose}
      onClose={handleClose}
      className="modal-dialog rounded-lg p-4 bg-white shadow-md">
      <button
        onClick={() => dialogRef.current.close()}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
        ✕
      </button>
      {children}
    </dialog>,
    document.getElementById('modal-root'),
  );
};

export default Modal;
