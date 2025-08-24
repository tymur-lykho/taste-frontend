import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";
import clsx from "clsx";

export default function AuthNav() {
  const getActiveLinkLogIn = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  const getActiveLinkReg = ({ isActive }) => {
    return clsx(css.regLink, isActive && css.regActive);
  };
  return (
    <div className={css.authNav}>
      <NavLink className={getActiveLinkLogIn} to="/login">
        Log In
      </NavLink>
      <NavLink className={getActiveLinkReg} to="/register">
        Register
      </NavLink>
    </div>
  );
}
