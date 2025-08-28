import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import css from "./UserMenu.module.css";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import Icon from "../../Icon/Icon";
import ModalWindow from "../ModalWindow/ModalWindow";
import { Button } from "../Button/Button";

export default function UserMenu({ toggleMenu }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const userName = user.name;

  const userInitial = userName[0]; // перша літера

  const [isOpenModal, setIsOpenModal] = useState(false);

  const getActiveLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  const getActiveLinkaddRecipe = ({ isActive }) => {
    return clsx(css.addRecipe, isActive && css.addRecipeActive);
  };

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/");
      toggleMenu?.();
    });
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  const openModal = () => {
    setIsOpenModal(true);
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
            <Icon name="Line" width={1} height={39} />
            <button type="button" className={css.logoutBtn} onClick={openModal}>
              <Icon name="LogOut" width={24} height={24} />
            </button>
          </div>
        </li>
      </ul>

      {isOpenModal && (
        <ModalWindow onClose={closeModal}>
          <h3 className={css.title}>"Are you sure?"</h3>
          <p className={css.message}>"We will miss you!"</p>
          <div className={css.actions}>
            <Button onClick={handleLogout} className={css.confirmBtn}>
              Log Out
            </Button>
            <Button onClick={closeModal} className={css.cancelBtn}>
              Cansel
            </Button>
          </div>
        </ModalWindow>
      )}
    </>
  );
}
