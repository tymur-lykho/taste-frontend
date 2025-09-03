import { Link } from "react-router-dom";
import Icon from "../../Icon/Icon";
import css from "./MainLogo.module.css";
export default function MainLogo({ className }) {
  return (
    <Link to="/" className={`${css.linkLogo} ${className || ""}`}>
      <Icon name="logo" width={32} height={30} />
      Tasteorama
    </Link>
  );
}
