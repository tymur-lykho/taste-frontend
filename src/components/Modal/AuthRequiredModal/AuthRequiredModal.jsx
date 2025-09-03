import { Button } from "../../Button/Button";
import ModalWindow from "../ModalWindow/ModalWindow";
import clsx from "clsx";
import css from "./AythRequiredModal.module.css";

export default function AuthRequiredModal({ onClose }) {
  return (
    <ModalWindow onClose={onClose}>
      <h3 className={css.title}>Error while saving</h3>
      <p className={css.message}>
        To save this recipe, you need to <br />
        authorizate first
      </p>
      <div className={css.actions}>
        <Button type="link" to="/login" className={clsx(css.loginBtn, "white")}>
          Log in
        </Button>
        <Button
          type="link"
          to="/register"
          className={clsx(css.registerBtn, "fill")}
        >
          Register
        </Button>
      </div>
    </ModalWindow>
  );
}
