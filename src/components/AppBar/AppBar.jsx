import Navigation from "../Navigation/Navigation";
import css from "./AppBar.module.css";
import MainLogo from "../MainLogo/MainLogo.jsx";
import Container from "../../reuseable/Container/Container.jsx";
import LogoutModal from "../Modal/LogoutModal/LogoutModal.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

export default function AppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
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
      </Container>
      {isModalOpen && (
        <LogoutModal onClose={closeModal} onConfirm={handleLogout} />
      )}
    </header>
  );
}
