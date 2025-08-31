import { NavLink } from "react-router-dom";
import css from "./ProfileNavigation.module.css";
import clsx from "clsx";

export default function ProfileNavigation() {
  const getActiveLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <nav className={css.navProfile}>
      <NavLink to="/profile/own" className={getActiveLinkClass}>
        My Recipes
      </NavLink>
      <NavLink to="/profile/favorites" className={getActiveLinkClass}>
        Saved Recipes
      </NavLink>
    </nav>
  );
}
