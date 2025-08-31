import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import AuthNav from "../../components/AuthNav/AuthNav";
import UserMenu from "../../components/UserMenu/UserMenu";
import css from "./Navigation.module.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const getActiveLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation({ openModal }) {
  // _отримує openModal з AppBar_
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.navBar}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <NavLink to="/" className={getActiveLinkClass}>
            Recipes
          </NavLink>
        </li>

        <li className={css.navItem}>
          {isLoggedIn ? (
            <UserMenu openModal={openModal} /> // _передаємо openModal у UserMenu_
          ) : (
            <AuthNav />
          )}
        </li>
      </ul>
      <BurgerMenu isLoggedIn={isLoggedIn} openModal={openModal} />{" "}
      {/* _передаємо для мобільного меню_ */}
    </nav>
  );
}
