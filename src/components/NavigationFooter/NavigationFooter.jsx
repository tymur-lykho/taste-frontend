import { NavLink } from "react-router-dom";
import css from "./NavigationFooter.module.css";
import clsx from "clsx";
// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/auth/selectors";

export default function NavigationFooter() {
  //   const isLogIn = useSelector(selectIsLoggedIn);

  const isActiveClass = ({ isActive }) => {
    return clsx(css.link, css.text, isActive && css.isActive);
  };
  return (
    <nav className={css.nav}>
      <NavLink to="/recipes" className={isActiveClass}>
        Recipes
      </NavLink>
      <NavLink to="/user" className={isActiveClass}>
        Account
      </NavLink>
    </nav>
  );
}
