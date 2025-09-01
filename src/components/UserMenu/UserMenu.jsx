import clsx from "clsx";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import Icon from "../../Icon/Icon";

import { selectUser } from "../../redux/auth/selectors";

import css from "./UserMenu.module.css";

export default function UserMenu({ toggleMenu, openModal }) {
  const user = useSelector(selectUser);
  const userName = user.name;
  const userInitial = userName[0];

  const getActiveLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  const getActiveLinkaddRecipe = ({ isActive }) => {
    return clsx(css.addRecipe, isActive && css.addRecipeActive);
  };

  const handleLogoutClick = () => {
    toggleMenu?.();
    openModal();
  };

  return (
    <ul className={css.navLinks}>
      <li className={css.order1}>
        <NavLink
          to="/profile"
          className={getActiveLinkClass}
          onClick={toggleMenu}
        >
          My Profile
        </NavLink>
      </li>
      <li className={css.order2}>
        <NavLink
          to="/add-recipe"
          className={getActiveLinkaddRecipe}
          onClick={toggleMenu}
        >
          Add Recipe
        </NavLink>
      </li>
      <li className={css.order3}>
        <div className={css.userBox}>
          <div className={css.divider}>
            <span className={css.avatar}>{userInitial}</span>
            <span className={css.username}>{userName}</span>
          </div>
          <Icon name="Line" width={1} height={39} />
          <button
            type="button"
            className={css.logoutBtn}
            onClick={handleLogoutClick}
          >
            <Icon name="LogOut" width={24} height={24} />
          </button>
        </div>
      </li>
    </ul>
  );
}
