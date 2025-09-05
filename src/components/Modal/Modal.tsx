import { useEffect } from "react";
import type { Photo } from "../../types/photo";
import styled from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
  photo: Photo | null;
}

export default function Modal({ photo, onClose }: ModalProps) {
  const handleBackdrop = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);
  return (
    <>
      {createPortal(
        <div
          onClick={handleBackdrop}
          className={styled.backdrop}
          role="dialog"
          aria-modal="true"
        >
          <div className={styled.modal}>
            <button
              onClick={onClose}
              className={styled.closeButton}
              aria-label="Close modal"
            >
              &times;
            </button>
            <img src={photo?.src.original} alt={photo?.alt} />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
