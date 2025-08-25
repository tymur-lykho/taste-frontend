import { Link } from "react-router-dom";
import Logo from "../MainLogo/Logo.svg";
import css from "./MainLogo.module.css";

export default function MainLogo() {
  return (
    <Link to="/" className={css.logo}>
      <img src={Logo} alt="logo" />
    </Link>
  );
}
