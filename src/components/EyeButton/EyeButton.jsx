import Icon from "../../reuseable/Icon/Icon";
import css from "./EyeButton.module.css";

export default function EyeButton({ show, setShow }) {
  const handleToggle = () => {
    setShow((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={css.btnShow}
      aria-label={show ? "Hide password" : "Show password"}
      title={show ? "Hide password" : "Show password"}
    >
      <Icon
        className={css.iconEye}
        iconName={show ? "icon-eye" : "icon-eye-off"}
      />
    </button>
  );
}
