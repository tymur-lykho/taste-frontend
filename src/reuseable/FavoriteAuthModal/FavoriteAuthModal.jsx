import ModalWindow from "../../components/ModalWindow/ModalWindow";
import { Button } from "../../components/Button/Button";
import clsx from "clsx";
import css from "./FavoriteAuthModal.module.css";

export default function FavoriteAuthModal({ onClose }) {
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
