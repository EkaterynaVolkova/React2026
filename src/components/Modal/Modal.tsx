import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import { Button } from '../Button';

interface ModalProps {
  children?: ReactNode;
  isOpen?: boolean;
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal">
      <div className="modal-controls">
        <Button onClick={handleClose} className="">
          Close
        </Button>
      </div>
      <div className="modal-content">{children}</div>
    </div>,
    document.body
  );
};
