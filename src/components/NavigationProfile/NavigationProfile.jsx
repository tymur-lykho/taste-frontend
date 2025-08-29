import { NavLink } from "react-router-dom";
import css from "./NavigationProfile.module.css";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export default function NavigationProfile() {
  const isLogIn = useSelector(selectIsLoggedIn);

  const isActiveClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive);
  };
  return (
    <>
      <h2 className={css.title}>My profile</h2>
      {isLogIn && (
        <nav className={css.nav}>
          <ul className={css.navList}>
            <li className={css.navItem}>
              <NavLink to="/profile/own" className={isActiveClass}>
                My Recipes
              </NavLink>
            </li>
            <li className={css.navItem}>
              <NavLink to="/profile/favorites" className={isActiveClass}>
                Saved Recipes
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
