import { NavLink, Link } from "react-router-dom";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import AuthNav from "../../components/AuthNav/AuthNav";
import UserMenu from "../../components/UserMenu/UserMenu";
import css from "./Navigation.module.css";

const getActiveLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav className={css.navbar}>
      <NavLink to="/" className={getActiveLinkClass}>
        Recipes
      </NavLink>

      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </nav>
  );
}
