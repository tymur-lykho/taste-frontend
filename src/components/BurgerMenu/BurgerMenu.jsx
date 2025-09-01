import clsx from "clsx";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import Icon from "../../Icon/Icon";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";

import css from "./BurgerMenu.module.css";

export default function BurgerMenu({ isLoggedIn, openModal }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const getActiveNavLink = ({ isActive }) =>
    clsx(css.mobileNavLink, isActive && css.activeNavLink);

  return (
    <div className={css.burgerWrapper}>
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
                <UserMenu toggleMenu={toggleMenu} openModal={openModal} />
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
