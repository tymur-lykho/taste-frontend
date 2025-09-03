import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainLogo from "../MainLogo/MainLogo.jsx";
import Navigation from "../Navigation/Navigation";
import LogoutModal from "../Modal/LogoutModal/LogoutModal.jsx";
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
        <LogoutModal onClose={closeModal} onConfirm={handleLogout} />
      )}
    </header>
  );
}
