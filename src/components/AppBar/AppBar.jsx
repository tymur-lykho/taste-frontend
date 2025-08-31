import Navigation from "../Navigation/Navigation";
import css from "./AppBar.module.css";
import MainLogo from "../MainLogo/MainLogo.jsx";
import Container from "../../reuseable/Container/Container.jsx";
import ModalWindow from "../ModalWindow/ModalWindow";
import { Button } from "../Button/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

export default function AppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); // _вище піднімаємо стан модалки_

  const openModal = () => setIsModalOpen(true); // _функція відкриття модалки_
  const closeModal = () => setIsModalOpen(false); // _функція закриття модалки_

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/");
      closeModal(); // _закриваємо модалку після logout_
    });
  };

  return (
    <header className={css.header}>
      <Container className={css.container}>
        <MainLogo />
        <Navigation openModal={openModal} />
        {/* _передаємо функцію у Navigation_ */}
      </Container>

      {isModalOpen && ( // _рендеримо модалку глобально_
        <ModalWindow onClose={closeModal}>
          <h3 className={css.title}>Are you sure?</h3>
          <p className={css.message}>We will miss you!</p>
          <div className={css.actions}>
            <Button onClick={handleLogout} className={css.confirmBtn}>
              Log Out
            </Button>
            <Button onClick={closeModal} className={css.cancelBtn}>
              Cancel
            </Button>
          </div>
        </ModalWindow>
      )}
    </header>
  );
}
