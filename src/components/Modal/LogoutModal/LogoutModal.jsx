import ModalWindow from "../ModalWindow/ModalWindow";
import { Button } from "../../Button/Button";
import css from "./LogoutModal.module.css";

export default function LogoutModal({ onClose, onConfirm }) {
  return (
    <ModalWindow onClose={onClose}>
      <h3 className={css.title}>Are you sure?</h3>
      <p className={css.message}>We will miss you!</p>
      <div className={css.actions}>
        <Button onClick={onConfirm} className={css.confirmBtn}>
          Log Out
        </Button>
        <Button onClick={onClose} className={css.cancelBtn}>
          Cancel
        </Button>
      </div>
    </ModalWindow>
  );
}
