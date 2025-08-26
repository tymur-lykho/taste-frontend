import { NavLink } from "react-router-dom";
import css from "./UserMenu.module.css";
import clsx from "clsx";
import LogOut from "../UserMenu/LogOut.svg";
import Line from "../UserMenu/Line.svg";

export default function UserMenu({ toggleMenu }) {
  const userName = "User"; // поки статично
  const userInitial = userName[0]; // перша літера
  const getActiveLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  const getActiveLinkaddRecipe = ({ isActive }) => {
    return clsx(css.addRecipe, isActive && css.addRecipeActive);
  };

  return (
    <>
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
            <img src={Line} alt="line" className={css.line} />

            <button type="button" className={css.logoutBtn}>
              <img src={LogOut} alt="logo" />
            </button>
          </div>
        </li>
      </ul>
    </>
  );
}
