import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import { Button } from '../Button';

interface ModalProps {
  children?: ReactNode;
  isOpen?: boolean;
  handleClose: () => void;
}

export const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? handleClose() : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose, isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal" onClick={handleClose} data-testid="modal">
      <div className="modal-controls">
        <Button onClick={handleClose}>Close</Button>
      </div>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};
