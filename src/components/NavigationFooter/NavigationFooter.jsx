import clsx from "clsx";
import { NavLink } from "react-router-dom";

import css from "./NavigationFooter.module.css";

export default function NavigationFooter() {
  const isActiveClass = ({ isActive }) => {
    return clsx(css.link, css.text, isActive && css.isActive);
  };

  return (
    <nav className={css.nav}>
      <NavLink to="/" className={isActiveClass}>
        Recipes
      </NavLink>

      <NavLink to="/profile" className={isActiveClass}>
        Account
      </NavLink>
    </nav>
  );
}
