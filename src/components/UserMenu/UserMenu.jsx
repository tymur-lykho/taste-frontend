import { NavLink, useNavigate } from "react-router-dom";
import css from "./UserMenu.module.css";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import LogOut from "../UserMenu/LogOut.svg";
import Line from "../UserMenu/Line.svg";

export default function UserMenu({ toggleMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const userName = user.name;
  const userInitial = userName[0]; // перша літера
  const getActiveLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  const getActiveLinkaddRecipe = ({ isActive }) => {
    return clsx(css.addRecipe, isActive && css.addRecipeActive);
  };

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/");
    });
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

            <button
              type="button"
              className={css.logoutBtn}
              onClick={handleLogout}
            >
              <img src={LogOut} alt="logo" />
            </button>
          </div>
        </li>
      </ul>
    </>
  );
}
