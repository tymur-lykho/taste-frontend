import { Link } from "react-router-dom";

import Icon from "../../Icon/Icon";

import css from "./MainLogo.module.css";

export default function MainLogo() {
  return (
    <div className={css.logoContainer}>
      <Link to="/" className={css.linkLogo}>
        <Icon name="logo" width={32} height={30} />
        Tasteorama
      </Link>
    </div>
  );
}
