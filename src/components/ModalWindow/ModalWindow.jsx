import { Button } from "../Button/Button";
import css from "../ModalWindow/ModalWindow.module.css";
import Icon from "../../Icon/Icon";

export default function ModalWindow({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) {
  if (!isOpen) return null;

  return (
    <div className={css.backdrop}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon name="Icon_close" width={24} height={24} />
        </button>
        <h3 className={css.title}>{title}</h3>
        <p className={css.message}>{message}</p>
        <div className={css.actions}>
          <Button onClick={onConfirm} className={css.confirmBtn}>
            Log Out
          </Button>
          <Button onClick={onClose} className={css.cancelBtn}>
            Cansel
          </Button>
        </div>
      </div>
    </div>
  );
}
