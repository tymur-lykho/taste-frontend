import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "../Button/Button";
import MainLogo from "../MainLogo/MainLogo.jsx";
import Navigation from "../Navigation/Navigation";
import ModalWindow from "../ModalWindow/ModalWindow";
import Container from "../../reuseable/Container/Container.jsx";

import { logout } from "../../redux/auth/operations";

import css from "./AppBar.module.css";

export default function AppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/");
      closeModal();
    });
  };

  return (
    <header className={css.header}>
      <Container className={css.container}>
        <MainLogo />
        <Navigation openModal={openModal} />
      </Container>

      {isModalOpen && (
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
