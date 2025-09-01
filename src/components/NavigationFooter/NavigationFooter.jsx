import clsx from "clsx";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { selectIsLoggedIn } from "../../redux/auth/selectors";

import css from "./NavigationFooter.module.css";

export default function NavigationFooter() {
  const isLogIn = useSelector(selectIsLoggedIn);

  const isActiveClass = ({ isActive }) => {
    return clsx(css.link, css.text, isActive && css.isActive);
  };

  return (
    <nav className={css.nav}>
      <NavLink to="/" className={isActiveClass}>
        Recipes
      </NavLink>
      {isLogIn && (
        <NavLink to="/profile" className={isActiveClass}>
          Account
        </NavLink>
      )}
    </nav>
  );
}
