import clsx from "clsx";
import { NavLink } from "react-router-dom";

import css from "./AuthNav.module.css";

export default function AuthNav({ toggleMenu }) {
  const getActiveLinkLogIn = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  const getActiveLinkReg = ({ isActive }) => {
    return clsx(css.regLink, isActive && css.regActive);
  };

  return (
    <ul className={css.authNav}>
      <li className={css.authNavItem}>
        <NavLink
          className={getActiveLinkLogIn}
          to="/login"
          onClick={toggleMenu}
        >
          Log In
        </NavLink>
      </li>
      <li className={css.authNavItem}>
        <NavLink
          className={getActiveLinkReg}
          to="/register"
          onClick={toggleMenu}
        >
          Register
        </NavLink>
      </li>
    </ul>
  );
}
