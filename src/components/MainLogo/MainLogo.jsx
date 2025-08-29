import { Link } from "react-router-dom";
// import Logo from "../MainLogo/Logo.svg";
import Icon from "../../Icon/Icon";

import css from "./MainLogo.module.css";

export default function MainLogo() {
  return (
    <>
      <Link to="/" className={css.linkLogo}>
        {/* <img src={Logo} alt="logo" /> */}
        <Icon name="logo" width={32} height={30} />
        Tasteorama
      </Link>
    </>
  );
}
