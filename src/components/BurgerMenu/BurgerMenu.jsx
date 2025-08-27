import { useState } from "react";
import { NavLink } from "react-router-dom";
import css from "./BurgerMenu.module.css";
import clsx from "clsx";
import Icon from "../../Icon/Icon";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";

export default function BurgerMenu({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const getActiveNavLink = ({ isActive }) => {
    return clsx(css.mobileNavLink, isActive && css.activeNavLink);
  };

  return (
    <div className={css.burgerWrapper}>
      {/* Кнопка бургер */}
      <button
        className={clsx(css.burgerBtn)}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <Icon name="CloseBtn" width={32} height={32} />
        ) : (
          <Icon name="BurgerBtn" width={32} height={32} />
        )}
      </button>

      {/* Випадаюче меню */}

      {isOpen && (
        <nav className={css.mobileNav}>
          <ul className={css.mobileNavList}>
            <li className={css.mobileNavItem}>
              <NavLink to="/" onClick={toggleMenu} className={getActiveNavLink}>
                Recipes
              </NavLink>
            </li>
            <li className={css.mobileNavItem}>
              {isLoggedIn ? (
                <UserMenu toggleMenu={toggleMenu} />
              ) : (
                <AuthNav toggleMenu={toggleMenu} />
              )}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
