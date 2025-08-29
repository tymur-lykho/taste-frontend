// import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import css from "./AppBar.module.css";
import MainLogo from "../MainLogo/MainLogo.jsx";
import Container from "../../reuseable/Container/Container.jsx";
// import UserMenu from "../UserMenu/UserMenu";

export default function AppBar() {
  return (
    <header className={css.header}>
      <Container className={css.container}>
        <MainLogo />
        <Navigation />
      </Container>
    </header>
  );
}
