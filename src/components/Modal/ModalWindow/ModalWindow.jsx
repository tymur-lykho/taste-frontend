import { createPortal } from "react-dom";
import { Button } from "../../Button/Button";
import css from "../ModalWindow/ModalWindow.module.css";
import Icon from "../../../Icon/Icon";
import { useEffect } from "react";

export default function ModalWindow({ children, onClose }) {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "visible";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      arial-modal="true"
    >
      <div className={css.modal}>
        <Button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon name="Icon_close" width={24} height={24} />
        </Button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
