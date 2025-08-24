import { NavLink } from "react-router-dom";
import css from "./UserMenu.module.css";
import clsx from "clsx";
import LogOut from "../UserMenu/LogOut.svg";
import Line from "../UserMenu/Line.svg";

export default function UserMenu() {
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
        <li>
          <NavLink to="/profile" className={getActiveLinkClass}>
            My Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-recipe" className={getActiveLinkaddRecipe}>
            Add Recipe
          </NavLink>
        </li>
      </ul>

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
    </>
  );
}
